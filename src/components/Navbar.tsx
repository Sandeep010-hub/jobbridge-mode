
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Menu, X, Upload, User, Settings, LogOut, TrendingUp } from 'lucide-react';
import { useNavbarScroll } from '@/hooks/useNavbarScroll';

export function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useNavbarScroll();

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'glass-dark border-white/10' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-xl font-space font-bold text-white">JobBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/for-students" className="text-gray-300 hover:text-white transition-colors">
              For Students
            </Link>
            <Link to="/for-recruiters" className="text-gray-300 hover:text-white transition-colors">
              For Recruiters
            </Link>
            <Link to="/explore" className="text-gray-300 hover:text-white transition-colors">
              Explore
            </Link>
            <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link to="/trending" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Trending
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10" asChild>
                  <Link to="/upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="w-8 h-8 cursor-pointer">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glass-dark border-white/10">
                    <DropdownMenuItem asChild>
                      <Link to={`/profile/${user.id}`} className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={user.type === 'student' ? '/student-dashboard' : '/recruiter-dashboard'} className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" className="text-gray-300 hover:text-white" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="gradient-primary hover:opacity-90" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <Link to="/for-students" className="text-gray-300 hover:text-white transition-colors px-4">
                For Students
              </Link>
              <Link to="/for-recruiters" className="text-gray-300 hover:text-white transition-colors px-4">
                For Recruiters
              </Link>
              <Link to="/explore" className="text-gray-300 hover:text-white transition-colors px-4">
                Explore
              </Link>
              <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors px-4">
                How It Works
              </Link>
              <Link to="/trending" className="text-gray-300 hover:text-white transition-colors px-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </Link>
              
              {user ? (
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-white/10">
                  <Link to="/upload" className="text-purple-300 hover:text-purple-200 transition-colors">
                    Upload Project
                  </Link>
                  <Link to={`/profile/${user.id}`} className="text-gray-300 hover:text-white transition-colors">
                    Profile
                  </Link>
                  <Link to={user.type === 'student' ? '/student-dashboard' : '/recruiter-dashboard'} className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <button onClick={logout} className="text-red-400 hover:text-red-300 transition-colors text-left">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-white/10">
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="text-purple-300 hover:text-purple-200 transition-colors">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
