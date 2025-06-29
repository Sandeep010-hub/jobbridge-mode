import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProfileCard } from '@/components/ProfileCard';
import { AIProjectCard } from '@/components/AIProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { usersAPI, projectsAPI, aiAPI } from '@/services/api';
import { Search, Users, Briefcase, Star, Plus, Filter, TrendingUp, Zap } from 'lucide-react';

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [candidatesRes, projectsRes, insightsRes] = await Promise.all([
        usersAPI.searchUsers({ type: 'student', limit: 6 }),
        projectsAPI.getTrendingProjects({ limit: 6 }),
        aiAPI.getRecruiterInsights()
      ]);

      setCandidates(candidatesRes.data.users);
      setTrendingProjects(projectsRes.data.projects);
      setInsights(insightsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await usersAPI.searchUsers({
        q: searchQuery,
        skills: selectedSkills.join(','),
        type: 'student'
      });
      setCandidates(response.data.users);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const skillOptions = [
    'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript',
    'JavaScript', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native',
    'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch', 'MongoDB', 'PostgreSQL'
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-space font-bold text-white mb-2">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-400">
              Discover exceptional talent through AI-powered project analysis
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
              <Users className="w-4 h-4 mr-2" />
              Saved Candidates
            </Button>
            <Button className="gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Post Job
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-dark border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Searches</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Search className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Candidates Viewed</p>
                  <p className="text-2xl font-bold text-white">{insights?.developerStats?.active || 127}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Shortlisted</p>
                  <p className="text-2xl font-bold text-white">23</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Hired</p>
                  <p className="text-2xl font-bold text-white">5</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <TabsTrigger value="candidates" className="text-white data-[state=active]:bg-purple-500">
              Find Talent
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-purple-500">
              Trending Projects
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-white data-[state=active]:bg-purple-500">
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Recommendations */}
              <div className="lg:col-span-2">
                <Card className="glass-dark border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-purple-400" />
                      AI-Recommended Candidates
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Candidates matched using AI analysis of their projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {candidates.slice(0, 3).map((candidate) => (
                          <div key={candidate.id} className="flex items-center space-x-4 p-4 rounded-lg bg-slate-800/30">
                            <img 
                              src={candidate.avatar} 
                              alt={candidate.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="text-white font-medium">{candidate.name}</h4>
                                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                  {Math.floor(Math.random() * 20) + 80}% match
                                </Badge>
                              </div>
                              <p className="text-gray-400 text-sm truncate mb-2">{candidate.bio}</p>
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills?.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs bg-gray-800/50 text-gray-300 border-gray-600">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button size="sm" className="gradient-primary hover:opacity-90" asChild>
                              <Link to={`/profile/${candidate.id}`}>
                                View Profile
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card className="glass-dark border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full gradient-primary hover:opacity-90" asChild>
                      <Link to="/explore">
                        <Search className="w-4 h-4 mr-2" />
                        Browse Projects
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                      <Plus className="w-4 h-4 mr-2" />
                      Post New Job
                    </Button>
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Team
                    </Button>
                  </CardContent>
                </Card>

                {/* Trending Technologies */}
                {insights && (
                  <Card className="glass-dark border-white/10 mt-6">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Trending Technologies
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {insights.trendingTechnologies?.slice(0, 5).map((tech, index) => (
                          <div key={tech.technology} className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <span className="text-purple-400 font-bold text-sm">#{index + 1}</span>
                              <span className="text-white text-sm">{tech.technology}</span>
                            </div>
                            <span className="text-gray-400 text-xs">{tech.projectCount} projects</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-6">
            {/* Search and Filters */}
            <Card className="glass-dark border-white/10">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search by name, skills, or bio..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                  </div>
                  <div>
                    <Button onClick={handleSearch} className="w-full gradient-primary hover:opacity-90">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>

                {/* Skill Filters */}
                <div>
                  <label className="text-white text-sm mb-2 block">Filter by Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "secondary"}
                        className={`cursor-pointer transition-colors ${
                          selectedSkills.includes(skill)
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => {
                          setSelectedSkills(prev =>
                            prev.includes(skill)
                              ? prev.filter(s => s !== skill)
                              : [...prev, skill]
                          );
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Candidates Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="relative">
                    <ProfileCard profile={candidate} />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        {Math.floor(Math.random() * 20) + 80}% match
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-space font-bold text-white">Trending Projects</h2>
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10" asChild>
                <Link to="/trending">
                  View All Trending
                </Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingProjects.map((project) => (
                  <AIProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {insights ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-dark border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Technology Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {insights.trendingTechnologies?.slice(0, 10).map((tech, index) => (
                        <div key={tech.technology} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">{tech.technology}</span>
                            <span className="text-white font-semibold">{tech.projectCount}</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className="gradient-primary h-2 rounded-full" 
                              style={{ 
                                width: `${(tech.projectCount / insights.trendingTechnologies[0].projectCount) * 100}%` 
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
                    <CardTitle className="text-white">Developer Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">
                          {insights.developerStats?.total || 0}
                        </div>
                        <div className="text-gray-400 text-sm">Total Developers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">
                          {insights.developerStats?.active || 0}
                        </div>
                        <div className="text-gray-400 text-sm">Active This Week</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">
                          {insights.developerStats?.activityRate || 0}%
                        </div>
                        <div className="text-gray-400 text-sm">Activity Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}