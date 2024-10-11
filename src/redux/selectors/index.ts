import { RootState } from '../store';

// Auth Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;

// Calendar Selectors
export const selectCalendarEvents = (state: RootState) => state.calendar.events;
export const selectCalendarLoading = (state: RootState) =>
  state.calendar.loading;
export const selectCalendarError = (state: RootState) => state.calendar.error;

// Classes Selectors
export const selectClasses = (state: RootState) => state.classes.classes;
export const selectTotalCount = (state: RootState) => state.classes.totalCount;
export const selectClassesLoading = (state: RootState) => state.classes.loading;
export const selectClassesError = (state: RootState) => state.classes.error;

// Grades Selectors
export const selectGrades = (state: RootState) => state.grades.grades;
export const selectGradesLoading = (state: RootState) => state.grades.loading;
export const selectGradesError = (state: RootState) => state.grades.error;

// Students Selectors
export const selectStudents = (state: RootState) => state.students.students;
export const selectStudentsTotalCount = (state: RootState) =>
  state.students.totalCount;
export const selectStudentsLoading = (state: RootState) =>
  state.students.loading;
export const selectStudentsError = (state: RootState) => state.students.error;

// Subjects Selectors
export const selectSubjects = (state: RootState) => state.subjects.subjects;
export const selectSubjectsLoading = (state: RootState) =>
  state.subjects.loading;
export const selectSubjectsError = (state: RootState) => state.subjects.error;

// Todos Selectors
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodosLoading = (state: RootState) => state.todos.loading;
export const selectTodosError = (state: RootState) => state.todos.error;
