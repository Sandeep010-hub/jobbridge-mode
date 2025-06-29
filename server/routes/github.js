import express from 'express';
import axios from 'axios';
import User from '../models/User.js';
import Project from '../models/Project.js';
import { authenticateToken } from '../middleware/auth.js';
import { generateAIContent } from '../services/aiService.js';

const router = express.Router();

// GitHub OAuth callback
router.post('/oauth/callback', authenticateToken, async (req, res) => {
  try {
    const { code } = req.body;
    
    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const { access_token } = tokenResponse.data;

    // Get user info from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${access_token}`
      }
    });

    const githubUser = userResponse.data;

    // Update user with GitHub info
    const user = await User.findById(req.user.userId);
    user.githubId = githubUser.id.toString();
    user.githubUsername = githubUser.login;
    user.githubAccessToken = access_token;
    user.avatar = user.avatar || githubUser.avatar_url;
    user.bio = user.bio || githubUser.bio || '';
    user.location = user.location || githubUser.location || '';
    user.website = user.website || githubUser.blog || '';
    
    await user.save();

    // Sync projects if auto-sync is enabled
    if (user.autoSyncProjects) {
      await syncUserProjects(user);
    }

    res.json({
      message: 'GitHub connected successfully',
      user: {
        githubUsername: user.githubUsername,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.status(500).json({ message: 'Failed to connect GitHub account' });
  }
});

// Sync projects from GitHub
router.post('/sync', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user.githubAccessToken) {
      return res.status(400).json({ message: 'GitHub account not connected' });
    }

    const syncedProjects = await syncUserProjects(user);
    
    res.json({
      message: 'Projects synced successfully',
      count: syncedProjects.length,
      projects: syncedProjects
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ message: 'Failed to sync projects' });
  }
});

// Get GitHub repositories
router.get('/repos', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user.githubAccessToken) {
      return res.status(400).json({ message: 'GitHub account not connected' });
    }

    const response = await axios.get('https://api.github.com/user/repos', {
      headers: {
        'Authorization': `token ${user.githubAccessToken}`
      },
      params: {
        sort: 'updated',
        per_page: 100
      }
    });

    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      size: repo.size,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      htmlUrl: repo.html_url,
      isPrivate: repo.private
    }));

    res.json({ repos });
  } catch (error) {
    console.error('Get repos error:', error);
    res.status(500).json({ message: 'Failed to fetch repositories' });
  }
});

// Helper function to sync user projects
async function syncUserProjects(user) {
  try {
    const response = await axios.get('https://api.github.com/user/repos', {
      headers: {
        'Authorization': `token ${user.githubAccessToken}`
      },
      params: {
        sort: 'updated',
        per_page: 100
      }
    });

    const repos = response.data.filter(repo => !repo.private && !repo.fork);
    const syncedProjects = [];

    for (const repo of repos) {
      try {
        // Check if project already exists
        let project = await Project.findOne({ 
          githubRepoId: repo.id.toString(),
          owner: user._id 
        });

        if (!project) {
          // Create new project
          project = new Project({
            title: repo.name,
            description: repo.description || 'No description provided',
            githubUrl: repo.html_url,
            githubRepoId: repo.id.toString(),
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            watchers: repo.watchers_count,
            size: repo.size,
            owner: user._id,
            createdAt: new Date(repo.created_at),
            updatedAt: new Date(repo.updated_at),
            pushedAt: new Date(repo.pushed_at),
            syncStatus: 'synced'
          });
        } else {
          // Update existing project
          project.title = repo.name;
          project.description = repo.description || project.description;
          project.language = repo.language;
          project.stars = repo.stargazers_count;
          project.forks = repo.forks_count;
          project.watchers = repo.watchers_count;
          project.size = repo.size;
          project.updatedAt = new Date(repo.updated_at);
          project.pushedAt = new Date(repo.pushed_at);
          project.syncStatus = 'synced';
        }

        // Get repository languages
        try {
          const languagesResponse = await axios.get(`https://api.github.com/repos/${repo.full_name}/languages`, {
            headers: {
              'Authorization': `token ${user.githubAccessToken}`
            }
          });

          const languages = Object.entries(languagesResponse.data).map(([name, bytes]) => ({
            name,
            percentage: Math.round((bytes / Object.values(languagesResponse.data).reduce((a, b) => a + b, 0)) * 100)
          }));

          project.languages = languages;
        } catch (langError) {
          console.error('Error fetching languages:', langError);
        }

        // Generate AI content if not exists
        if (!project.aiSummary || !project.aiTags.length) {
          try {
            const aiContent = await generateAIContent(project);
            project.aiSummary = aiContent.summary;
            project.aiTags = aiContent.tags;
            project.skillsDetected = aiContent.skills;
            project.complexityScore = aiContent.complexityScore;
          } catch (aiError) {
            console.error('AI generation error:', aiError);
          }
        }

        project.lastSyncAt = new Date();
        await project.save();
        syncedProjects.push(project);

      } catch (projectError) {
        console.error(`Error syncing project ${repo.name}:`, projectError);
      }
    }

    user.lastSyncAt = new Date();
    await user.save();

    return syncedProjects;
  } catch (error) {
    console.error('Sync projects error:', error);
    throw error;
  }
}

export default router;