import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Zap, Heart } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    bio: "Former VP of Engineering at Meta, passionate about democratizing tech talent discovery."
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Ex-Google AI researcher, building the future of intelligent recruitment matching."
  },
  {
    name: "Alex Rivera",
    role: "Head of Product",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Former Product Lead at Stripe, designing user experiences that matter."
  },
  {
    name: "Maya Patel",
    role: "Head of AI",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "PhD in Machine Learning from Stanford, making AI accessible for everyone."
  }
];

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "We believe in building a supportive community where developers can showcase their best work and companies can find exceptional talent."
  },
  {
    icon: Target,
    title: "Skills Over Credentials",
    description: "We focus on what developers can build, not just where they went to school or where they've worked."
  },
  {
    icon: Zap,
    title: "AI-Powered Innovation",
    description: "We leverage cutting-edge AI to make talent discovery more efficient and accurate than ever before."
  },
  {
    icon: Heart,
    title: "Passion for Excellence",
    description: "We're passionate about creating tools that help people achieve their career goals and build amazing products."
  }
];

export default function About() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 pt-32">
        <div className="absolute inset-0 animated-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 border-purple-500/30 text-purple-300">
            About JobBridge
          </Badge>
          <h1 className="text-5xl md:text-6xl font-space font-bold text-white mb-6">
            Bridging the Gap Between
            <span className="gradient-text"> Talent & Opportunity</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            We're building the future of tech recruitment where skills matter more than credentials, 
            and where exceptional developers can showcase their work to companies that value real talent.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-space font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg mb-6">
                Traditional hiring focuses on resumes and interviews, often missing the most important thing: 
                what developers can actually build. We're changing that by creating a platform where 
                projects speak louder than words.
              </p>
              <p className="text-gray-300 text-lg mb-8">
                Every day, talented developers create amazing projects that go unnoticed. Meanwhile, 
                companies struggle to find the right talent. JobBridge solves this by connecting 
                exceptional work with the companies that need it most.
              </p>
              <Button className="gradient-primary hover:opacity-90" asChild>
                <Link to="/register">
                  Join Our Mission
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">50K+</div>
                  <div className="text-gray-400">Projects Showcased</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">10K+</div>
                  <div className="text-gray-400">Active Developers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-gray-400">Partner Companies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">95%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass border-white/10 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Passionate builders from top tech companies, united by a vision to transform tech recruitment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="glass border-white/10 hover-lift">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-purple-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
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
