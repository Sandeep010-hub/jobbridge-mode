
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Filter, Users, Target, Clock, TrendingUp } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const features = [
  {
    icon: Search,
    title: "Advanced Search",
    description: "Find candidates by skills, projects, experience level, and location with powerful filters.",
    benefits: ["Multi-criteria search", "Skill-based filtering", "Location targeting", "Experience levels"]
  },
  {
    icon: Target,
    title: "AI-Powered Matching",
    description: "Our AI analyzes project quality and matches you with the most relevant candidates.",
    benefits: ["Smart recommendations", "Quality scoring", "Skill assessment", "Cultural fit analysis"]
  },
  {
    icon: Users,
    title: "Direct Engagement",
    description: "Connect directly with candidates through our platform without intermediaries.",
    benefits: ["Direct messaging", "Profile bookmarking", "Interview scheduling", "Collaboration tools"]
  },
  {
    icon: TrendingUp,
    title: "Hiring Analytics",
    description: "Track your recruitment metrics and optimize your hiring process with detailed insights.",
    benefits: ["Recruitment metrics", "Response rates", "Source tracking", "ROI analysis"]
  }
];

const stats = [
  { value: "500+", label: "Partner Companies" },
  { value: "10K+", label: "Active Candidates" },
  { value: "95%", label: "Match Accuracy" },
  { value: "48hrs", label: "Avg. Response Time" }
];

export default function ForRecruiters() {
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
              <Badge variant="outline" className="mb-6 border-purple-500/30 text-purple-300">
                For Recruiters
              </Badge>
              <h1 className="text-5xl md:text-6xl font-space font-bold text-white mb-6">
                Discover
                <span className="gradient-text"> Real Talent</span>
                <br />
                Through
                <span className="gradient-text"> Real Work</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Skip the resume screening. Evaluate candidates based on their actual projects and code quality. 
                Find developers who can truly deliver.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="gradient-primary hover:opacity-90" asChild>
                  <Link to="/register">
                    Start Hiring
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/explore">
                    Browse Talent
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
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Top Candidates</h3>
                    <Filter className="w-5 h-5 text-gray-400" />
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/20 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-white/10 rounded w-24"></div>
                      </div>
                      <div className="text-green-400 text-sm">95% match</div>
                    </div>
                  ))}
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
              Powerful Tools for Modern Recruiting
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to find and hire the best technical talent
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
                        <div className="w-2 h-2 rounded-full bg-purple-400 mr-3"></div>
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space font-bold text-white mb-4">
              Trusted by Leading Companies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "We hired 5 amazing developers through JobBridge. Their project portfolios told us everything we needed to know.",
                name: "Jennifer Walsh",
                role: "VP of Engineering",
                company: "TechFlow"
              },
              {
                quote: "The quality of candidates is exceptional. We can see their actual work before even scheduling an interview.",
                name: "Michael Brown",
                role: "Head of Talent",
                company: "InnovateCorp"
              },
              {
                quote: "JobBridge has revolutionized our hiring process. We find better candidates faster than ever before.",
                name: "Lisa Zhang",
                role: "CTO",
                company: "StartupXYZ"
              }
            ].map((story, index) => (
              <Card key={index} className="glass-dark border-white/10">
                <CardContent className="p-6">
                  <p className="text-gray-300 mb-4 italic">"{story.quote}"</p>
                  <div>
                    <div className="text-white font-medium">{story.name}</div>
                    <div className="text-purple-400 text-sm">{story.role}</div>
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
