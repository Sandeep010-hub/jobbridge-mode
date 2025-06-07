
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Profile {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  projects: number;
  skills: string[];
  type: 'student' | 'recruiter';
  location?: string;
  company?: string;
}

interface ProfileCardProps {
  profile: Profile;
  variant?: 'default' | 'compact';
}

export function ProfileCard({ profile, variant = 'default' }: ProfileCardProps) {
  const isCompact = variant === 'compact';

  return (
    <div className="glass hover-lift rounded-xl p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        <Avatar className={isCompact ? "w-12 h-12" : "w-16 h-16"}>
          <AvatarImage src={profile.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
            {profile.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <Link 
            to={`/profile/${profile.id}`}
            className="text-white font-semibold text-lg hover:text-purple-300 transition-colors"
          >
            {profile.name}
          </Link>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {profile.bio}
          </p>
          {(profile.location || profile.company) && (
            <p className="text-gray-500 text-xs mt-1">
              {profile.company} • {profile.location}
            </p>
          )}
        </div>

        <Badge 
          variant="secondary" 
          className={`${
            profile.type === 'student' 
              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
              : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
          }`}
        >
          {profile.type}
        </Badge>
      </div>

      {/* Stats */}
      {!isCompact && (
        <div className="flex justify-between text-center mb-4">
          <div>
            <div className="text-white font-semibold">{profile.projects}</div>
            <div className="text-gray-400 text-xs">Projects</div>
          </div>
          <div>
            <div className="text-white font-semibold">{profile.followers}</div>
            <div className="text-gray-400 text-xs">Followers</div>
          </div>
          <div>
            <div className="text-white font-semibold">{profile.following}</div>
            <div className="text-gray-400 text-xs">Following</div>
          </div>
        </div>
      )}

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {profile.skills.slice(0, isCompact ? 3 : 5).map((skill) => (
            <Badge 
              key={skill} 
              variant="outline" 
              className="text-xs bg-gray-800/50 text-gray-300 border-gray-600"
            >
              {skill}
            </Badge>
          ))}
          {profile.skills.length > (isCompact ? 3 : 5) && (
            <Badge 
              variant="outline" 
              className="text-xs bg-gray-800/50 text-gray-400 border-gray-600"
            >
              +{profile.skills.length - (isCompact ? 3 : 5)}
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className={`flex gap-2 ${isCompact ? 'flex-col' : ''}`}>
        <Button 
          size="sm" 
          className="flex-1 gradient-primary hover:opacity-90"
          asChild
        >
          <Link to={`/profile/${profile.id}`}>
            View Profile
          </Link>
        </Button>
        {profile.type === 'student' && (
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
          >
            Follow
          </Button>
        )}
      </div>
    </div>
  );
}
