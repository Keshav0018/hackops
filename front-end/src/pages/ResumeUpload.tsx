import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, TrendingUp, Download, Star } from 'lucide-react';

const ResumeUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Mock analysis results
  const analysisResults = {
    overall_score: 8.5,
    sections: {
      contact_info: { score: 9.5, status: 'excellent' },
      summary: { score: 8.0, status: 'good' },
      experience: { score: 8.5, status: 'good' },
      education: { score: 9.0, status: 'excellent' },
      skills: { score: 7.5, status: 'needs_improvement' },
      formatting: { score: 8.8, status: 'good' }
    },
    strengths: [
      'Clear and professional formatting',
      'Quantified achievements in work experience',
      'Relevant technical skills for target roles',
      'Strong educational background'
    ],
    improvements: [
      'Add more industry-specific keywords',
      'Include soft skills alongside technical skills',
      'Consider adding a projects section',
      'Optimize for ATS (Applicant Tracking Systems)'
    ],
    missing_skills: ['React', 'AWS', 'Docker', 'Agile/Scrum'],
    suggested_improvements: [
      'Expand the summary section with career objectives',
      'Add metrics to demonstrate impact',
      'Include relevant certifications',
      'Consider adding volunteer experience'
    ],
    ats_score: 78,
    keyword_density: {
      'JavaScript': 3,
      'Python': 2,
      'Web Development': 4,
      'Problem Solving': 1
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 7) return 'text-blue-600';
    if (score >= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'needs_improvement': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'good': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'needs_improvement': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Analysis & Feedback</h1>
          <p className="text-gray-600 text-lg">
            Get AI-powered feedback to optimize your resume for better job opportunities
          </p>
        </div>

        {!uploadedFile ? (
          /* Upload Section */
          <div className="bg-white rounded-xl shadow-sm p-8 border">
            <div 
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Your Resume
              </h3>
              <p className="text-gray-600 mb-6">
                Drag and drop your resume here, or click to browse
              </p>
              
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                className="hidden"
                id="resume-upload"
              />
              
              <label
                htmlFor="resume-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium cursor-pointer inline-flex items-center space-x-2 transition-colors"
              >
                <Upload className="h-5 w-5" />
                <span>Choose File</span>
              </label>
              
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h4>
                <p className="text-gray-600 text-sm">
                  Advanced algorithms analyze your resume content and structure
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">ATS Optimization</h4>
                <p className="text-gray-600 text-sm">
                  Ensure your resume passes through Applicant Tracking Systems
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Personalized Tips</h4>
                <p className="text-gray-600 text-sm">
                  Get tailored recommendations for your industry and role
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Section */
          <div className="space-y-8">
            {/* File Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{uploadedFile.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Uploaded just now
                    </p>
                  </div>
                </div>
                
                {isAnalyzing && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                    <span className="text-sm">Analyzing...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h3 className="font-semibold text-gray-900 mb-4">AI Analysis in Progress</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Parsing document structure...</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Analyzing content quality...</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Checking ATS compatibility...</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="text-sm">Generating recommendations...</span>
                    <div className="w-4 h-4 border-2 border-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysisComplete && (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="bg-white rounded-xl shadow-sm p-6 border">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-2xl font-bold mb-4">
                      {analysisResults.overall_score}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Overall Resume Score</h3>
                    <p className="text-gray-600">
                      Your resume scored {analysisResults.overall_score}/10. Great job! Here's how to make it even better.
                    </p>
                  </div>
                </div>

                {/* Section Scores */}
                <div className="bg-white rounded-xl shadow-sm p-6 border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Section Analysis</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(analysisResults.sections).map(([section, data]) => (
                      <div key={section} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(data.status)}
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">
                              {section.replace('_', ' ')}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(data.status)}`}>
                              {data.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className={`text-lg font-semibold ${getScoreColor(data.score)}`}>
                          {data.score}/10
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ATS Score */}
                <div className="bg-white rounded-xl shadow-sm p-6 border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">ATS Compatibility</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">ATS Optimization Score</span>
                    <span className="text-2xl font-bold text-blue-600">{analysisResults.ats_score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${analysisResults.ats_score}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Your resume has a good chance of passing through ATS filters
                  </p>
                </div>

                {/* Strengths and Improvements */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
                    </div>
                    <ul className="space-y-3">
                      {analysisResults.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-gray-600 text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Improvements</h3>
                    </div>
                    <ul className="space-y-3">
                      {analysisResults.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-gray-600 text-sm">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="bg-white rounded-xl shadow-sm p-6 border">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Trending Skills to Add</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    These skills are highly sought after in your field and could strengthen your resume:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.missing_skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
                    <Download className="h-5 w-5" />
                    <span>Download Detailed Report</span>
                  </button>
                  <button 
                    onClick={() => {
                      setUploadedFile(null);
                      setAnalysisComplete(false);
                      setIsAnalyzing(false);
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload New Resume</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;