import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Upload, MessageCircle, Briefcase, TrendingUp, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const quickStats = [
    { label: 'Applications Sent', value: '12', icon: <Briefcase className="h-6 w-6" />, color: 'bg-blue-500' },
    { label: 'Training Progress', value: '75%', icon: <BookOpen className="h-6 w-6" />, color: 'bg-green-500' },
    { label: 'Interview Invites', value: '3', icon: <Users className="h-6 w-6" />, color: 'bg-purple-500' },
    { label: 'Resume Score', value: '8.5/10', icon: <TrendingUp className="h-6 w-6" />, color: 'bg-orange-500' }
  ];

  const recentApplications = [
    { company: 'Google', position: 'Software Engineer', status: 'Under Review', date: '2 days ago' },
    { company: 'Microsoft', position: 'Frontend Developer', status: 'Interview Scheduled', date: '5 days ago' },
    { company: 'Amazon', position: 'Full Stack Developer', status: 'Applied', date: '1 week ago' }
  ];

  const recommendedJobs = [
    { 
      company: 'Netflix', 
      position: 'React Developer', 
      location: 'Remote', 
      match: '95%',
      salary: '$80k - $120k'
    },
    { 
      company: 'Spotify', 
      position: 'Frontend Engineer', 
      location: 'New York', 
      match: '87%',
      salary: '$90k - $130k'
    },
    { 
      company: 'Airbnb', 
      position: 'UI/UX Developer', 
      location: 'San Francisco', 
      match: '82%',
      salary: '$85k - $125k'
    }
  ];

  const upcomingEvents = [
    { title: 'Mock Interview Session', date: 'Today, 3:00 PM', type: 'interview' },
    { title: 'React Advanced Workshop', date: 'Tomorrow, 10:00 AM', type: 'training' },
    { title: 'Google Tech Talk', date: 'Dec 28, 2:00 PM', type: 'event' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled': return 'bg-green-100 text-green-800';
      case 'Applied': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'interview': return <Users className="h-4 w-4 text-green-600" />;
      case 'training': return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'event': return <MessageCircle className="h-4 w-4 text-purple-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your career progress and opportunities waiting for you.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/resume-upload"
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Upload className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Upload Resume</h3>
                    <p className="text-sm text-gray-600">Get AI feedback</p>
                  </div>
                </Link>

                <Link
                  to="/ai-assistant"
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                >
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Career Assistant</h3>
                    <p className="text-sm text-gray-600">Ask questions</p>
                  </div>
                </Link>

                <Link
                  to="/training"
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200"
                >
                  <div className="bg-green-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Browse Training</h3>
                    <p className="text-sm text-gray-600">Skill development</p>
                  </div>
                </Link>

                <Link
                  to="/placements"
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
                >
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Job Opportunities</h3>
                    <p className="text-sm text-gray-600">Find positions</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                <Link to="/applications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentApplications.map((application, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{application.position}</h3>
                        <p className="text-sm text-gray-600">{application.company} • {application.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
                <Link to="/placements" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  See More
                </Link>
              </div>
              <div className="space-y-4">
                {recommendedJobs.map((job, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.position}</h3>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{job.match} match</div>
                        <div className="text-sm text-gray-600">{job.salary}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">Skills match</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    {getEventIcon(event.type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{event.title}</h3>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/events"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All Events
              </Link>
            </div>

            {/* Progress Card */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Profile Completion</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Skills Assessment</span>
                    <span>70%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              <button className="mt-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
                Complete Profile
              </button>
            </div>

            {/* Tips Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Tip</h2>
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Optimize Your LinkedIn</h3>
                  <p className="text-sm text-gray-600">
                    Add relevant keywords to your profile to increase visibility by 40%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;