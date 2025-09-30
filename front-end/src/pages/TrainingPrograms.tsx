import React, { useState } from 'react';
import { BookOpen, Clock, Users, Star, Play, Download, CheckCircle } from 'lucide-react';

const TrainingPrograms: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Programs', count: 45 },
    { id: 'programming', name: 'Programming', count: 18 },
    { id: 'design', name: 'Design', count: 8 },
    { id: 'business', name: 'Business', count: 12 },
    { id: 'data-science', name: 'Data Science', count: 7 }
  ];

  const programs = [
    {
      id: 1,
      title: 'Full-Stack Web Development Bootcamp',
      description: 'Master React, Node.js, and modern web development practices with hands-on projects.',
      category: 'programming',
      level: 'Intermediate',
      duration: '12 weeks',
      modules: 24,
      enrolled: 1250,
      rating: 4.8,
      price: 'Free',
      progress: 0,
      imageUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=500',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      instructor: 'Sarah Johnson',
      certificates: true
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn design thinking, prototyping, and user research to create amazing user experiences.',
      category: 'design',
      level: 'Beginner',
      duration: '8 weeks',
      modules: 16,
      enrolled: 892,
      rating: 4.9,
      price: 'Free',
      progress: 35,
      imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      instructor: 'Michael Chen',
      certificates: true
    },
    {
      id: 3,
      title: 'Data Science with Python',
      description: 'Dive deep into data analysis, machine learning, and statistical modeling using Python.',
      category: 'data-science',
      level: 'Advanced',
      duration: '16 weeks',
      modules: 32,
      enrolled: 734,
      rating: 4.7,
      price: 'Premium',
      progress: 0,
      imageUrl: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=500',
      skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'],
      instructor: 'Dr. Emily Rodriguez',
      certificates: true
    },
    {
      id: 4,
      title: 'Digital Marketing Mastery',
      description: 'Learn SEO, social media marketing, and digital advertising strategies for modern businesses.',
      category: 'business',
      level: 'Intermediate',
      duration: '10 weeks',
      modules: 20,
      enrolled: 956,
      rating: 4.6,
      price: 'Free',
      progress: 60,
      imageUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500',
      skills: ['SEO', 'Social Media', 'Google Ads', 'Analytics'],
      instructor: 'Alex Kumar',
      certificates: true
    },
    {
      id: 5,
      title: 'Mobile App Development with React Native',
      description: 'Build cross-platform mobile apps using React Native and modern development tools.',
      category: 'programming',
      level: 'Intermediate',
      duration: '14 weeks',
      modules: 28,
      enrolled: 645,
      rating: 4.8,
      price: 'Premium',
      progress: 0,
      imageUrl: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=500',
      skills: ['React Native', 'JavaScript', 'Firebase', 'App Store'],
      instructor: 'David Park',
      certificates: true
    },
    {
      id: 6,
      title: 'Cloud Computing Fundamentals',
      description: 'Master AWS, Docker, and cloud architecture patterns for scalable applications.',
      category: 'programming',
      level: 'Advanced',
      duration: '12 weeks',
      modules: 24,
      enrolled: 523,
      rating: 4.9,
      price: 'Premium',
      progress: 0,
      imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=500',
      skills: ['AWS', 'Docker', 'Kubernetes', 'DevOps'],
      instructor: 'Jessica Wong',
      certificates: true
    }
  ];

  const filteredPrograms = programs.filter(program => 
    filter === 'all' || program.category === filter
  );

  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.enrolled - a.enrolled;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriceColor = (price: string) => {
    return price === 'Free' ? 'text-green-600' : 'text-blue-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Training Programs</h1>
          <p className="text-gray-600 text-lg">
            Advance your skills with industry-leading courses and certifications
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-6">
            {/* Categories Filter */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-gray-500">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="font-semibold text-gray-900 mb-4">Sort By</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Featured Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="font-bold text-lg mb-2">🚀 New!</h2>
              <p className="text-sm mb-4">
                AI & Machine Learning Specialization now available
              </p>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Explore Now
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {sortedPrograms.length} programs
                {filter !== 'all' && ` in ${categories.find(c => c.id === filter)?.name}`}
              </p>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900">
                  Grid View
                </button>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {sortedPrograms.map(program => (
                <div key={program.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Program Image */}
                  <div className="relative h-48">
                    <img
                      src={program.imageUrl}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    {program.progress > 0 && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {program.progress}% Complete
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                        {program.level}
                      </span>
                    </div>
                  </div>

                  {/* Program Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold ${getPriceColor(program.price)}`}>
                        {program.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{program.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {program.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {program.description}
                    </p>

                    {/* Program Info */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{program.modules} modules</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{program.enrolled.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {program.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {program.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{program.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">By {program.instructor}</span>
                      {program.certificates && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs">Certificate</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {program.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900">{program.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${program.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {program.progress > 0 ? (
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
                          <Play className="h-4 w-4" />
                          <span>Continue Learning</span>
                        </button>
                      ) : (
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          {program.price === 'Free' ? 'Start Learning' : 'Enroll Now'}
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {sortedPrograms.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-medium transition-colors">
                  Load More Programs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPrograms;