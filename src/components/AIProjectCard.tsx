import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, ExternalLink, Heart, MessageCircle, Eye, Zap } from 'lucide-react';

interface AIProject {
  id: string;
  title: string;
  description: string;
  aiSummary?: string;
  githubUrl: string;
  liveUrl?: string;
  language: string;
  languages?: Array<{ name: string; percentage: number }>;
  aiTags: string[];
  skillsDetected: string[];
  complexityScore?: number;
  stars: number;
  forks: number;
  likes: number;
  views: number;
  comments: number;
  owner: {
    id: string;
    name: string;
    avatar: string;
    githubUsername?: string;
  };
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
}

interface AIProjectCardProps {
  project: AIProject;
  variant?: 'default' | 'featured';
  onLike?: (projectId: string) => void;
}

export function AIProjectCard({ project, variant = 'default', onLike }: AIProjectCardProps) {
  const [isLiked, setIsLiked] = useState(project.isLiked || false);
  const [likesCount, setLikesCount] = useState(project.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(project.id);
  };

  const getComplexityColor = (score?: number) => {
    if (!score) return 'bg-gray-500/20 text-gray-300';
    if (score <= 3) return 'bg-green-500/20 text-green-300';
    if (score <= 6) return 'bg-yellow-500/20 text-yellow-300';
    if (score <= 8) return 'bg-orange-500/20 text-orange-300';
    return 'bg-red-500/20 text-red-300';
  };

  const getComplexityLabel = (score?: number) => {
    if (!score) return 'Unknown';
    if (score <= 3) return 'Beginner';
    if (score <= 6) return 'Intermediate';
    if (score <= 8) return 'Advanced';
    return 'Expert';
  };

  const cardClasses = variant === 'featured' 
    ? "glass hover-lift rounded-2xl overflow-hidden transition-all duration-300 group relative border-purple-500/20"
    : "glass hover-lift rounded-xl overflow-hidden transition-all duration-300 group";

  return (
    <Card className={cardClasses}>
      {/* AI Badge */}
      {project.aiSummary && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Zap className="w-3 h-3 mr-1" />
            AI Enhanced
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        {/* Author */}
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={project.owner.avatar} />
            <AvatarFallback>{project.owner.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Link 
              to={`/profile/${project.owner.id}`}
              className="text-sm text-gray-300 hover:text-white transition-colors truncate block"
            >
              {project.owner.name}
            </Link>
            {project.owner.githubUsername && (
              <p className="text-xs text-gray-500">@{project.owner.githubUsername}</p>
            )}
          </div>
        </div>

        {/* Title */}
        <CardTitle className="text-white text-lg line-clamp-2 group-hover:text-purple-300 transition-colors">
          <Link to={`/project/${project.id}`}>
            {project.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AI Summary or Description */}
        <div>
          {project.aiSummary ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-purple-400" />
                <span className="text-xs text-purple-300 font-medium">AI Summary</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                {project.aiSummary}
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {/* Languages */}
        {project.languages && project.languages.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Languages</span>
            </div>
            <div className="flex space-x-1">
              {project.languages.slice(0, 3).map((lang) => (
                <div key={lang.name} className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-300">{lang.name}</span>
                    <span className="text-xs text-gray-500">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div 
                      className="gradient-primary h-1 rounded-full" 
                      style={{ width: `${lang.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Tags */}
        {project.aiTags && project.aiTags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-300">AI Tags</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.aiTags.slice(0, 4).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                >
                  {tag}
                </Badge>
              ))}
              {project.aiTags.length > 4 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-gray-500/20 text-gray-400"
                >
                  +{project.aiTags.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Skills Detected */}
        {project.skillsDetected && project.skillsDetected.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs text-gray-400">Skills Detected</span>
            <div className="flex flex-wrap gap-1">
              {project.skillsDetected.slice(0, 3).map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Complexity Score */}
        {project.complexityScore && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Complexity</span>
            <Badge className={getComplexityColor(project.complexityScore)}>
              {getComplexityLabel(project.complexityScore)} ({project.complexityScore}/10)
            </Badge>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likesCount}</span>
            </button>
            
            <div className="flex items-center space-x-1 text-gray-400">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{project.views}</span>
            </div>

            <Link 
              to={`/project/${project.id}`}
              className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{project.comments}</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {project.githubUrl && (
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white p-2"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white p-2"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}