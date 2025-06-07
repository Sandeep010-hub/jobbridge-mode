
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProfileCard } from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Users, Briefcase, Star, Plus, Filter } from 'lucide-react';

// Mock data for suggested candidates
const suggestedCandidates = [
  {
    id: '1',
    name: 'Sarah Chen',
    bio: 'Full-stack developer passionate about AI and machine learning. 3+ years experience building scalable web applications.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    followers: 1247,
    following: 892,
    projects: 15,
    skills: ['Python', 'React', 'TensorFlow', 'AWS', 'Docker'],
    type: 'student' as const,
    location: 'San Francisco, CA',
    matchScore: 95
  },
  {
    id: '2',
    name: 'Alex Rivera',
    bio: 'Frontend specialist with expertise in React and modern web technologies. Love creating beautiful user experiences.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: 892,
    following: 654,
    projects: 12,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Figma'],
    type: 'student' as const,
    location: 'New York, NY',
    matchScore: 88
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    bio: 'DevOps engineer focused on cloud infrastructure and automation. Experience with AWS, Docker, and Kubernetes.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    followers: 567,
    following: 423,
    projects: 8,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Python', 'Terraform'],
    type: 'student' as const,
    location: 'Austin, TX',
    matchScore: 82
  }
];

const openPositions = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    skills: ['React', 'TypeScript', 'Node.js'],
    applicants: 12,
    created: '2024-01-10',
    status: 'active'
  },
  {
    id: '2',
    title: 'AI/ML Engineer',
    company: 'InnovateLab',
    location: 'San Francisco, CA',
    type: 'Full-time',
    skills: ['Python', 'TensorFlow', 'PyTorch'],
    applicants: 8,
    created: '2024-01-05',
    status: 'active'
  }
];

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // New job posting form state
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);

  const filteredCandidates = suggestedCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => candidate.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-space font-bold text-white mb-2">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-400">
              Find exceptional talent through project-based discovery
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
                  <p className="text-gray-400 text-sm">Active Jobs</p>
                  <p className="text-2xl font-bold text-white">{openPositions.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Candidates Viewed</p>
                  <p className="text-2xl font-bold text-white">127</p>
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
            <TabsTrigger value="jobs" className="text-white data-[state=active]:bg-purple-500">
              My Jobs
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-500">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Recommendations */}
              <div className="lg:col-span-2">
                <Card className="glass-dark border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse mr-2"></div>
                      AI-Recommended Candidates
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Candidates matched to your requirements using AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {suggestedCandidates.slice(0, 3).map((candidate) => (
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
                                {candidate.matchScore}% match
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm truncate mb-2">{candidate.bio}</p>
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.slice(0, 3).map((skill) => (
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
                    <div className="mt-4 text-center">
                      <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                        View All Recommendations
                      </Button>
                    </div>
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

                {/* Recent Activity */}
                <Card className="glass-dark border-white/10 mt-6">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <p className="text-gray-300">Sarah Chen viewed your job posting</p>
                        <p className="text-gray-500 text-xs">2 hours ago</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-300">Alex Rivera applied to Frontend role</p>
                        <p className="text-gray-500 text-xs">5 hours ago</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-300">New project in React category</p>
                        <p className="text-gray-500 text-xs">1 day ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                      />
                    </div>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger className="bg-slate-800/50 border-gray-600 text-white">
                        <SelectValue placeholder="Experience Level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-gray-600">
                        <SelectItem value="junior" className="text-white hover:bg-slate-700">Junior (0-2 years)</SelectItem>
                        <SelectItem value="mid" className="text-white hover:bg-slate-700">Mid-level (2-5 years)</SelectItem>
                        <SelectItem value="senior" className="text-white hover:bg-slate-700">Senior (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Skill Filters */}
                <div>
                  <Label className="text-white text-sm mb-2 block">Filter by Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Python', 'TypeScript', 'AWS', 'Docker', 'Node.js', 'TensorFlow'].map((skill) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="relative">
                  <ProfileCard profile={candidate} />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      {candidate.matchScore}% match
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-space font-bold text-white">Open Positions</h2>
              <Button className="gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            <div className="space-y-4">
              {openPositions.map((job) => (
                <Card key={job.id} className="glass-dark border-white/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-2">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
                          <span>{job.company}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs bg-gray-800/50 text-gray-300 border-gray-600">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <span>{job.applicants} applicants</span>
                          <span>•</span>
                          <span>Posted {new Date(job.created).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          Edit
                        </Button>
                        <Button size="sm" className="gradient-primary hover:opacity-90">
                          View Applicants
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-dark border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Hiring Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Applications Received</span>
                      <span className="text-white font-semibold">156</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="gradient-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Screening Passed</span>
                      <span className="text-white font-semibold">89</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="gradient-primary h-2 rounded-full" style={{ width: '57%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Interviews Scheduled</span>
                      <span className="text-white font-semibold">34</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="gradient-primary h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Offers Extended</span>
                      <span className="text-white font-semibold">12</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="gradient-primary h-2 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Top Skills in Demand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { skill: 'React', percentage: 85 },
                      { skill: 'Python', percentage: 78 },
                      { skill: 'TypeScript', percentage: 72 },
                      { skill: 'AWS', percentage: 65 },
                      { skill: 'Docker', percentage: 58 }
                    ].map((item) => (
                      <div key={item.skill} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{item.skill}</span>
                          <span className="text-white font-semibold">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="gradient-primary h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
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
