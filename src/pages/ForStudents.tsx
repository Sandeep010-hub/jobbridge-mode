
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Sparkles, Share, TrendingUp, Users, Target } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const features = [
  {
    icon: Upload,
    title: "Project Portfolio",
    description: "Upload your best projects with GitHub integration, live demos, and detailed documentation.",
    benefits: ["GitHub repository sync", "Live demo embedding", "Image galleries", "Tech stack tagging"]
  },
  {
    icon: Sparkles,
    title: "AI-Powered Summaries",
    description: "Generate professional project descriptions and skill highlights automatically.",
    benefits: ["Auto-generated summaries", "Skill extraction", "Tag suggestions", "SEO optimization"]
  },
  {
    icon: Share,
    title: "Shareable Profiles",
    description: "Get a beautiful, public profile URL to share with potential employers.",
    benefits: ["Custom profile URLs", "Mobile-optimized", "Social sharing", "PDF export"]
  },
  {
    icon: TrendingUp,
    title: "Career Analytics",
    description: "Track profile views, project engagement, and recruiter interest.",
    benefits: ["View analytics", "Engagement metrics", "Recruiter insights", "Trend analysis"]
  }
];

const stats = [
  { value: "10K+", label: "Students Registered" },
  { value: "25K+", label: "Projects Showcased" },
  { value: "500+", label: "Companies Hiring" },
  { value: "95%", label: "Success Rate" }
];

export default function ForStudents() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 pt-32">
        <div className="absolute inset-0 animated-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-6 border-blue-500/30 text-blue-300">
                For Students
              </Badge>
              <h1 className="text-5xl md:text-6xl font-space font-bold text-white mb-6">
                Showcase Your
                <span className="gradient-text"> Skills</span>
                <br />
                Land Your
                <span className="gradient-text"> Dream Job</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Transform your coding projects into a professional portfolio that gets noticed by top employers. 
                No more sending resumes into the void.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="gradient-primary hover:opacity-90" asChild>
                  <Link to="/register">
                    Build My Portfolio
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/explore">
                    See Examples
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-dark rounded-2xl p-8 border border-white/10">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded-full w-1/2"></div>
                  <div className="h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-purple-500/30 rounded-full px-3 flex items-center text-purple-300 text-sm">React</div>
                    <div className="h-8 bg-blue-500/30 rounded-full px-3 flex items-center text-blue-300 text-sm">Node.js</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space font-bold text-white mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional tools designed specifically for student developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-dark border-white/10 hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space font-bold text-white mb-4">
              Student Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "JobBridge helped me land my first internship at Google. My portfolio spoke louder than my resume ever could.",
                name: "Alex Chen",
                role: "Software Engineering Intern",
                company: "Google"
              },
              {
                quote: "I got 3 job offers within a week of publishing my portfolio. The AI summaries made my projects sound so professional.",
                name: "Sarah Rodriguez",
                role: "Frontend Developer",
                company: "Stripe"
              },
              {
                quote: "Recruiters started reaching out to me directly. It's amazing how much difference a good portfolio makes.",
                name: "David Kim",
                role: "Full-Stack Developer",
                company: "Airbnb"
              }
            ].map((story, index) => (
              <Card key={index} className="glass-dark border-white/10">
                <CardContent className="p-6">
                  <p className="text-gray-300 mb-4 italic">"{story.quote}"</p>
                  <div>
                    <div className="text-white font-medium">{story.name}</div>
                    <div className="text-blue-400 text-sm">{story.role}</div>
                    <div className="text-gray-400 text-sm">{story.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
