import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Briefcase, Eye, MessageCircle, TrendingUp, CheckCircle, Clock, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();

  const quickStats = [
    { label: 'Active Job Posts', value: '8', icon: <Briefcase className="h-6 w-6" />, color: 'bg-blue-500' },
    { label: 'Applications Received', value: '142', icon: <Users className="h-6 w-6" />, color: 'bg-green-500' },
    { label: 'Interviews Scheduled', value: '23', icon: <MessageCircle className="h-6 w-6" />, color: 'bg-purple-500' },
    { label: 'Positions Filled', value: '5', icon: <CheckCircle className="h-6 w-6" />, color: 'bg-orange-500' }
  ];

  const activeJobs = [
    { 
      title: 'Senior Frontend Developer', 
      applications: 45, 
      posted: '2 weeks ago',
      status: 'Active',
      department: 'Engineering'
    },
    { 
      title: 'Product Manager', 
      applications: 28, 
      posted: '1 week ago',
      status: 'Active',
      department: 'Product'
    },
    { 
      title: 'UX Designer', 
      applications: 32, 
      posted: '3 days ago',
      status: 'Active',
      department: 'Design'
    }
  ];

  const recentApplications = [
    {
      name: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      university: 'MIT',
      score: 9.2,
      skills: ['React', 'TypeScript', 'Node.js'],
      appliedDate: '2 hours ago'
    },
    {
      name: 'Michael Chen',
      position: 'Product Manager',
      university: 'Stanford',
      score: 8.7,
      skills: ['Product Strategy', 'Data Analysis', 'Leadership'],
      appliedDate: '5 hours ago'
    },
    {
      name: 'Emily Rodriguez',
      position: 'UX Designer',
      university: 'Carnegie Mellon',
      score: 9.0,
      skills: ['Figma', 'User Research', 'Prototyping'],
      appliedDate: '1 day ago'
    }
  ];

  const topCandidates = [
    {
      name: 'Alex Kumar',
      university: 'UC Berkeley',
      major: 'Computer Science',
      gpa: '3.9',
      skills: ['Python', 'Machine Learning', 'AWS'],
      match: '95%'
    },
    {
      name: 'Jessica Wong',
      university: 'Harvard',
      major: 'Business Administration',
      gpa: '3.8',
      skills: ['Strategy', 'Analytics', 'Leadership'],
      match: '92%'
    },
    {
      name: 'David Park',
      university: 'Georgia Tech',
      major: 'Software Engineering',
      gpa: '3.7',
      skills: ['React', 'Node.js', 'GraphQL'],
      match: '88%'
    }
  ];

  const upcomingInterviews = [
    { candidate: 'Sarah Johnson', position: 'Frontend Developer', time: 'Today, 2:00 PM', type: 'Technical' },
    { candidate: 'Michael Chen', position: 'Product Manager', time: 'Tomorrow, 10:00 AM', type: 'Final Round' },
    { candidate: 'Emily Rodriguez', position: 'UX Designer', time: 'Dec 28, 3:00 PM', type: 'Portfolio Review' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-100';
    if (score >= 8) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600">
                Manage your hiring pipeline and discover top talent.
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
              <Plus className="h-5 w-5" />
              <span>Post New Job</span>
            </button>
          </div>
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
            {/* Active Job Posts */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Active Job Posts</h2>
                <Link to="/job-management" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Manage All
                </Link>
              </div>
              <div className="space-y-4">
                {activeJobs.map((job, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600 text-sm">{job.department} • Posted {job.posted}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{job.applications}</div>
                        <div className="text-sm text-gray-600">applications</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {job.status}
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View Applications
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {application.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{application.name}</h3>
                          <p className="text-sm text-gray-600">{application.university}</p>
                          <p className="text-sm text-gray-600">{application.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(application.score)}`}>
                          Score: {application.score}/10
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{application.appliedDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {application.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Interview
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Interviews</h2>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">{interview.time}</span>
                    </div>
                    <h3 className="font-medium text-gray-900">{interview.candidate}</h3>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {interview.type}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/interviews"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Manage Interviews
              </Link>
            </div>

            {/* Top Candidates */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Top Candidates</h2>
                <Link to="/candidates" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {topCandidates.map((candidate, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.university}</p>
                        <p className="text-sm text-gray-600">{candidate.major} • GPA: {candidate.gpa}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-semibold">{candidate.match}</div>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">Recommended</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {candidate.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Full Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hiring Analytics */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Hiring Analytics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Time to Hire</span>
                  <span className="font-semibold">18 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Application Rate</span>
                  <span className="font-semibold">+24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Interview Success</span>
                  <span className="font-semibold">72%</span>
                </div>
              </div>
              <button className="mt-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;