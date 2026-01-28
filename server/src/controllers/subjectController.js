const { Subject, User, Class } = require('../models');

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll({
            include: [
                {
                    model: User,
                    as: 'teacher',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });
        res.json(subjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'teacher',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.json(subject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createSubject = async (req, res) => {
    try {
        const { name, description } = req.body;

        const subject = await Subject.create({
            name,
            description,
            teacher_id: req.user.id
        });

        res.status(201).json(subject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        // Check if user is the teacher of this subject
        if (subject.teacher_id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this subject' });
        }

        await subject.destroy();

        res.json({ message: 'Subject removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get enrolled students for a subject
const getSubjectStudents = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'enrolledStudents',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                    include: [
                        {
                            model: Class,
                            as: 'classes',
                            attributes: ['id', 'name'],
                            through: { attributes: [] }
                        }
                    ]
                }
            ]
        });

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.json(subject.enrolledStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add student to subject
const addStudentToSubject = async (req, res) => {
    try {
        const { studentId } = req.body;
        const subject = await Subject.findByPk(req.params.id);

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const student = await User.findOne({
            where: { id: studentId, type: 'student' }
        });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Add student to subject (creates entry in students_subjects)
        await subject.addEnrolledStudent(student);

        // Update student count
        const count = await subject.countEnrolledStudents();
        await subject.update({ student_count: count });

        res.json({ message: 'Student added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove student from subject
const removeStudentFromSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const student = await User.findOne({
            where: { id: req.params.studentId, type: 'student' }
        });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Remove student from subject
        await subject.removeEnrolledStudent(student);

        // Update student count
        const count = await subject.countEnrolledStudents();
        await subject.update({ student_count: count });

        res.json({ message: 'Student removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get available students (not enrolled in this subject)
const getAvailableStudents = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'enrolledStudents',
                    attributes: ['id']
                }
            ]
        });

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const enrolledIds = subject.enrolledStudents.map(s => s.id);

        const availableStudents = await User.findAll({
            where: {
                type: 'student',
                id: { [require('sequelize').Op.notIn]: enrolledIds.length > 0 ? enrolledIds : [0] }
            },
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: Class,
                    as: 'classes',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        });

        res.json(availableStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllSubjects,
    getSubjectById,
    createSubject,
    deleteSubject,
    getSubjectStudents,
    addStudentToSubject,
    removeStudentFromSubject,
    getAvailableStudents
};
