import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.githubId; // Password not required for GitHub OAuth users
    }
  },
  type: {
    type: String,
    enum: ['student', 'recruiter'],
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  
  // GitHub Integration
  githubId: {
    type: String,
    unique: true,
    sparse: true
  },
  githubUsername: {
    type: String,
    sparse: true
  },
  githubAccessToken: {
    type: String
  },
  
  // Social Stats
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  
  // Profile Settings
  isPublic: {
    type: Boolean,
    default: true
  },
  autoSyncProjects: {
    type: Boolean,
    default: true
  },
  lastSyncAt: {
    type: Date
  },
  
  // Recruiter specific fields
  company: {
    type: String
  },
  jobTitle: {
    type: String
  },
  
  // AI Generated Profile Summary
  aiSummary: {
    type: String
  },
  
  // Verification
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate AI summary based on projects and skills
userSchema.methods.generateAISummary = function() {
  // This will be implemented with OpenAI integration
  return `${this.type === 'student' ? 'Developer' : 'Recruiter'} with expertise in ${this.skills.slice(0, 3).join(', ')}`;
};

export default mongoose.model('User', userSchema);