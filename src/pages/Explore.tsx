import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const mockProjects = [
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
  },
  {
    id: '4',
    title: 'Mobile AR Furniture App',
    description: 'Augmented reality app that lets users visualize furniture in their homes before buying.',
    image: 'https://images.unsplash.com/photo-1555041469-adc18c9b95ca?w=600&h=400&fit=crop',
    tags: ['AR/VR', 'Mobile', 'Swift', 'SceneKit'],
    author: {
      name: 'Emily White',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e79?w=150&h=150&fit=crop&crop=face',
      id: '4'
    },
    githubUrl: 'https://github.com',
    likes: 765,
    comments: 92,
  },
  {
    id: '5',
    title: 'Personal Finance Tracker',
    description: 'Web app to track income, expenses, and investments with interactive charts and reports.',
    image: 'https://images.unsplash.com/photo-1507838235408-4750c35caaaf?w=600&h=400&fit=crop',
    tags: ['Web Development', 'React', 'Redux', 'Chart.js'],
    author: {
      name: 'Kevin Lee',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00d0cb3ca6e5?w=150&h=150&fit=crop&crop=face',
      id: '5'
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    likes: 981,
    comments: 112,
  },
  {
    id: '6',
    title: 'AI-Powered Music Generator',
    description: 'Generative model that creates original music compositions based on user preferences.',
    image: 'https://images.unsplash.com/photo-1586293748773-297066b64a9a?w=600&h=400&fit=crop',
    tags: ['AI/ML', 'Python', 'TensorFlow', 'Music'],
    author: {
      name: 'Sophia Green',
      avatar: 'https://images.unsplash.com/photo-1534528741702-a0cfae58b737?w=150&h=150&fit=crop&crop=face',
      id: '6'
    },
    githubUrl: 'https://github.com',
    likes: 1452,
    comments: 187,
  },
  {
    id: '7',
    title: 'Decentralized Social Network',
    description: 'Social media platform built on blockchain for secure and censorship-resistant communication.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e4a0ee?w=600&h=400&fit=crop',
    tags: ['Blockchain', 'React', 'Ethereum', 'IPFS'],
    author: {
      name: 'Ethan Black',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
      id: '7'
    },
    githubUrl: 'https://github.com',
    likes: 678,
    comments: 76,
  },
  {
    id: '8',
    title: 'Smart Home Automation System',
    description: 'IoT system to control lights, temperature, and security using voice commands and mobile app.',
    image: 'https://images.unsplash.com/photo-1484150053570-71ca78a3733a?w=600&h=400&fit=crop',
    tags: ['IoT', 'Python', 'Raspberry Pi', 'Mobile'],
    author: {
      name: 'Olivia Taylor',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff02944639f?w=150&h=150&fit=crop&crop=face',
      id: '8'
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    likes: 1123,
    comments: 134,
  },
  {
    id: '9',
    title: 'AI-Driven Stock Trading Bot',
    description: 'Algorithmic trading bot that uses machine learning to predict stock prices and automate trades.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
    tags: ['AI/ML', 'Python', 'Finance', 'Trading'],
    author: {
      name: 'William Brown',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      id: '9'
    },
    githubUrl: 'https://github.com',
    likes: 1678,
    comments: 212,
  }
];

// Add more mock projects to fill the grid
for (let i = 2; i <= 12; i++) {
  mockProjects.push({
    id: i.toString(),
    title: `Innovative Project ${i}`,
    description: `A cutting-edge solution that demonstrates advanced technical skills and creative problem-solving in modern software development.`,
    image: `https://images.unsplash.com/photo-${1498050108023 + i}?w=600&h=400&fit=crop`,
    tags: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    author: {
      name: `Developer ${i}`,
      avatar: `https://images.unsplash.com/photo-${1494790108755 + i}?w=150&h=150&fit=crop&crop=face`,
      id: i.toString()
    },
    githubUrl: 'https://github.com',
    likes: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 50) + 10,
  });
}

const techStacks = [
  'All', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript', 
  'AI/ML', 'Blockchain', 'Mobile', 'Game Dev', 'DevOps', 'Data Science'
];

const categories = [
  'All Categories', 'Web Development', 'Mobile Apps', 'AI/Machine Learning', 
  'Blockchain', 'Game Development', 'Data Science', 'DevOps', 'IoT', 'AR/VR'
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  // Filter and sort projects
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTech = selectedTech === 'All' || project.tags.includes(selectedTech);
    
    return matchesSearch && matchesTech;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'likes':
        return b.likes - a.likes;
      case 'comments':
        return b.comments - a.comments;
      case 'recent':
      default:
        return 0; // Keep original order for recent
    }
  });

  // Paginate projects
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = sortedProjects.slice(startIndex, startIndex + projectsPerPage);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-space font-bold text-white mb-4">
            Explore Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover exceptional work from talented developers worldwide
          </p>
        </div>

        {/* Filters */}
        <div className="glass rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search projects, technologies, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Tech Stack Filter */}
            <div>
              <Select value={selectedTech} onValueChange={setSelectedTech}>
                <SelectTrigger className="bg-slate-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Tech Stack" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-gray-600">
                  {techStacks.map((tech) => (
                    <SelectItem key={tech} value={tech} className="text-white hover:bg-slate-700">
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-slate-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-gray-600">
                  <SelectItem value="recent" className="text-white hover:bg-slate-700">Most Recent</SelectItem>
                  <SelectItem value="likes" className="text-white hover:bg-slate-700">Most Liked</SelectItem>
                  <SelectItem value="comments" className="text-white hover:bg-slate-700">Most Discussed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {techStacks.slice(0, 8).map((tech) => (
              <Badge
                key={tech}
                variant={selectedTech === tech ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  selectedTech === tech
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-400">
            {filteredProjects.length} projects found
          </p>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Filters applied</span>
          </div>
        </div>

        {/* Projects Grid */}
        {paginatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or explore different categories
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedTech('All');
                setSelectedCategory('All Categories');
              }}
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Previous
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={
                    currentPage === pageNum
                      ? "gradient-primary"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }
                >
                  {pageNum}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
