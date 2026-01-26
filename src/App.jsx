import { useState } from 'react';
import Login from './components/auth/Login';
import AddSubjectPage from './components/teacher/AddSubjectPage';
import SubjectsPage from './components/teacher/SubjectsPage';
import ClassesGradesPage from './components/teacher/ClassesGradesPage';
import AddGradesPage from './components/teacher/AddGradesPage';
import StudentGradesPage from './components/student/StudentGradesPage';
import StudentSubjectsPage from './components/student/StudentSubjectsPage';

export default function App() {
  const [page, setPage] = useState('login');

  return (
    <div style={{ fontFamily: "'Lexend', sans-serif" }}>
      {page === 'login' && <Login onNavigate={setPage} />}
      {page === 'addSubject' && <AddSubjectPage onNavigate={setPage} />}
      {page === 'subjects' && <SubjectsPage onNavigate={setPage} />}
      {page === 'classesGrades' && <ClassesGradesPage onNavigate={setPage} />}
      {page === 'addGrades' && <AddGradesPage onNavigate={setPage} />}
      {page === 'studentGrades' && <StudentGradesPage onNavigate={setPage} />}
      {page === 'studentSubjects' && <StudentSubjectsPage onNavigate={setPage} />}
    </div>
  );
}