import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, TrendingUp, Star, CheckCircle } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Connect Students & Recruiters",
      description: "Bridge the gap between talented students and hiring companies through our advanced matching system."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-green-600" />,
      title: "Comprehensive Training",
      description: "Access industry-relevant training programs, skill development courses, and certification opportunities."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Career Growth",
      description: "AI-powered career guidance, resume optimization, and interview preparation to boost your success rate."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Placed" },
    { number: "500+", label: "Partner Companies" },
    { number: "95%", label: "Success Rate" },
    { number: "200+", label: "Training Programs" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      content: "PlacementHub transformed my career journey. The training programs and AI guidance helped me land my dream job!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "HR Director at Microsoft",
      content: "We've found exceptional talent through PlacementHub. The platform makes recruiting efficient and effective.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist at Amazon",
      content: "The resume feedback and mock interviews were game-changers. Highly recommend to all students!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Gateway to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Dream Careers</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Connect with top companies, access world-class training, and accelerate your career with AI-powered guidance. 
              The future of campus placements starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/login"
                className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Login
              </Link>
            </div>

            {/* Hero Image/Illustration Placeholder */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Students and professionals collaborating"
                className="mx-auto rounded-2xl shadow-2xl max-w-4xl w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PlacementHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-blue-100">
              Join the community that's reshaping career success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our community members who achieved their career goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students and recruiters who are already using PlacementHub to achieve their goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup?role=student"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
            >
              <Users className="h-5 w-5" />
              <span>I'm a Student</span>
            </Link>
            
            <Link
              to="/signup?role=recruiter"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
            >
              <Briefcase className="h-5 w-5" />
              <span>I'm a Recruiter</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-8 w-8 text-blue-400" />
                <span className="font-bold text-xl">PlacementHub</span>
              </div>
              <p className="text-gray-300 mb-4">
                Connecting talent with opportunity. Empowering careers through innovation.
              </p>
              <div className="text-gray-400 text-sm">
                © 2025 PlacementHub. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-300">
                <div><Link to="/about" className="hover:text-white transition-colors">About</Link></div>
                <div><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></div>
                <div><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></div>
                <div><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-300">
                <div><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></div>
                <div><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></div>
                <div><Link to="/support" className="hover:text-white transition-colors">Support</Link></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;