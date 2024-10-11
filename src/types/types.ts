// Subject type
export type Subject = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
};

// Grade type
export type Grades = {
  id: string;
  value: number;
};

// Class type
export type Class = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

// Student type
export type Student = {
  id: string;
  name: string;
  classIds: string;
  subjectIds: string | string[];
  subjectGrades?: {
    subjectId: string;
    grade: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

// Grades state type
export type GradesState = {
  grades: { [id: string]: Grades };
  loading: boolean;
  error: string | null;
};

// Students state type
export type StudentsState = {
  students: { [id: string]: Student };
  totalCount: number;
  loading: boolean;
  error: string | null;
};

// Subjects state type
export type SubjectsState = {
  subjects: { [id: string]: Subject };
  loading: boolean;
  error: string | null;
};

// Classes state type
export type ClassesState = {
  classes: { [id: string]: Class };
  totalCount?: number;
  loading: boolean;
  error: string | null;
};

// Utility types
export type StudentUtility = {
  name: string;
  grade: number;
  subject: string;
  class: string;
  date: string;
};

// Calendar Event type
export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  category: string;
  color: string;
};

// To-do type
export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

// User type
export type User = {
  id: string;
  email: string;
  name: string;
};

// Authentication form values
export type AuthFormValues = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
};

// Event details
export type EventDetails = {
  title: string;
  category: string;
  start: string;
  end?: string;
  color: string;
};

// Weekly chart data
export type WeeklyChartData = {
  week: string;
  avgGrade: number;
};

// Grade counts
export type GradeCounts = {
  [key: number]: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

// Select option
export type SelectOption = {
  value: string;
  label: string | number;
};

// Page keys
export type PageKey =
  | 'dashboard'
  | 'subjects'
  | 'students'
  | 'calendar'
  | 'settings';

// Filters type
export type Filters = {
  name: string;
  grade: string;
  subject: string;
  class: string;
  date: string;
};