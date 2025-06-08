import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { ProfileCard } from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Users, TrendingUp, Calendar, Search, Plus } from 'lucide-react';

const communityPosts = [
  {
    id: '1',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      id: '2',
      followers: 892
    },
    content: 'Just finished building a real-time collaborative code editor using WebRTC! The synchronization was tricky but finally got it working smoothly. Anyone else working on similar projects?',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    tags: ['WebRTC', 'React', 'Collaboration'],
    likes: 156,
    comments: 23,
    timestamp: '2 hours ago',
    type: 'project_share'
  },
  {
    id: '2',
    author: {
      name: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      id: '3',
      followers: 567
    },
    content: 'Looking for feedback on my latest ML model for image classification. Achieved 94% accuracy on the test set. What are your thoughts on the architecture?',
    tags: ['Machine Learning', 'Python', 'TensorFlow'],
    likes: 89,
    comments: 34,
    timestamp: '5 hours ago',
    type: 'feedback_request'
  },
  {
    id: '3',
    author: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      id: '4',
      followers: 1234
    },
    content: 'Just got hired at my dream company! The portfolio I built on JobBridge really made the difference. Thank you to this amazing community for all the support! 🎉',
    likes: 445,
    comments: 67,
    timestamp: '1 day ago',
    type: 'success_story'
  }
];

const trendingTopics = [
  { name: 'AI/Machine Learning', posts: 1245, trend: '+15%' },
  { name: 'React Development', posts: 892, trend: '+8%' },
  { name: 'Blockchain', posts: 567, trend: '+22%' },
  { name: 'Mobile Development', posts: 445, trend: '+5%' },
  { name: 'DevOps', posts: 334, trend: '+12%' }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'AI/ML Showcase Week',
    description: 'Share your latest AI projects and get feedback from the community',
    date: '2024-02-15',
    participants: 234,
    type: 'showcase'
  },
  {
    id: '2',
    title: 'Open Source Friday',
    description: 'Contribute to open source projects and collaborate with others',
    date: '2024-02-09',
    participants: 156,
    type: 'collaboration'
  },
  {
    id: '3',
    title: 'Frontend Masters Workshop',
    description: 'Live coding session on modern React patterns',
    date: '2024-02-20',
    participants: 89,
    type: 'workshop'
  }
];

const featuredMembers = [
  {
    id: '1',
    name: 'Sarah Chen',
    bio: 'AI/ML Engineer specializing in computer vision and NLP',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    followers: 1247,
    following: 892,
    projects: 15,
    skills: ['Python', 'TensorFlow', 'React', 'AWS'],
    type: 'student' as const,
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Alex Rivera',
    bio: 'Frontend specialist with expertise in React and modern web technologies',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: 892,
    following: 654,
    projects: 12,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    type: 'student' as const,
    location: 'New York, NY'
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(communityPosts || []);
  const { toast } = useToast();

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: String(posts.length + 1),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=150&h=150&fit=crop&crop=face',
        id: 'current',
        followers: 42
      },
      content: newPost,
      tags: [],
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      type: 'general' as const
    };

    setPosts([post, ...posts]);
    setNewPost('');
    
    toast({
      title: "Post shared!",
      description: "Your post has been shared with the community.",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-space font-bold text-white mb-4">
            Developer Community
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect, share, and grow with talented developers from around the world
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-dark border-white/10 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">15.2K</div>
              <div className="text-gray-400 text-sm">Active Members</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-white/10 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">3.4K</div>
              <div className="text-gray-400 text-sm">Posts Today</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-white/10 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">890</div>
              <div className="text-gray-400 text-sm">Projects Shared</div>
            </CardContent>
          </Card>
          <Card className="glass-dark border-white/10 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">145</div>
              <div className="text-gray-400 text-sm">Collaborations</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Share Project
                </Button>
                <Button variant="outline" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                  <Users className="w-4 h-4 mr-2" />
                  Find Collaborators
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Join Event
                </Button>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(trendingTopics || []).map((topic, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium text-sm">{topic.name}</div>
                        <div className="text-gray-400 text-xs">{topic.posts} posts</div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        {topic.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(upcomingEvents || []).map((event) => (
                    <div key={event.id} className="p-3 rounded-lg bg-slate-800/30">
                      <h4 className="text-white font-medium text-sm mb-1">{event.title}</h4>
                      <p className="text-gray-400 text-xs mb-2">{event.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-xs">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="text-purple-300 text-xs">
                          {event.participants} joining
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-slate-800/50 border border-white/10">
                <TabsTrigger value="feed" className="text-white data-[state=active]:bg-purple-500">
                  Feed
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-white data-[state=active]:bg-purple-500">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="members" className="text-white data-[state=active]:bg-purple-500">
                  Members
                </TabsTrigger>
                <TabsTrigger value="events" className="text-white data-[state=active]:bg-purple-500">
                  Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                {/* Create Post */}
                <Card className="glass-dark border-white/10">
                  <CardContent className="p-6">
                    <form onSubmit={handlePost} className="space-y-4">
                      <Textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Share your thoughts, project updates, or ask for help..."
                        className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                        rows={3}
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button type="button" size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            📷 Photo
                          </Button>
                          <Button type="button" size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            🔗 Link
                          </Button>
                        </div>
                        <Button type="submit" className="gradient-primary hover:opacity-90">
                          Share
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Posts Feed */}
                <div className="space-y-6">
                  {(posts || []).map((post) => (
                    <Card key={post.id} className="glass-dark border-white/10">
                      <CardContent className="p-6">
                        {/* Post Header */}
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.author?.avatar} />
                            <AvatarFallback>{post.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{post.author?.name || 'Unknown User'}</span>
                              <span className="text-gray-500 text-sm">{post.timestamp}</span>
                            </div>
                            <div className="text-gray-400 text-sm">{post.author?.followers || 0} followers</div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {post.content}
                        </p>

                        {/* Post Image */}
                        {post.image && (
                          <div className="mb-4">
                            <img 
                              src={post.image} 
                              alt="Post content"
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        )}

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                          <div className="flex items-center space-x-6">
                            <button
                              onClick={() => handleLike(post.id)}
                              className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span>{post.likes || 0}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                              <MessageCircle className="w-5 h-5" />
                              <span>{post.comments || 0}</span>
                            </button>
                          </div>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-space font-bold text-white">Community Projects</h2>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search projects..."
                        className="pl-10 bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* This would show featured community projects */}
                  <div className="text-center py-12 col-span-full">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Discover Amazing Projects</h3>
                    <p className="text-gray-400 mb-6">
                      Explore projects shared by the community
                    </p>
                    <Button className="gradient-primary hover:opacity-90">
                      Browse All Projects
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="members" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-space font-bold text-white">Featured Members</h2>
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                    View All Members
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(featuredMembers || []).map((member) => (
                    <ProfileCard key={member.id} profile={member} variant="compact" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-space font-bold text-white">Community Events</h2>
                  <Button className="gradient-primary hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {(upcomingEvents || []).map((event) => (
                    <Card key={event.id} className="glass-dark border-white/10">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                            <p className="text-gray-400 mb-4">{event.description}</p>
                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{event.participants} participants</span>
                              </div>
                            </div>
                          </div>
                          <Button className="gradient-primary hover:opacity-90">
                            Join Event
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
