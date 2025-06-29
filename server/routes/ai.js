import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { generateAIContent, generateUserSummary } from '../services/aiService.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

const router = express.Router();

// Generate project summary
router.post('/project-summary', authenticateToken, async (req, res) => {
  try {
    const { title, description, language, githubUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const mockProject = {
      title,
      description,
      language,
      githubUrl
    };

    const aiContent = await generateAIContent(mockProject);

    res.json({
      summary: aiContent.summary,
      tags: aiContent.tags,
      skills: aiContent.skills,
      complexityScore: aiContent.complexityScore
    });
  } catch (error) {
    console.error('AI project summary error:', error);
    res.status(500).json({ message: 'Failed to generate AI summary' });
  }
});

// Generate user summary
router.post('/user-summary/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user is requesting their own summary or is a recruiter
    if (req.user.userId !== userId && req.user.type !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const projects = await Project.find({ 
      owner: userId,
      isPublic: true 
    }).sort({ createdAt: -1 }).limit(10);

    const aiSummary = await generateUserSummary(user, projects);

    // Update user's AI summary if it's their own request
    if (req.user.userId === userId) {
      user.aiSummary = aiSummary;
      await user.save();
    }

    res.json({
      summary: aiSummary,
      projectsAnalyzed: projects.length
    });
  } catch (error) {
    console.error('AI user summary error:', error);
    res.status(500).json({ message: 'Failed to generate user summary' });
  }
});

// Suggest tags for project
router.post('/suggest-tags', authenticateToken, async (req, res) => {
  try {
    const { title, description, language } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const mockProject = {
      title,
      description,
      language
    };

    const aiContent = await generateAIContent(mockProject);

    res.json({
      tags: aiContent.tags,
      skills: aiContent.skills
    });
  } catch (error) {
    console.error('AI tag suggestion error:', error);
    res.status(500).json({ message: 'Failed to suggest tags' });
  }
});

// Analyze skill gaps
router.post('/skill-gap-analysis', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProjects = await Project.find({ 
      owner: req.user.userId 
    });

    // Get trending skills from recent projects
    const recentProjects = await Project.find({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).select('skillsDetected aiTags');

    const trendingSkills = {};
    recentProjects.forEach(project => {
      [...(project.skillsDetected || []), ...(project.aiTags || [])].forEach(skill => {
        trendingSkills[skill] = (trendingSkills[skill] || 0) + 1;
      });
    });

    const topTrendingSkills = Object.entries(trendingSkills)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([skill]) => skill);

    const userSkills = new Set([
      ...(user.skills || []),
      ...userProjects.flatMap(p => [...(p.skillsDetected || []), ...(p.aiTags || [])])
    ]);

    const skillGaps = topTrendingSkills.filter(skill => !userSkills.has(skill));

    res.json({
      currentSkills: Array.from(userSkills),
      trendingSkills: topTrendingSkills,
      skillGaps: skillGaps.slice(0, 5),
      recommendations: skillGaps.slice(0, 3).map(skill => ({
        skill,
        reason: `${skill} is trending in the developer community and could enhance your profile`,
        priority: 'high'
      }))
    });
  } catch (error) {
    console.error('Skill gap analysis error:', error);
    res.status(500).json({ message: 'Failed to analyze skill gaps' });
  }
});

// Get AI insights for recruiter
router.get('/recruiter-insights', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'recruiter') {
      return res.status(403).json({ message: 'Recruiter access required' });
    }

    // Get trending technologies
    const recentProjects = await Project.find({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      isPublic: true
    }).select('skillsDetected aiTags language');

    const techTrends = {};
    recentProjects.forEach(project => {
      const skills = [...(project.skillsDetected || []), ...(project.aiTags || [])];
      if (project.language) skills.push(project.language);
      
      skills.forEach(skill => {
        techTrends[skill] = (techTrends[skill] || 0) + 1;
      });
    });

    const topTechnologies = Object.entries(techTrends)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15)
      .map(([tech, count]) => ({ technology: tech, projectCount: count }));

    // Get developer activity insights
    const totalDevelopers = await User.countDocuments({ type: 'student', isPublic: true });
    const activeDevelopers = await User.countDocuments({
      type: 'student',
      isPublic: true,
      lastSyncAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      trendingTechnologies: topTechnologies,
      developerStats: {
        total: totalDevelopers,
        active: activeDevelopers,
        activityRate: Math.round((activeDevelopers / totalDevelopers) * 100)
      },
      insights: [
        {
          title: 'Rising Technologies',
          description: `${topTechnologies[0]?.technology} is the most popular technology this month`,
          type: 'trend'
        },
        {
          title: 'Developer Activity',
          description: `${activeDevelopers} developers have been active in the past week`,
          type: 'activity'
        }
      ]
    });
  } catch (error) {
    console.error('Recruiter insights error:', error);
    res.status(500).json({ message: 'Failed to get insights' });
  }
});

export default router;