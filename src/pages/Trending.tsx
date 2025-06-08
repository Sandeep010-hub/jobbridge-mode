import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Clock, Star, Zap } from 'lucide-react';

const trendingProjects = [
  {
    id: '1',
    title: 'Real-time Chat with WebRTC',
    description: 'Built a Slack-like chat application with video calling, screen sharing, and real-time collaboration features.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    tags: ['WebRTC', 'React', 'Node.js', 'Socket.io'],
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      id: '1'
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    likes: 3421,
    comments: 187,
    trending: true
  },
  {
    id: '2',
    title: 'AI Code Review Assistant',
    description: 'GPT-powered tool that reviews code, suggests improvements, and explains complex algorithms in plain English.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
    tags: ['AI/ML', 'Python', 'OpenAI', 'FastAPI'],
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      id: '2'
    },
    githubUrl: 'https://github.com',
    likes: 2891,
    comments: 143,
    trending: true
  },
  {
    id: '3',
    title: 'Blockchain Voting System',
    description: 'Secure, transparent voting platform using Ethereum smart contracts with zero-knowledge proofs for privacy.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    tags: ['Blockchain', 'Solidity', 'React', 'Web3'],
    author: {
      name: 'Sofia Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      id: '3'
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    likes: 2456,
    comments: 98,
    trending: true
  },
  {
    id: '4',
    title: 'AR Interior Design App',
    description: 'Mobile app that lets users visualize furniture in their space using ARKit/ARCore with realistic lighting.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    tags: ['AR', 'Swift', 'ARKit', 'Unity'],
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      id: '4'
    },
    githubUrl: 'https://github.com',
    likes: 1876,
    comments: 76,
    trending: true
  },
  {
    id: '5',
    title: 'Distributed Task Queue',
    description: 'High-performance task queue system handling millions of jobs with Redis, built for microservices architecture.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    tags: ['Distributed Systems', 'Go', 'Redis', 'Docker'],
    author: {
      name: 'Aisha Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      id: '5'
    },
    githubUrl: 'https://github.com',
    likes: 1654,
    comments: 89,
    trending: true
  },
  {
    id: '6',
    title: 'Neural Style Transfer API',
    description: 'REST API that applies artistic styles to images using deep learning, with real-time processing capabilities.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
    tags: ['Deep Learning', 'Python', 'TensorFlow', 'FastAPI'],
    author: {
      name: 'James Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      id: '6'
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    likes: 1432,
    comments: 67,
    trending: true
  }
];

const categories = [
  { name: 'All', count: 156, active: true },
  { name: 'AI/ML', count: 42, active: false },
  { name: 'Web3', count: 28, active: false },
  { name: 'Mobile', count: 35, active: false },
  { name: 'DevOps', count: 19, active: false },
  { name: 'AR/VR', count: 15, active: false },
  { name: 'Backend', count: 17, active: false },
];

export default function Trending() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 animated-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 text-sm font-medium">Trending Now</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-space font-bold text-white mb-6">
              Trending
              <span className="gradient-text"> Projects</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Discover the most innovative projects gaining traction in the developer community. 
              From cutting-edge AI to revolutionary blockchain solutions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <Card className="glass border-white/10 text-center">
              <CardContent className="p-4">
                <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-gray-400 text-sm">Trending</div>
              </CardContent>
            </Card>
            <Card className="glass border-white/10 text-center">
              <CardContent className="p-4">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-gray-400 text-sm">Updated</div>
              </CardContent>
            </Card>
            <Card className="glass border-white/10 text-center">
              <CardContent className="p-4">
                <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-gray-400 text-sm">Total Likes</div>
              </CardContent>
            </Card>
            <Card className="glass border-white/10 text-center">
              <CardContent className="p-4">
                <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={category.active ? "default" : "outline"}
                className={category.active 
                  ? "gradient-primary hover:opacity-90" 
                  : "border-white/20 text-gray-300 hover:bg-white/10"
                }
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 bg-white/10 text-white">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Projects */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-space font-bold text-white">
              🔥 Hot Right Now
            </h2>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Updated 2 hours ago</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProjects.map((project, index) => (
              <div key={project.id} className="relative">
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                )}
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10" size="lg">
              Load More Trending Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Weekly Highlights */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-space font-bold text-white mb-4">
              This Week's Highlights
            </h2>
            <p className="text-xl text-gray-400">
              Projects that caught our attention this week
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass border-white/10 hover-lift">
              <CardContent className="p-6">
                <Badge className="gradient-primary mb-4">Editor's Pick</Badge>
                <h3 className="text-xl font-semibold text-white mb-2">
                  AI-Powered Code Review Tool
                </h3>
                <p className="text-gray-400 mb-4">
                  Revolutionary approach to automated code review using GPT-4
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400">by Emma Wilson</span>
                  <span className="text-gray-400">3.4K likes</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/10 hover-lift">
              <CardContent className="p-6">
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 mb-4">
                  Rising Star
                </Badge>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Blockchain Voting System
                </h3>
                <p className="text-gray-400 mb-4">
                  Secure and transparent voting using zero-knowledge proofs
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400">by David Kim</span>
                  <span className="text-gray-400">2.9K likes</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/10 hover-lift">
              <CardContent className="p-6">
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 mb-4">
                  Community Choice
                </Badge>
                <h3 className="text-xl font-semibold text-white mb-2">
                  AR Interior Design App
                </h3>
                <p className="text-gray-400 mb-4">
                  Visualize furniture in your space with realistic AR
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400">by Sofia Rodriguez</span>
                  <span className="text-gray-400">2.5K likes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
