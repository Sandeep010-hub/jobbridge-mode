
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Github, Upload, BookmarkIcon } from 'lucide-react';

const featuredProjects = [
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
    title: 'Blockchain Supply Chain Tracker',
    description: 'Transparent supply chain tracking using Ethereum smart contracts and IPFS for immutable records.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    tags: ['Blockchain', 'Solidity', 'React', 'IPFS'],
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      id: '2'
    },
    githubUrl: 'https://github.com',
    likes: 892,
    comments: 156,
  },
  {
    id: '3',
    title: 'Real-time Collaborative IDE',
    description: 'VSCode-like editor with real-time collaboration, video chat, and AI-powered code completion.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    tags: ['WebRTC', 'Node.js', 'Socket.io', 'Monaco Editor'],
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      id: '3'
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    likes: 2156,
    comments: 234,
  }
];

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-bg opacity-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-purple-500/20 blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-blue-500/20 blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-purple-400/20 blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <span className="text-purple-300 text-sm font-medium">AI-Powered Talent Discovery</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-space font-bold text-white mb-6">
              Bridge Your Projects to{' '}
              <span className="gradient-text">Real Opportunities</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              The next-generation platform connecting ambitious developers with innovative companies through 
              project-based showcases and AI-powered matching.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              {!user ? (
                <>
                  <Button size="lg" className="gradient-primary hover:opacity-90 text-lg px-8 py-4" asChild>
                    <Link to="/register">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 text-lg px-8 py-4" asChild>
                    <Link to="/explore">
                      Explore Projects
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" className="gradient-primary hover:opacity-90 text-lg px-8 py-4" asChild>
                    <Link to={user.type === 'student' ? '/upload' : '/recruiter-dashboard'}>
                      {user.type === 'student' ? 'Upload Project' : 'Find Talent'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 text-lg px-8 py-4" asChild>
                    <Link to="/explore">
                      Explore Projects
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-gray-400 text-sm">Active Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-gray-400 text-sm">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">25K+</div>
                <div className="text-gray-400 text-sm">Projects Showcase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-gray-400 text-sm">Match Success</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover exceptional work from talented developers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="featured" />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10" asChild>
              <Link to="/explore">
                View All Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6">
            Ready to Bridge Your Future?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of developers and companies building the future of tech recruitment
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary hover:opacity-90 text-lg px-8 py-4" asChild>
              <Link to="/register">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4" asChild>
              <Link to="/explore">
                Explore Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
