import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import AddSubjectPage from './components/teacher/AddSubjectPage';
import SubjectsPage from './components/teacher/SubjectsPage';
import ClassesGradesPage from './components/teacher/ClassesGradesPage';
import AddGradesPage from './components/teacher/AddGradesPage';
import StudentGradesPage from './components/student/StudentGradesPage';
import StudentSubjectsPage from './components/student/StudentSubjectsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "'Lexend', sans-serif" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Teacher routes */}
          <Route path="/teacher/add-subject" element={<AddSubjectPage />} />
          <Route path="/teacher/subjects" element={<SubjectsPage />} />
          <Route path="/teacher/classes" element={<ClassesGradesPage />} />
          <Route path="/teacher/grades" element={<AddGradesPage />} />

          {/* Student routes */}
          <Route path="/student/grades" element={<StudentGradesPage />} />
          <Route path="/student/subjects" element={<StudentSubjectsPage />} />

          {/* Redirect any unknown route to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}