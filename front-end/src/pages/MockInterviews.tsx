import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, CheckCircle, Star, PlayCircle, BookOpen, Award } from 'lucide-react';

const MockInterviews: React.FC = () => {
  const [selectedType, setSelectedType] = useState('technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');

  const interviewTypes = [
    {
      id: 'technical',
      name: 'Technical Interview',
      description: 'Coding challenges, system design, and technical problem-solving',
      icon: '💻',
      duration: '60 min',
      questions: 45
    },
    {
      id: 'behavioral',
      name: 'Behavioral Interview',
      description: 'Situational questions, teamwork, and cultural fit assessment',
      icon: '🤝',
      duration: '45 min',
      questions: 25
    },
    {
      id: 'case-study',
      name: 'Case Study',
      description: 'Business problems, analytical thinking, and strategic decision-making',
      icon: '📊',
      duration: '75 min',
      questions: 15
    },
    {
      id: 'presentation',
      name: 'Presentation Skills',
      description: 'Public speaking, communication, and presentation delivery',
      icon: '🎤',
      duration: '30 min',
      questions: 10
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      type: 'Technical Interview - Frontend',
      interviewer: 'Sarah Johnson',
      interviewerRole: 'Senior Engineer at Google',
      date: 'Today',
      time: '2:00 PM',
      duration: '60 min',
      status: 'confirmed',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      type: 'Behavioral Interview',
      interviewer: 'Michael Chen',
      interviewerRole: 'HR Director at Microsoft',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: '45 min',
      status: 'pending',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      type: 'System Design',
      interviewer: 'Emily Rodriguez',
      interviewerRole: 'Principal Architect at Amazon',
      date: 'Dec 30',
      time: '3:00 PM',
      duration: '75 min',
      status: 'confirmed',
      avatar: '👩‍💻'
    }
  ];

  const pastSessions = [
    {
      id: 1,
      type: 'Technical Interview',
      date: 'Dec 15, 2024',
      score: 8.5,
      feedback: 'Great problem-solving skills, needs improvement in optimization',
      interviewer: 'David Park',
      strengths: ['Problem Analysis', 'Code Quality', 'Communication'],
      improvements: ['Time Complexity', 'Edge Cases']
    },
    {
      id: 2,
      type: 'Behavioral Interview',
      date: 'Dec 10, 2024',
      score: 9.2,
      feedback: 'Excellent storytelling and leadership examples',
      interviewer: 'Jessica Wong',
      strengths: ['Leadership', 'Communication', 'Cultural Fit'],
      improvements: ['Specific Metrics', 'Technical Details']
    }
  ];

  const availableSlots = [
    { date: 'Dec 26', slots: ['9:00 AM', '2:00 PM', '4:00 PM'] },
    { date: 'Dec 27', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
    { date: 'Dec 28', slots: ['9:00 AM', '11:00 AM', '5:00 PM'] }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 7) return 'text-blue-600';
    if (score >= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mock Interviews & Practice</h1>
          <p className="text-gray-600 text-lg">
            Practice with industry professionals and improve your interview skills
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Interview Types */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Interview Type</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {interviewTypes.map(type => (
                  <div
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{type.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{type.duration}</span>
                          <span>•</span>
                          <span>{type.questions} questions</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Difficulty Level</h2>
              <div className="flex space-x-4">
                {['beginner', 'intermediate', 'advanced'].map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(level)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                      selectedDifficulty === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Slots */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Time Slots</h2>
              <div className="space-y-4">
                {availableSlots.map((day, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">{day.date}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {day.slots.map((slot, slotIndex) => (
                        <button
                          key={slotIndex}
                          className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Book Mock Interview Session
              </button>
            </div>

            {/* Past Sessions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Past Interview Sessions</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-6">
                {pastSessions.map(session => (
                  <div key={session.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{session.type}</h3>
                        <p className="text-gray-600 text-sm">With {session.interviewer} • {session.date}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(session.score)}`}>
                          {session.score}/10
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(session.score / 2)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 italic">"{session.feedback}"</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-700 mb-2">Strengths</h4>
                        <div className="flex flex-wrap gap-1">
                          {session.strengths.map((strength, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-orange-700 mb-2">Areas to Improve</h4>
                        <div className="flex flex-wrap gap-1">
                          {session.improvements.map((improvement, index) => (
                            <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                              {improvement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Detailed Report
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Request Follow-up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                      <span className="text-xs text-gray-500">{session.duration}</span>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{session.type}</h3>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{session.date}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{session.time}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg">{session.avatar}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{session.interviewer}</p>
                        <p className="text-xs text-gray-600">{session.interviewerRole}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1">
                        <Video className="h-3 w-3" />
                        <span>Join</span>
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Practice */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Practice</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                  <PlayCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Start AI Practice Session</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-sm font-medium">Review Common Questions</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Award className="h-5 w-5" />
                  <span className="text-sm font-medium">Interview Tips & Guides</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Sessions Completed</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Score</span>
                  <span className="font-semibold">8.3/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Improvement Rate</span>
                  <span className="font-semibold">+15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate</span>
                  <span className="font-semibold">85%</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Interview Tips</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-gray-600">Practice the STAR method for behavioral questions</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-gray-600">Research the company and role beforehand</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-gray-600">Prepare thoughtful questions to ask the interviewer</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-gray-600">Test your technology before virtual interviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterviews;