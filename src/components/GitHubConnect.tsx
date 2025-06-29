import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { githubAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Github, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface GitHubConnectProps {
  onProjectsSync?: () => void;
}

export function GitHubConnect({ onProjectsSync }: GitHubConnectProps) {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleGitHubConnect = () => {
    setIsConnecting(true);
    
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/github/callback`;
    const scope = 'repo,user:email';
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    // Open GitHub OAuth in a popup
    const popup = window.open(githubAuthUrl, 'github-oauth', 'width=600,height=700');
    
    // Listen for the OAuth callback
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'GITHUB_OAUTH_SUCCESS') {
        const { code } = event.data;
        
        try {
          const response = await githubAPI.connectGitHub(code);
          updateUser(response.data.user);
          
          toast({
            title: "GitHub Connected!",
            description: "Your GitHub account has been successfully connected.",
          });
          
          // Auto-sync projects
          handleSyncProjects();
        } catch (error: any) {
          toast({
            title: "Connection Failed",
            description: error.response?.data?.message || "Failed to connect GitHub account",
            variant: "destructive",
          });
        } finally {
          setIsConnecting(false);
          popup?.close();
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Clean up listener when popup closes
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', handleMessage);
        setIsConnecting(false);
      }
    }, 1000);
  };

  const handleSyncProjects = async () => {
    if (!user?.githubUsername) {
      toast({
        title: "GitHub Not Connected",
        description: "Please connect your GitHub account first.",
        variant: "destructive",
      });
      return;
    }

    setIsSyncing(true);
    
    try {
      const response = await githubAPI.syncProjects();
      
      toast({
        title: "Projects Synced!",
        description: `Successfully synced ${response.data.count} projects from GitHub.`,
      });
      
      onProjectsSync?.();
    } catch (error: any) {
      toast({
        title: "Sync Failed",
        description: error.response?.data?.message || "Failed to sync projects",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const isConnected = !!user?.githubUsername;

  return (
    <Card className="glass-dark border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Github className="w-5 h-5 mr-2" />
          GitHub Integration
        </CardTitle>
        <CardDescription className="text-gray-400">
          {isConnected 
            ? "Automatically sync your repositories and showcase your work"
            : "Connect your GitHub account to automatically import and showcase your projects"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-medium">Connected to GitHub</p>
                  <p className="text-gray-400 text-sm">@{user.githubUsername}</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                Connected
              </Badge>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleSyncProjects}
                disabled={isSyncing}
                className="flex-1 gradient-primary hover:opacity-90"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Projects
                  </>
                )}
              </Button>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>✅ Auto-sync enabled</p>
              <p>✅ AI summaries & tags</p>
              <p>✅ Real-time updates</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white font-medium">GitHub Not Connected</p>
                <p className="text-gray-400 text-sm">Connect to auto-import your repositories</p>
              </div>
            </div>
            
            <Button
              onClick={handleGitHubConnect}
              disabled={isConnecting}
              className="w-full gradient-primary hover:opacity-90"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Github className="w-4 h-4 mr-2" />
                  Connect GitHub Account
                </>
              )}
            </Button>
            
            <div className="text-sm text-gray-400">
              <p>🔒 Secure OAuth connection</p>
              <p>📦 Auto-import repositories</p>
              <p>🤖 AI-powered project analysis</p>
              <p>🔄 Real-time synchronization</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}