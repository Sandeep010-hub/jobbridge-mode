
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative text-center px-4 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-2xl">J</span>
            </div>
            <span className="text-3xl font-space font-bold text-white">JobBridge</span>
          </Link>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-space font-bold gradient-text mb-4">
            404
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-space font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          Looks like you've ventured into uncharted territory. The page you're looking for 
          doesn't exist or has been moved to a new location.
        </p>

        {/* Error Details */}
        <div className="glass rounded-lg p-4 mb-8 text-left">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">Requested URL:</span> {location.pathname}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="gradient-primary hover:opacity-90" asChild>
            <Link to="/">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10" asChild>
            <Link to="/explore">
              <Search className="mr-2 w-5 h-5" />
              Explore Projects
            </Link>
          </Button>

          <Button size="lg" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 w-5 h-5" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-4">
            Looking for something specific? Try these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/explore" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              Browse Projects
            </Link>
            <Link to="/community" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              Join Community
            </Link>
            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              Sign In
            </Link>
            <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
