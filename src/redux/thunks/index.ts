import { fetchGrades } from '../grades/thunks/gradesThunks.ts';
import {
  fetchStudents,
  fetchStudentById,
  addStudent,
  updateStudentWithGrades,
  deleteStudent,
} from '../students/thunks/studentsThunks.ts';
import { fetchClasses, addClass } from '../classes/thunks/classesThunks.ts';
import {
  fetchSubjects,
  addSubject,
} from '../subjects/thunks/subjectsThunks.ts';
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
} from '../todos/thunks/todoThunks.ts';
import {
  fetchCalendarEvents,
  addCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
} from '../calendar/thunks/calendarThunks.ts';
import {
  loginUser,
  updateUser,
  logoutUser,
  registerUser,
} from '../auth/thunks/authThunks.ts';

export const thunks = {
  addClass,
  fetchClasses,
  fetchGrades,
  fetchStudents,
  fetchStudentById,
  addStudent,
  updateStudentWithGrades,
  deleteStudent,
  fetchSubjects,
  addSubject,
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
  fetchCalendarEvents,
  addCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
  loginUser,
  updateUser,
  logoutUser,
  registerUser,
};
