import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  
  // GitHub Integration
  githubUrl: {
    type: String,
    required: true
  },
  githubRepoId: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Deployment URLs
  liveUrl: {
    type: String
  },
  netlifyUrl: {
    type: String
  },
  vercelUrl: {
    type: String
  },
  
  // Project Details
  language: {
    type: String
  },
  languages: [{
    name: String,
    percentage: Number
  }],
  
  // AI Generated Content
  aiSummary: {
    type: String
  },
  aiTags: [{
    type: String
  }],
  skillsDetected: [{
    type: String
  }],
  complexityScore: {
    type: Number,
    min: 1,
    max: 10
  },
  
  // Manual Tags
  tags: [{
    type: String
  }],
  category: {
    type: String,
    enum: [
      'Web Development',
      'Mobile Apps', 
      'AI/Machine Learning',
      'Blockchain',
      'Game Development',
      'Data Science',
      'DevOps',
      'IoT',
      'AR/VR',
      'Other'
    ]
  },
  
  // Repository Stats
  stars: {
    type: Number,
    default: 0
  },
  forks: {
    type: Number,
    default: 0
  },
  watchers: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 0
  },
  
  // Engagement
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Owner
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Sync Status
  lastSyncAt: {
    type: Date,
    default: Date.now
  },
  syncStatus: {
    type: String,
    enum: ['pending', 'synced', 'error'],
    default: 'pending'
  },
  
  // Visibility
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // GitHub Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  pushedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
projectSchema.index({ owner: 1, createdAt: -1 });
projectSchema.index({ aiTags: 1 });
projectSchema.index({ skillsDetected: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ likes: -1 });
projectSchema.index({ views: -1 });

export default mongoose.model('Project', projectSchema);