export interface PageContent {
  id: string;
  content: string; // JSON string containing map of field keys to text
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  category: 'technical' | 'general' | 'management';
  duration: string;
  eligibility: string;
  fee: string;
  description: string;
  careerProspects?: string;
  syllabusHighlights?: string[];
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsEvent {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  message?: string;
  photoUrl?: string;
  createdAt: string;
}

export interface Setting {
  id: string;
  value: string; // JSON string defining setting values
  updatedAt: string;
}

export interface Certificate {
  id: string;
  certificateId: string;
  rollNumber: string;
  studentName: string;
  course: string;
  passingYear: string;
  percentage: string;
  issueDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface Placement {
  id: string;
  company: string;
  package: string;
  studentName: string;
  year: string;
  createdAt: string;
}

export interface ExamSchedule {
  id: string;
  examName: string;
  date: string;
  time: string;
  courseSemester: string;
  createdAt: string;
}

export interface AcademicCalendarEvent {
  id: string;
  event: string;
  startDate: string;
  endDate: string;
  description: string;
  createdAt: string;
}

// Custom error definition
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}
