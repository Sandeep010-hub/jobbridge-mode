
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 border-purple-500/30 text-purple-300">
              Terms of Service
            </Badge>
            <h1 className="text-5xl font-space font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300">
              Last updated: December 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  By accessing and using JobBridge, you accept and agree to be bound by the terms 
                  and provision of this agreement. These terms apply to all users of the platform.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">User Accounts</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  To use certain features of JobBridge, you must create an account. You are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing accurate and complete information</li>
                  <li>Maintaining the security of your account</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us of any unauthorized use</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Content and Projects</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  When you upload projects to JobBridge, you retain ownership of your content but grant us certain rights:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Right to display your projects on our platform</li>
                  <li>Right to use your content for platform improvement</li>
                  <li>Right to create derivative works for analytics</li>
                  <li>Right to share your content with potential employers (with your consent)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Prohibited Uses</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>You may not use JobBridge to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Upload malicious code or content</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Harass or harm other users</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  JobBridge is provided "as is" without warranties of any kind. We shall not be liable 
                  for any direct, indirect, incidental, special, or consequential damages resulting 
                  from your use of the platform.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of 
                  significant changes via email or platform notification. Continued use of JobBridge 
                  constitutes acceptance of the modified terms.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  For questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:legal@jobbridge.dev" className="text-purple-400 hover:text-purple-300">
                    legal@jobbridge.dev
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
