export type UserRole = 'student' | 'recruiter' | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  college?: string;
  company?: string;
  resumeUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  applicationDeadline: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  progress?: number;
  modules: number;
  imageUrl: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  website: string;
  jobOpenings: number;
}