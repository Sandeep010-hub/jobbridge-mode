import express from 'express';
import User from '../models/User.js';
import Project from '../models/Project.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { generateUserSummary } from '../services/aiService.js';

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -githubAccessToken')
      .populate('followers following', 'name avatar');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's projects
    const projects = await Project.find({ 
      owner: user._id, 
      isPublic: true 
    }).sort({ createdAt: -1 });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
        website: user.website,
        skills: user.skills,
        githubUsername: user.githubUsername,
        followers: user.followers,
        following: user.following,
        company: user.company,
        jobTitle: user.jobTitle,
        aiSummary: user.aiSummary,
        isVerified: user.isVerified,
        isPublic: user.isPublic
      },
      projects,
      stats: {
        totalProjects: projects.length,
        totalLikes: projects.reduce((sum, p) => sum + p.likes, 0),
        totalViews: projects.reduce((sum, p) => sum + p.views, 0),
        totalStars: projects.reduce((sum, p) => sum + p.stars, 0)
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      bio,
      location,
      website,
      skills,
      isPublic,
      autoSyncProjects,
      company,
      jobTitle
    } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (website !== undefined) user.website = website;
    if (skills) user.skills = skills;
    if (isPublic !== undefined) user.isPublic = isPublic;
    if (autoSyncProjects !== undefined) user.autoSyncProjects = autoSyncProjects;
    if (company !== undefined) user.company = company;
    if (jobTitle !== undefined) user.jobTitle = jobTitle;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        bio: user.bio,
        location: user.location,
        website: user.website,
        skills: user.skills,
        isPublic: user.isPublic,
        autoSyncProjects: user.autoSyncProjects,
        company: user.company,
        jobTitle: user.jobTitle
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search users (for recruiters)
router.get('/search', authenticateToken, requireRole('recruiter'), async (req, res) => {
  try {
    const {
      q,
      skills,
      location,
      type = 'student',
      page = 1,
      limit = 20
    } = req.query;

    const query = { type, isPublic: true };

    // Text search
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { bio: { $regex: q, $options: 'i' } },
        { skills: { $in: [new RegExp(q, 'i')] } }
      ];
    }

    // Skills filter
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      query.skills = { $in: skillsArray };
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const users = await User.find(query)
      .select('-password -githubAccessToken')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    // Get project counts for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const projectCount = await Project.countDocuments({ 
          owner: user._id, 
          isPublic: true 
        });
        
        return {
          ...user.toObject(),
          projectCount
        };
      })
    );

    const total = await User.countDocuments(query);

    res.json({
      users: usersWithStats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Follow/Unfollow user
router.post('/:id/follow', authenticateToken, async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.userId;

    if (targetUserId === currentUserId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);
    } else {
      // Follow
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully',
      isFollowing: !isFollowing
    });
  } catch (error) {
    console.error('Follow/unfollow error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate AI summary for user
router.post('/ai-summary', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const projects = await Project.find({ 
      owner: user._id 
    }).sort({ createdAt: -1 }).limit(10);

    const aiSummary = await generateUserSummary(user, projects);
    
    user.aiSummary = aiSummary;
    await user.save();

    res.json({
      message: 'AI summary generated successfully',
      aiSummary
    });
  } catch (error) {
    console.error('AI summary error:', error);
    res.status(500).json({ message: 'Failed to generate AI summary' });
  }
});

export default router;