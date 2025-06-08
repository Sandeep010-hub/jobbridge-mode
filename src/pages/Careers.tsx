import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Users, Code, Briefcase } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const jobs = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    salary: "$150k - $200k",
    description: "Join our core engineering team to build the next-generation AI-powered recruitment platform.",
    requirements: ["5+ years React/Node.js experience", "Experience with AI/ML integrations", "Strong system design skills"],
    benefits: ["Equity package", "Health insurance", "Unlimited PTO", "Learning budget"]
  },
  {
    title: "AI/ML Engineer",
    department: "AI Research",
    location: "Remote",
    type: "Full-time",
    salary: "$160k - $220k",
    description: "Lead our AI initiatives in talent matching and project analysis algorithms.",
    requirements: ["PhD or Masters in ML/AI", "3+ years production ML experience", "Python, TensorFlow/PyTorch"],
    benefits: ["Top-tier compensation", "Research budget", "Conference attendance", "Flexible hours"]
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "New York, NY / Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    description: "Shape the user experience of how developers showcase their work and companies discover talent.",
    requirements: ["5+ years UX/UI design", "Experience with design systems", "Figma proficiency"],
    benefits: ["Design tool subscriptions", "Home office setup", "Creative freedom", "Impact-driven work"]
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    salary: "$140k - $180k",
    description: "Build and maintain the infrastructure that powers millions of project showcases.",
    requirements: ["AWS/GCP experience", "Kubernetes", "CI/CD pipelines", "Monitoring systems"],
    benefits: ["Infrastructure budget", "On-call compensation", "Latest hardware", "Growth opportunities"]
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Austin, TX / Remote",
    type: "Full-time",
    salary: "$100k - $140k",
    description: "Drive user acquisition and engagement across our developer and recruiter communities.",
    requirements: ["3+ years growth marketing", "Data-driven approach", "B2B SaaS experience"],
    benefits: ["Marketing budget", "Performance bonuses", "Team events", "Career development"]
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $120k",
    description: "Help our enterprise customers maximize their success on the JobBridge platform.",
    requirements: ["2+ years customer success", "Tech industry experience", "Strong communication"],
    benefits: ["Customer impact", "Travel opportunities", "Commission structure", "Training programs"]
  }
];

const perks = [
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Top-market salaries plus meaningful equity in a fast-growing company"
  },
  {
    icon: Users,
    title: "Amazing Team",
    description: "Work with passionate, talented people from top tech companies"
  },
  {
    icon: Code,
    title: "Cutting-Edge Tech",
    description: "Build with the latest technologies and shape the future of AI-powered recruitment"
  },
  {
    icon: Briefcase,
    title: "Growth Opportunities",
    description: "Rapid career advancement in a high-growth startup environment"
  }
];

export default function Careers() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 pt-32">
        <div className="absolute inset-0 animated-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 border-purple-500/30 text-purple-300">
            Join Our Team
          </Badge>
          <h1 className="text-5xl md:text-6xl font-space font-bold text-white mb-6">
            Build the Future of
            <span className="gradient-text"> Tech Recruitment</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Join a passionate team of builders, designers, and innovators creating the platform 
            that will transform how talent meets opportunity in the tech industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gradient-primary hover:opacity-90" size="lg">
              View Open Positions
            </Button>
            <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10" size="lg">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space font-bold text-white mb-4">Why Join JobBridge?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We offer more than just a job - we offer the opportunity to shape the future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <Card key={index} className="glass border-white/10 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                    <perk.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{perk.title}</h3>
                  <p className="text-gray-400">{perk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space font-bold text-white mb-4">Open Positions</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find your next career opportunity with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.map((job, index) => (
              <Card key={index} className="glass border-white/10 hover-lift">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-white text-xl">{job.title}</CardTitle>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                      {job.department}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">
                    {job.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">Requirements:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, i) => (
                        <Badge key={i} variant="secondary" className="bg-blue-500/10 text-blue-300">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full gradient-primary hover:opacity-90">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-space font-bold text-white mb-6">
            Don't See Your Role?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We're always looking for exceptional talent. Send us your information and we'll reach out when the right opportunity arises.
          </p>
          <Button className="gradient-primary hover:opacity-90" size="lg">
            Send Us Your Resume
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
