import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function GitHubCallback() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (code) {
      // Send the code to the parent window
      window.opener?.postMessage({
        type: 'GITHUB_OAUTH_SUCCESS',
        code
      }, window.location.origin);
    } else if (error) {
      // Send error to parent window
      window.opener?.postMessage({
        type: 'GITHUB_OAUTH_ERROR',
        error
      }, window.location.origin);
    }

    // Close the popup
    window.close();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white">Connecting your GitHub account...</p>
      </div>
    </div>
  );
}