import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GitHubConnect } from '@/components/GitHubConnect';
import { AIProjectCard } from '@/components/AIProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { projectsAPI, aiAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Upload, Plus, BarChart3, Users, Eye, Github, Zap, TrendingUp, Target } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skillGaps, setSkillGaps] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProjects();
      fetchSkillGaps();
    }
  }, [user]);

  const fetchUserProjects = async () => {
    try {
      const response = await projectsAPI.getUserProjects(user.id);
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSkillGaps = async () => {
    try {
      const response = await aiAPI.analyzeSkillGaps();
      setSkillGaps(response.data);
    } catch (error) {
      console.error('Error fetching skill gaps:', error);
    }
  };

  const handleProjectsSync = () => {
    fetchUserProjects();
    toast({
      title: "Projects Updated!",
      description: "Your projects have been synced successfully.",
    });
  };

  const generateAISummary = async () => {
    setIsGeneratingAI(true);
    try {
      const response = await aiAPI.generateUserSummary(user.id);
      toast({
        title: "AI Summary Generated!",
        description: "Your profile summary has been updated with AI insights.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const publishedProjects = projects.filter(p => p.isPublic);
  const draftProjects = projects.filter(p => !p.isPublic);

  const totalLikes = publishedProjects.reduce((sum, project) => sum + (project.likes || 0), 0);
  const totalViews = publishedProjects.reduce((sum, project) => sum + (project.views || 0), 0);
  const totalStars = publishedProjects.reduce((sum, project) => sum + (project.stars || 0), 0);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-space font-bold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-400">
              Manage your AI-powered developer portfolio
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
                  <p className="text-gray-400 text-sm">GitHub Stars</p>
                  <p className="text-2xl font-bold text-white">{totalStars.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
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
            <TabsTrigger value="ai-tools" className="text-white data-[state=active]:bg-purple-500">
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-500">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* GitHub Integration */}
              <div className="lg:col-span-2">
                <GitHubConnect onProjectsSync={handleProjectsSync} />
              </div>

              {/* AI Profile Summary */}
              <div>
                <Card className="glass-dark border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-purple-400" />
                      AI Profile Summary
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Generate an AI-powered professional summary
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user?.aiSummary ? (
                      <div className="space-y-4">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {user.aiSummary}
                        </p>
                        <Button
                          onClick={generateAISummary}
                          disabled={isGeneratingAI}
                          variant="outline"
                          className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                        >
                          {isGeneratingAI ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400 mr-2"></div>
                              Regenerating...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Regenerate
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-400 text-sm">
                          Generate a professional summary based on your projects and skills
                        </p>
                        <Button
                          onClick={generateAISummary}
                          disabled={isGeneratingAI}
                          className="w-full gradient-primary hover:opacity-90"
                        >
                          {isGeneratingAI ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Generate AI Summary
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Projects */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Projects</CardTitle>
                <CardDescription className="text-gray-400">
                  Your latest AI-enhanced project uploads
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                  </div>
                ) : projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.slice(0, 6).map((project) => (
                      <AIProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Github className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">No projects yet</h3>
                    <p className="text-gray-400 mb-4">
                      Connect your GitHub account or upload your first project
                    </p>
                    <Button className="gradient-primary hover:opacity-90" asChild>
                      <Link to="/upload">
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Project
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
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
                  Private ({draftProjects.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="published">
                {publishedProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publishedProjects.map((project) => (
                      <AIProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">No published projects</h3>
                    <p className="text-gray-400 mb-4">
                      Upload your first project to showcase your skills
                    </p>
                    <Button className="gradient-primary hover:opacity-90" asChild>
                      <Link to="/upload">
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Project
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="drafts">
                {draftProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {draftProjects.map((project) => (
                      <div key={project.id} className="relative">
                        <AIProjectCard project={project} />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                            Private
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">No private projects</h3>
                    <p className="text-gray-400">
                      All your projects are public and visible to recruiters
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="ai-tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Profile Summary */}
              <Card className="glass-dark border-white/10 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-400" />
                    AI Profile Summary
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Generate compelling profile descriptions using AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={generateAISummary}
                    disabled={isGeneratingAI}
                    className="w-full gradient-primary hover:opacity-90"
                  >
                    {isGeneratingAI ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Summary
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Skill Gap Analysis */}
              <Card className="glass-dark border-white/10 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                    Skill Gap Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Identify trending skills and technologies to learn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {skillGaps ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Recommended Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {skillGaps.skillGaps.slice(0, 3).map((skill) => (
                            <Badge key={skill} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        onClick={fetchSkillGaps}
                        variant="outline"
                        className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Refresh Analysis
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={fetchSkillGaps}
                      className="w-full gradient-primary hover:opacity-90"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Analyze Skills
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
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
                    {publishedProjects.slice(0, 5).map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm truncate">{project.title}</span>
                          <span className="text-gray-400 text-sm">{project.views || 0} views</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="gradient-primary h-2 rounded-full" 
                            style={{ 
                              width: `${publishedProjects.length > 0 ? 
                                ((project.views || 0) / Math.max(...publishedProjects.map(p => p.views || 0), 1)) * 100 
                                : 0}%` 
                            }}
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
                      <div className="text-3xl font-bold text-white mb-2">{totalViews}</div>
                      <div className="text-gray-400 text-sm">Total Views</div>
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
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}