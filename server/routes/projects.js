import express from 'express';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import { generateAIContent } from '../services/aiService.js';

const router = express.Router();

// Get all projects (public feed)
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      tags,
      skills,
      search,
      sort = 'recent'
    } = req.query;

    const query = { isPublic: true };

    // Category filter
    if (category && category !== 'All Categories') {
      query.category = category;
    }

    // Tags filter
    if (tags) {
      const tagsArray = tags.split(',').map(t => t.trim());
      query.$or = [
        { aiTags: { $in: tagsArray } },
        { tags: { $in: tagsArray } }
      ];
    }

    // Skills filter
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      query.skillsDetected = { $in: skillsArray };
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { aiSummary: { $regex: search, $options: 'i' } },
        { aiTags: { $in: [new RegExp(search, 'i')] } },
        { skillsDetected: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    let sortOption = { createdAt: -1 };
    switch (sort) {
      case 'likes':
        sortOption = { likes: -1 };
        break;
      case 'views':
        sortOption = { views: -1 };
        break;
      case 'stars':
        sortOption = { stars: -1 };
        break;
      case 'recent':
      default:
        sortOption = { createdAt: -1 };
    }

    const projects = await Project.find(query)
      .populate('owner', 'name avatar githubUsername')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sortOption);

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name avatar bio githubUsername location skills')
      .populate('comments.user', 'name avatar');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Increment view count
    project.views += 1;
    await project.save();

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's projects
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20, status } = req.query;

    const query = { owner: userId };
    
    // If not the owner, only show public projects
    if (req.user?.userId !== userId) {
      query.isPublic = true;
    }

    // Status filter (for owner)
    if (status && req.user?.userId === userId) {
      if (status === 'published') {
        query.isPublic = true;
      } else if (status === 'private') {
        query.isPublic = false;
      }
    }

    const projects = await Project.find(query)
      .populate('owner', 'name avatar githubUsername')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      githubUrl,
      liveUrl,
      category,
      tags,
      isPublic = true
    } = req.body;

    const project = new Project({
      title,
      description,
      githubUrl,
      liveUrl,
      category,
      tags: tags || [],
      isPublic,
      owner: req.user.userId
    });

    // Generate AI content
    try {
      const aiContent = await generateAIContent(project);
      project.aiSummary = aiContent.summary;
      project.aiTags = aiContent.tags;
      project.skillsDetected = aiContent.skills;
      project.complexityScore = aiContent.complexityScore;
    } catch (aiError) {
      console.error('AI generation error:', aiError);
    }

    await project.save();
    await project.populate('owner', 'name avatar githubUsername');

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const {
      title,
      description,
      githubUrl,
      liveUrl,
      category,
      tags,
      isPublic
    } = req.body;

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (githubUrl) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (category) project.category = category;
    if (tags) project.tags = tags;
    if (isPublic !== undefined) project.isPublic = isPublic;

    // Regenerate AI content if content changed
    if (title || description) {
      try {
        const aiContent = await generateAIContent(project);
        project.aiSummary = aiContent.summary;
        project.aiTags = aiContent.tags;
        project.skillsDetected = aiContent.skills;
        project.complexityScore = aiContent.complexityScore;
      } catch (aiError) {
        console.error('AI regeneration error:', aiError);
      }
    }

    await project.save();
    await project.populate('owner', 'name avatar githubUsername');

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike project
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // For simplicity, just increment/decrement likes
    // In a real app, you'd track which users liked which projects
    project.likes += 1;
    await project.save();

    res.json({
      message: 'Project liked',
      likes: project.likes
    });
  } catch (error) {
    console.error('Like project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const comment = {
      user: req.user.userId,
      content,
      createdAt: new Date()
    };

    project.comments.push(comment);
    await project.save();
    await project.populate('comments.user', 'name avatar');

    res.status(201).json({
      message: 'Comment added successfully',
      comment: project.comments[project.comments.length - 1]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get trending projects
router.get('/trending/all', async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    // Get projects with high engagement in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const projects = await Project.find({
      isPublic: true,
      createdAt: { $gte: thirtyDaysAgo }
    })
    .populate('owner', 'name avatar githubUsername')
    .sort({ 
      likes: -1, 
      views: -1, 
      stars: -1 
    })
    .limit(parseInt(limit));

    res.json({ projects });
  } catch (error) {
    console.error('Get trending projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;