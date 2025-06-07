
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, BookmarkIcon, Upload } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    id: string;
  };
  githubUrl?: string;
  liveUrl?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
}

export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState(project.isLiked || false);
  const [likesCount, setLikesCount] = useState(project.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const cardClasses = variant === 'featured' 
    ? "glass hover-lift rounded-2xl overflow-hidden transition-all duration-300 group relative"
    : "glass hover-lift rounded-xl overflow-hidden transition-all duration-300 group";

  return (
    <div className={cardClasses}>
      {/* Project Image */}
      <Link to={`/project/${project.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick actions overlay */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.githubUrl && (
              <Button
                size="sm"
                variant="secondary"
                className="glass-dark p-2 hover:bg-white/20"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project.githubUrl, '_blank');
                }}
              >
                <Github className="w-4 h-4" />
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="sm"
                variant="secondary"
                className="glass-dark p-2 hover:bg-white/20"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project.liveUrl, '_blank');
                }}
              >
                <Upload className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Author */}
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={project.author.avatar} />
            <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Link 
            to={`/profile/${project.author.id}`}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            {project.author.name}
          </Link>
        </div>

        {/* Title & Description */}
        <Link to={`/project/${project.id}`}>
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-gray-500/20 text-gray-400"
            >
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <svg 
                className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{likesCount}</span>
            </button>
            
            <Link 
              to={`/project/${project.id}`}
              className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">{project.comments}</span>
            </Link>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-purple-400 p-2"
          >
            <BookmarkIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
