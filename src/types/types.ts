// Subject type
export interface Subject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}
export interface Subject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}
export interface Grades {
  id: string;
  value: number;
}
export interface GradesState {
  grades: { [id: string]: Grades };
  loading: boolean;
  error: string | null;
}
// Class type
export interface Class {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
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
}

// Students state type
export interface StudentsState {
  students: { [id: string]: Student };
  totalCount: number;
  loading: boolean;
  error: string | null;
}

// Subjects state type
export interface SubjectsState {
  subjects: { [id: string]: Subject };
  loading: boolean;
  error: string | null;
}

// Classes state type
export interface ClassesState {
  classes: { [id: string]: Class };
  totalCount?: number;
  loading: boolean;
  error: string | null;
}
