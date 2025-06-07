import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Github, BookmarkIcon, MapPin, Calendar, Users, Eye, MessageCircle, ArrowLeft } from 'lucide-react';

// Mock profile data
const mockProfile = {
  id: '1',
  name: 'Sarah Chen',
  bio: 'Full-stack developer passionate about AI and machine learning. I love building scalable web applications and exploring the intersection of technology and human creativity. Currently pursuing my MS in Computer Science.',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
  coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
  location: 'San Francisco, CA',
  joinedDate: '2023-01-15',
  followers: 1247,
  following: 892,
  projects: 15,
  totalLikes: 5234,
  totalViews: 23567,
  skills: ['Python', 'React', 'TensorFlow', 'AWS', 'Docker', 'TypeScript', 'Node.js', 'PostgreSQL'],
  type: 'student' as const,
  education: 'MS Computer Science, Stanford University',
  company: 'Software Engineering Intern at Meta',
  website: 'https://sarahchen.dev',
  github: 'https://github.com/sarahchen',
  linkedin: 'https://linkedin.com/in/sarahchen',
  isFollowing: false
};

const userProjects = [
  {
    id: '1',
    title: 'AI-Powered Code Review Tool',
    description: 'Machine learning model that automatically reviews code and suggests improvements with 95% accuracy.',
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
  },
  {
    id: '3',
    title: 'Blockchain Supply Chain Tracker',
    description: 'Transparent supply chain tracking using Ethereum smart contracts and IPFS for immutable records.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    tags: ['Blockchain', 'Solidity', 'React', 'IPFS'],
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      id: '1'
    },
    githubUrl: 'https://github.com',
    likes: 892,
    comments: 156,
  },
  {
    id: '4',
    title: 'AI-Powered Personalized Learning Platform',
    description: 'Adaptive learning platform that tailors educational content to individual student needs using machine learning.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    tags: ['AI/ML', 'React', 'Node.js', 'MongoDB'],
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      id: '1'
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    likes: 678,
    comments: 78,
  },
  {
    id: '5',
    title: 'Decentralized Social Media Platform',
    description: 'A social media platform built on blockchain technology for censorship resistance and user data ownership.',
    image: 'https://images.unsplash.com/photo-1517694712202-14f926a33a92?w=600&h=400&fit=crop',
    tags: ['Blockchain', 'React', 'Ethereum', 'Solidity'],
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      id: '1'
    },
    githubUrl: 'https://github.com',
    likes: 901,
    comments: 112,
  },
  {
    id: '6',
    title: 'Smart Home Automation System',
    description: 'An IoT-based system for automating home appliances and managing energy consumption using sensor data.',
    image: 'https://images.unsplash.com/photo-1484154214916-3637160af402?w=600&h=400&fit=crop',
    tags: ['IoT', 'Python', 'Raspberry Pi', 'AWS IoT'],
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      id: '1'
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    likes: 789,
    comments: 90,
  }
];

// Add more mock projects
for (let i = 2; i <= 6; i++) {
  userProjects.push({
    id: i.toString(),
    title: `Project ${i}`,
    description: `An innovative solution demonstrating advanced technical skills and creative problem-solving.`,
    image: `https://images.unsplash.com/photo-${1498050108023 + i}?w=600&h=400&fit=crop`,
    tags: ['React', 'Node.js', 'TypeScript'],
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      id: '1'
    },
    githubUrl: 'https://github.com',
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 20) + 5,
  });
}

const achievements = [
  { title: 'Top Contributor', description: 'Ranked in top 1% of developers', icon: '🏆' },
  { title: 'AI Specialist', description: 'Recognized for ML expertise', icon: '🤖' },
  { title: 'Community Leader', description: '1000+ followers milestone', icon: '👥' },
  { title: 'Innovation Award', description: 'Most creative project 2024', icon: '💡' }
];

export default function Profile() {
  const { id } = useParams();
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(mockProfile.isFollowing);
  const [activeTab, setActiveTab] = useState('projects');

  const isOwnProfile = user?.id === id;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="text-gray-400 hover:text-white mb-6" asChild>
          <Link to="/explore">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>

        {/* Profile Header */}
        <div className="glass-dark border-white/10 rounded-2xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="relative h-48 md:h-64">
            <img 
              src={mockProfile.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <Avatar className="w-32 h-32 border-4 border-slate-900">
                  <AvatarImage src={mockProfile.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-4xl">
                    {mockProfile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="pb-2">
                  <h1 className="text-3xl font-space font-bold text-white mb-2">
                    {mockProfile.name}
                  </h1>
                  <p className="text-gray-300 text-lg mb-3 max-w-2xl leading-relaxed">
                    {mockProfile.bio}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {mockProfile.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(mockProfile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    {mockProfile.company && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {mockProfile.company}
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    {mockProfile.github && (
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
                        <a href={mockProfile.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {mockProfile.website && (
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
                        <a href={mockProfile.website} target="_blank" rel="noopener noreferrer">
                          <BookmarkIcon className="w-4 h-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 md:mt-0">
                {isOwnProfile ? (
                  <Button className="gradient-primary hover:opacity-90">
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleFollow}
                      variant={isFollowing ? "outline" : "default"}
                      className={isFollowing 
                        ? "border-purple-500/30 text-purple-300 hover:bg-purple-500/10" 
                        : "gradient-primary hover:opacity-90"
                      }
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="glass-dark border-white/10 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{mockProfile.projects}</div>
              <div className="text-gray-400 text-sm">Projects</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-white/10 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{mockProfile.followers.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Followers</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-white/10 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{mockProfile.following.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Following</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-white/10 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{mockProfile.totalLikes.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Likes</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-white/10 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{mockProfile.totalViews.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Profile Views</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockProfile.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="text-white font-medium text-sm">{achievement.title}</div>
                        <div className="text-gray-400 text-xs">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            {mockProfile.education && (
              <Card className="glass-dark border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">{mockProfile.education}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-slate-800/50 border border-white/10">
                <TabsTrigger value="projects" className="text-white data-[state=active]:bg-purple-500">
                  Projects ({userProjects.length})
                </TabsTrigger>
                <TabsTrigger value="activity" className="text-white data-[state=active]:bg-purple-500">
                  Activity
                </TabsTrigger>
                <TabsTrigger value="about" className="text-white data-[state=active]:bg-purple-500">
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card className="glass-dark border-white/10">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                        <div>
                          <p className="text-gray-300">Published <span className="text-white">AI-Powered Code Review Tool</span></p>
                          <p className="text-gray-500 text-sm">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                        <div>
                          <p className="text-gray-300">Received 50+ likes on <span className="text-white">Real-time Chat App</span></p>
                          <p className="text-gray-500 text-sm">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                        <div>
                          <p className="text-gray-300">Gained 100 new followers</p>
                          <p className="text-gray-500 text-sm">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="about">
                <Card className="glass-dark border-white/10">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-white font-semibold mb-2">About</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {mockProfile.bio}
                        </p>
                      </div>
                      
                      {mockProfile.education && (
                        <div>
                          <h3 className="text-white font-semibold mb-2">Education</h3>
                          <p className="text-gray-300">{mockProfile.education}</p>
                        </div>
                      )}

                      {mockProfile.company && (
                        <div>
                          <h3 className="text-white font-semibold mb-2">Experience</h3>
                          <p className="text-gray-300">{mockProfile.company}</p>
                        </div>
                      )}

                      <div>
                        <h3 className="text-white font-semibold mb-2">Interests</h3>
                        <p className="text-gray-300">
                          Artificial Intelligence, Web Development, Open Source, Tech Innovation, Machine Learning Research
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
