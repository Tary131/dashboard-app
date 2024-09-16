// Subject type
export interface Subject {
  id: string;
  name: string;
  createdAt: string;
}

// Class type
export interface Class {
  id: string;
  name: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  classIds: string[];
  subjectIds: string[];
  subjectGrades?: {
    [subjectId: string]: {
      grade: string;
      description: string;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}

// Students state type
export interface StudentsState {
  students: { [id: string]: Student };
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
  loading: boolean;
  error: string | null;
}
