
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, Plus, BarChart3, Users, Eye, Github } from 'lucide-react';

// Mock data for user's projects
const userProjects = [
  {
    id: '1',
    title: 'AI-Powered Code Review Tool',
    description: 'Machine learning model that automatically reviews code and suggests improvements.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    tags: ['AI/ML', 'Python', 'TensorFlow', 'React'],
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      id: '1'
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    likes: 1247,
    comments: 89,
    status: 'published',
    views: 3247,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Real-time Chat Application',
    description: 'WebSocket-based chat app with file sharing and video calls.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    tags: ['React', 'Node.js', 'Socket.io', 'WebRTC'],
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      id: '1'
    },
    githubUrl: 'https://github.com',
    likes: 456,
    comments: 23,
    status: 'draft',
    views: 0,
    createdAt: '2024-01-10'
  }
];

const recentActivity = [
  { type: 'like', project: 'AI-Powered Code Review Tool', user: 'John Doe', time: '2 hours ago' },
  { type: 'comment', project: 'AI-Powered Code Review Tool', user: 'Jane Smith', time: '5 hours ago' },
  { type: 'view', project: 'Real-time Chat Application', user: 'TechCorp Recruiter', time: '1 day ago' },
  { type: 'follow', user: 'Alex Rivera', time: '2 days ago' },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const publishedProjects = userProjects.filter(p => p.status === 'published');
  const draftProjects = userProjects.filter(p => p.status === 'draft');

  const totalLikes = publishedProjects.reduce((sum, project) => sum + project.likes, 0);
  const totalViews = publishedProjects.reduce((sum, project) => sum + project.views, 0);
  const totalComments = publishedProjects.reduce((sum, project) => sum + project.comments, 0);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-space font-bold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-400">
              Manage your projects and track your progress
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10" asChild>
              <Link to={`/profile/${user?.id}`}>
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Link>
            </Button>
            <Button className="gradient-primary hover:opacity-90" asChild>
              <Link to="/upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload Project
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-dark border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Projects</p>
                  <p className="text-2xl font-bold text-white">{publishedProjects.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Github className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Likes</p>
                  <p className="text-2xl font-bold text-white">{totalLikes.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Followers</p>
                  <p className="text-2xl font-bold text-white">{user?.followers || 0}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-white/10">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-500">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-purple-500">
              Projects
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-500">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="text-white data-[state=active]:bg-purple-500">
              AI Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Projects */}
              <div className="lg:col-span-2">
                <Card className="glass-dark border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Projects</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your latest project uploads and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userProjects.slice(0, 3).map((project) => (
                        <div key={project.id} className="flex items-center space-x-4 p-4 rounded-lg bg-slate-800/30">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium truncate">{project.title}</h4>
                            <p className="text-gray-400 text-sm truncate">{project.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">{project.likes} likes</span>
                              <span className="text-xs text-gray-500">{project.views} views</span>
                              <Badge 
                                variant={project.status === 'published' ? 'default' : 'secondary'}
                                className={project.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                        View All Projects
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <Card className="glass-dark border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-400">
                      Latest interactions with your projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-300">
                              <span className="text-white">{activity.user}</span>
                              {activity.type === 'like' && ' liked'}
                              {activity.type === 'comment' && ' commented on'}
                              {activity.type === 'view' && ' viewed'}
                              {activity.type === 'follow' && ' started following you'}
                              {activity.project && (
                                <> <span className="text-purple-300">{activity.project}</span></>
                              )}
                            </p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-space font-bold text-white">My Projects</h2>
              <Button className="gradient-primary hover:opacity-90" asChild>
                <Link to="/upload">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Link>
              </Button>
            </div>

            <Tabs defaultValue="published" className="space-y-6">
              <TabsList className="bg-slate-800/50 border border-white/10">
                <TabsTrigger value="published" className="text-white data-[state=active]:bg-purple-500">
                  Published ({publishedProjects.length})
                </TabsTrigger>
                <TabsTrigger value="drafts" className="text-white data-[state=active]:bg-purple-500">
                  Drafts ({draftProjects.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="published">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publishedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="drafts">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {draftProjects.map((project) => (
                    <div key={project.id} className="relative">
                      <ProjectCard project={project} />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                          Draft
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Project Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {publishedProjects.map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm truncate">{project.title}</span>
                          <span className="text-gray-400 text-sm">{project.views} views</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="gradient-primary h-2 rounded-full" 
                            style={{ width: `${(project.views / Math.max(...publishedProjects.map(p => p.views))) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">{totalLikes}</div>
                      <div className="text-gray-400 text-sm">Total Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">{totalComments}</div>
                      <div className="text-gray-400 text-sm">Total Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {publishedProjects.length > 0 ? Math.round(totalViews / publishedProjects.length) : 0}
                      </div>
                      <div className="text-gray-400 text-sm">Avg Views per Project</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-dark border-white/10 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse mr-2"></div>
                    AI Project Summary
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Generate compelling project descriptions using AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gradient-primary hover:opacity-90">
                    Generate Summary
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-dark border-white/10 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mr-2"></div>
                    AI Tag Suggestions
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Get intelligent tag recommendations for better discoverability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gradient-primary hover:opacity-90">
                    Suggest Tags
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-dark border-white/10 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
                    Portfolio Optimizer
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    AI analysis of your portfolio with improvement suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gradient-primary hover:opacity-90">
                    Analyze Portfolio
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-dark border-white/10 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse mr-2"></div>
                    Skill Gap Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Identify trending skills and technologies to learn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gradient-primary hover:opacity-90">
                    Analyze Skills
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
