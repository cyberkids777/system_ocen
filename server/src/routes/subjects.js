const express = require('express');
const router = express.Router();
const {
    getAllSubjects,
    getSubjectById,
    createSubject,
    deleteSubject,
    getSubjectStudents,
    addStudentToSubject,
    removeStudentFromSubject,
    getAvailableStudents
} = require('../controllers/subjectController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getAllSubjects);
router.get('/:id', protect, getSubjectById);
router.post('/', protect, authorize('teacher'), createSubject);
router.delete('/:id', protect, authorize('teacher'), deleteSubject);

// Student enrollment routes
router.get('/:id/students', protect, authorize('teacher'), getSubjectStudents);
router.post('/:id/students', protect, authorize('teacher'), addStudentToSubject);
router.delete('/:id/students/:studentId', protect, authorize('teacher'), removeStudentFromSubject);
router.get('/:id/available-students', protect, authorize('teacher'), getAvailableStudents);

module.exports = router;
