
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Upload as UploadIcon, Github, Link as LinkIcon, X, Plus } from 'lucide-react';

const categories = [
  'Web Development',
  'Mobile Apps',
  'AI/Machine Learning',
  'Blockchain',
  'Game Development',
  'Data Science',
  'DevOps',
  'IoT',
  'AR/VR',
  'Other'
];

const popularTags = [
  'React', 'Vue', 'Angular', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'Java', 'C++', 'Swift', 'Kotlin', 'Flutter', 'TensorFlow', 'PyTorch',
  'Docker', 'Kubernetes', 'AWS', 'Firebase', 'MongoDB', 'PostgreSQL'
];

export default function Upload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [aiPreview, setAiPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 10) {
      setTags([...tags, tag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Project uploaded successfully!",
      description: "Your project is now live and visible to recruiters.",
    });

    setIsLoading(false);
    navigate('/student-dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-space font-bold text-white mb-4">
            Upload Your Project
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcase your work to potential employers and the developer community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="glass-dark border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Project Details</CardTitle>
              <CardDescription className="text-gray-400">
                Provide the basic information about your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Project Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your project a compelling title"
                  required
                  className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what your project does, the technologies used, and what problems it solves..."
                  rows={5}
                  required
                  className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="bg-slate-800/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-gray-600">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-white hover:bg-slate-700">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          <Card className="glass-dark border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Project Links</CardTitle>
              <CardDescription className="text-gray-400">
                Add links to your code repository and live demo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="githubUrl" className="text-white flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Repository
                </Label>
                <Input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveUrl" className="text-white flex items-center">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Live Demo URL
                </Label>
                <Input
                  id="liveUrl"
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://yourproject.com"
                  className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="glass-dark border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Technologies & Tags</CardTitle>
              <CardDescription className="text-gray-400">
                Add relevant technologies and tags to help others discover your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Add Tag</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Enter a technology or tag"
                    className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(newTag);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddTag(newTag)}
                    variant="outline"
                    className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <Label className="text-white text-sm mb-2 block">Popular Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={`cursor-pointer transition-colors ${
                        tags.includes(tag)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => handleAddTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Selected Tags */}
              {tags.length > 0 && (
                <div>
                  <Label className="text-white text-sm mb-2 block">Selected Tags ({tags.length}/10)</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="default"
                        className="bg-purple-500 text-white pr-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card className="glass-dark border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse mr-2"></div>
                AI-Powered Features
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enhance your project with AI-generated content and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">AI Project Preview</Label>
                  <p className="text-sm text-gray-400">
                    Generate an AI-powered preview and summary of your project
                  </p>
                </div>
                <Switch
                  checked={aiPreview}
                  onCheckedChange={setAiPreview}
                />
              </div>

              {aiPreview && (
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-purple-300 text-sm">
                    ✨ AI features will be activated for this project, including automatic tagging suggestions, 
                    project summary generation, and enhanced discovery by recruiters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => navigate('/student-dashboard')}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-primary hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Publish Project
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
