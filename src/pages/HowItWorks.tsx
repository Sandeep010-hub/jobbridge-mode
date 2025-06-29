
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus, Upload, Sparkles, Share, Eye } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your free account as a student or recruiter in just 2 minutes.",
    details: "Choose your account type and get started immediately with our streamlined onboarding process."
  },
  {
    icon: Upload,
    title: "Upload Projects",
    description: "Add your best work with screenshots, code links, and detailed descriptions.",
    details: "Showcase your projects with GitHub integration, live demos, and comprehensive documentation."
  },
  {
    icon: Sparkles,
    title: "AI Enhancement",
    description: "Our AI generates professional summaries and suggests relevant tags.",
    details: "Leverage AI to highlight your technical skills and make your projects more discoverable."
  },
  {
    icon: Share,
    title: "Share Portfolio",
    description: "Get a beautiful, shareable profile URL to include in applications.",
    details: "Your portfolio is optimized for recruiters with clean layouts and easy navigation."
  },
  {
    icon: Eye,
    title: "Get Discovered",
    description: "Recruiters find you through our advanced search and matching system.",
    details: "Be discovered by top companies looking for talent that matches your exact skills."
  }
];

export default function HowItWorks() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 pt-32">
        <div className="absolute inset-0 animated-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 border-purple-500/30 text-purple-300">
            How It Works
          </Badge>
          <h1 className="text-5xl md:text-6xl font-space font-bold text-white mb-6">
            From Projects to
            <span className="gradient-text"> Career Success</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Follow these simple steps to showcase your work and connect with opportunities
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mr-4">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-3xl font-space font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-xl text-gray-300 mb-4">
                    {step.description}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    {step.details}
                  </p>
                </div>
                
                <div className="flex-1">
                  <Card className="glass-dark border-white/10 p-8">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                        <step.icon className="w-16 h-16 text-purple-300" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of developers who have transformed their careers with JobBridge
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary hover:opacity-90 text-lg px-8 py-4" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4" asChild>
              <Link to="/explore">
                See Examples
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
