
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Github, BookmarkIcon, Upload, ArrowLeft, Share2, Eye, MessageCircle } from 'lucide-react';

// Mock project data
const mockProject = {
  id: '1',
  title: 'AI-Powered Code Review Tool',
  description: `This innovative project leverages machine learning to automatically review code and provide intelligent suggestions for improvements. The system analyzes code patterns, identifies potential bugs, security vulnerabilities, and performance issues while maintaining a 95% accuracy rate.

The tool integrates seamlessly with popular development workflows and supports multiple programming languages including JavaScript, Python, Java, and C++. It uses a combination of static analysis and deep learning models trained on millions of lines of open-source code.

Key features include:
- Real-time code analysis and suggestions
- Integration with GitHub, GitLab, and Bitbucket
- Customizable rule sets for different coding standards
- Detailed reporting and analytics
- Team collaboration features`,
  image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
  tags: ['AI/ML', 'Python', 'TensorFlow', 'React', 'Node.js', 'Docker'],
  author: {
    id: '1',
    name: 'Sarah Chen',
    bio: 'Full-stack developer passionate about AI and machine learning. 3+ years experience building scalable web applications.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    followers: 1247,
    following: 892,
    projects: 15,
    location: 'San Francisco, CA',
    skills: ['Python', 'React', 'TensorFlow', 'AWS', 'Docker']
  },
  githubUrl: 'https://github.com',
  liveUrl: 'https://demo.com',
  likes: 1247,
  comments: 89,
  views: 3247,
  isLiked: false,
  createdAt: '2024-01-15',
  aiSummary: `This project demonstrates advanced machine learning capabilities in code analysis. The implementation shows strong understanding of natural language processing, static analysis, and web development. The developer has successfully created a production-ready tool that could significantly improve code quality in development teams.`
};

const mockComments = [
  {
    id: '1',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      id: '2'
    },
    content: 'This is incredibly impressive! The accuracy rate you achieved is outstanding. How did you handle edge cases in the ML model?',
    timestamp: '2 hours ago',
    likes: 12
  },
  {
    id: '2',
    author: {
      name: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      id: '3'
    },
    content: 'Great work! We\'re looking for someone with exactly these skills at our startup. Would love to connect!',
    timestamp: '5 hours ago',
    likes: 8
  },
  {
    id: '3',
    author: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      id: '4'
    },
    content: 'The integration with GitHub is seamless. This could be a game-changer for our development workflow.',
    timestamp: '1 day ago',
    likes: 15
  }
];

export default function ProjectDetails() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(mockProject.isLiked);
  const [likesCount, setLikesCount] = useState(mockProject.likes);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Project removed from your liked projects" : "Project added to your liked projects",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: mockProject.title,
        text: mockProject.description.substring(0, 150) + '...',
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Project URL has been copied to your clipboard.",
      });
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: String(comments.length + 1),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=150&h=150&fit=crop&crop=face',
        id: 'current'
      },
      content: newComment,
      timestamp: 'Just now',
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
    
    toast({
      title: "Comment posted!",
      description: "Your comment has been added to the project.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="text-gray-400 hover:text-white mb-6" asChild>
          <Link to="/explore">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explore
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <div className="mb-8">
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src={mockProject.image} 
                  alt={mockProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-space font-bold text-white flex-1">
                  {mockProject.title}
                </h1>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    className={`border-gray-600 hover:bg-gray-700 ${
                      isLiked ? 'text-red-400 border-red-400' : 'text-gray-300'
                    }`}
                  >
                    <svg 
                      className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 mb-6 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{mockProject.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm">{likesCount.toLocaleString()} likes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{comments.length} comments</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {mockProject.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 mb-8">
                {mockProject.githubUrl && (
                  <Button className="gradient-primary hover:opacity-90" asChild>
                    <a href={mockProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {mockProject.liveUrl && (
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10" asChild>
                    <a href={mockProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Upload className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* AI Summary */}
            <Card className="glass-dark border-purple-500/30 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse mr-2"></div>
                  AI Project Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI-generated insights about this project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  {mockProject.aiSummary}
                </p>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="glass-dark border-white/10 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {mockProject.description}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Comments ({comments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Comment */}
                <form onSubmit={handleComment} className="mb-6">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts about this project..."
                    className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 mb-3"
                    rows={3}
                  />
                  <Button type="submit" className="gradient-primary hover:opacity-90">
                    Post Comment
                  </Button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Link 
                            to={`/profile/${comment.author.id}`}
                            className="text-white font-medium hover:text-purple-300 transition-colors"
                          >
                            {comment.author.name}
                          </Link>
                          <span className="text-gray-500 text-sm">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-2">
                          {comment.content}
                        </p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-xs">{comment.likes}</span>
                          </button>
                          <button className="text-gray-400 hover:text-white transition-colors text-xs">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white">About the Developer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mockProject.author.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                      {mockProject.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Link 
                      to={`/profile/${mockProject.author.id}`}
                      className="text-white font-semibold text-lg hover:text-purple-300 transition-colors"
                    >
                      {mockProject.author.name}
                    </Link>
                    <p className="text-gray-400 text-sm">{mockProject.author.location}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {mockProject.author.bio}
                </p>

                {/* Stats */}
                <div className="flex justify-between text-center mb-4">
                  <div>
                    <div className="text-white font-semibold">{mockProject.author.projects}</div>
                    <div className="text-gray-400 text-xs">Projects</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{mockProject.author.followers}</div>
                    <div className="text-gray-400 text-xs">Followers</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{mockProject.author.following}</div>
                    <div className="text-gray-400 text-xs">Following</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {mockProject.author.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-xs bg-gray-800/50 text-gray-300 border-gray-600"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 gradient-primary hover:opacity-90"
                    asChild
                  >
                    <Link to={`/profile/${mockProject.author.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                  >
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm">Created</Label>
                  <p className="text-white">{new Date(mockProject.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Category</Label>
                  <p className="text-white">AI/Machine Learning</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Difficulty</Label>
                  <p className="text-white">Advanced</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">License</Label>
                  <p className="text-white">MIT License</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
