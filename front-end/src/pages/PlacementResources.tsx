import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Building,
  Star,
  Filter,
  Calendar,
  ArrowRight,
  Briefcase,
} from "lucide-react";

const PlacementResources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "🚀",
      industry: "Technology",
      rating: 4.9,
      employees: "100k+",
      website: "google.com",
      description:
        "Leading technology company focused on internet-related services and products.",
      jobOpenings: 45,
      locations: ["Mountain View", "New York", "Austin"],
      benefits: [
        "Health Insurance",
        "Stock Options",
        "Free Meals",
        "Remote Work",
      ],
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "💻",
      industry: "Technology",
      rating: 4.8,
      employees: "180k+",
      website: "microsoft.com",
      description:
        "Multinational technology corporation developing software, services, and devices.",
      jobOpenings: 32,
      locations: ["Redmond", "Seattle", "San Francisco"],
      benefits: [
        "Health Insurance",
        "Stock Options",
        "Learning Budget",
        "Flexible Hours",
      ],
    },
    {
      id: 3,
      name: "Netflix",
      logo: "📺",
      industry: "Entertainment",
      rating: 4.7,
      employees: "12k+",
      website: "netflix.com",
      description:
        "Global streaming entertainment service with TV series and films.",
      jobOpenings: 18,
      locations: ["Los Gatos", "Los Angeles", "New York"],
      benefits: [
        "Unlimited PTO",
        "Stock Options",
        "Health Insurance",
        "Parental Leave",
      ],
    },
    {
      id: 4,
      name: "Amazon",
      logo: "📦",
      industry: "E-commerce",
      rating: 4.6,
      employees: "1.5M+",
      website: "amazon.com",
      description:
        "Multinational technology company focusing on e-commerce and cloud computing.",
      jobOpenings: 67,
      locations: ["Seattle", "Austin", "Boston"],
      benefits: [
        "Health Insurance",
        "Stock Options",
        "401k",
        "Career Development",
      ],
    },
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      posted: "2 days ago",
      applicants: 234,
      requirements: ["React", "TypeScript", "5+ years experience"],
      description: "Join our team building next-generation web applications.",
      remote: true,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      location: "Redmond, WA",
      type: "Full-time",
      salary: "$130k - $200k",
      posted: "1 week ago",
      applicants: 156,
      requirements: [
        "Product Strategy",
        "Data Analysis",
        "3+ years experience",
      ],
      description: "Lead product development for Azure cloud services.",
      remote: false,
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Gatos, CA",
      type: "Full-time",
      salary: "$140k - $220k",
      posted: "3 days ago",
      applicants: 189,
      requirements: ["Python", "Machine Learning", "Statistics"],
      description:
        "Analyze user behavior and improve recommendation algorithms.",
      remote: true,
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$110k - $170k",
      posted: "5 days ago",
      applicants: 298,
      requirements: ["Java", "AWS", "Distributed Systems"],
      description: "Build scalable systems for Amazon Web Services.",
      remote: false,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Google Tech Talk: Future of AI",
      date: "2025-01-15",
      time: "2:00 PM PST",
      type: "Virtual",
      company: "Google",
      attendees: 450,
      description:
        "Learn about the latest developments in artificial intelligence.",
    },
    {
      id: 2,
      title: "Microsoft Career Fair",
      date: "2025-01-20",
      time: "10:00 AM PST",
      type: "In-Person",
      company: "Microsoft",
      attendees: 200,
      description: "Meet recruiters and learn about open positions.",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "2025-01-25",
      time: "6:00 PM PST",
      type: "Hybrid",
      company: "Various",
      attendees: 150,
      description: "Watch innovative startups pitch their ideas.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Placement Resources
          </h1>
          <p className="text-gray-600 text-lg">
            Discover top companies, job opportunities, and career events
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              <option value="remote">Remote</option>
              <option value="new-york">New York</option>
              <option value="san-francisco">San Francisco</option>
              <option value="seattle">Seattle</option>
            </select>

            <select
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Salaries</option>
              <option value="0-100k">$0 - $100k</option>
              <option value="100k-150k">$100k - $150k</option>
              <option value="150k+">$150k+</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Companies */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Featured Companies
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Companies
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{company.logo}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {company.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {company.industry}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {company.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {company.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{company.employees} employees</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{company.jobOpenings} open positions</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {company.benefits.slice(0, 3).map((benefit, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Jobs
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Company Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Openings */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Latest Job Openings
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Jobs
                </button>
              </div>

              <div className="space-y-6">
                {jobOpenings.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          {job.remote && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Remote OK
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {job.salary}
                        </div>
                        <div className="text-sm text-gray-600">{job.type}</div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                        >
                          {req}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Posted {job.posted}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{job.applicants} applicants</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                          Save
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {event.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {event.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {event.attendees} attending
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                        <span>Register</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium w-full">
                View All Events
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Placement Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Active Jobs</span>
                  <span className="font-semibold">2,456</span>
                </div>
                <div className="flex justify-between">
                  <span>Companies Hiring</span>
                  <span className="font-semibold">348</span>
                </div>
                <div className="flex justify-between">
                  <span>Students Placed</span>
                  <span className="font-semibold">1,892</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Salary</span>
                  <span className="font-semibold">$125k</span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Search Tips
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    Customize your resume for each application
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    Follow up within 1-2 weeks after applying
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    Practice common interview questions
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    Network with alumni and professionals
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

export default PlacementResources;
