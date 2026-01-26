import { describe, it, expect, beforeEach } from 'vitest';
import { Student, Teacher, Subject, Class, Grade, User } from './Models';

// ==================== TESTY DLA KLASY STUDENT ====================
describe('Student', () => {
    let student;

    beforeEach(() => {
        student = new Student(1, 'Jan Kowalski', 'jan@example.com', 'Aktywny', [], 0);
    });

    it('should create a student with correct properties', () => {
        expect(student.id).toBe(1);
        expect(student.name).toBe('Jan Kowalski');
        expect(student.email).toBe('jan@example.com');
        expect(student.status).toBe('Aktywny');
        expect(student.grades).toEqual([]);
        expect(student.averageGrade).toBe(0);
    });

    it('should calculate average correctly when grades are added', () => {
        const grade1 = new Grade(1, 1, 1, 5, 'Sprawdzian');
        const grade2 = new Grade(2, 1, 1, 4, 'Kartkówka');

        student.addGrade(grade1);
        student.addGrade(grade2);

        expect(student.grades.length).toBe(2);
        expect(student.averageGrade).toBe(4.5);
    });

    it('should return 0 when calculating average with no grades', () => {
        expect(student.calculateAverage()).toBe(0);
    });

    it('should filter grades by subject', () => {
        const grade1 = new Grade(1, 1, 1, 5, 'Sprawdzian');
        const grade2 = new Grade(2, 1, 2, 4, 'Kartkówka');
        const grade3 = new Grade(3, 1, 1, 3, 'Odpowiedź');

        student.addGrade(grade1);
        student.addGrade(grade2);
        student.addGrade(grade3);

        const subject1Grades = student.getGradesBySubject(1);
        expect(subject1Grades.length).toBe(2);
        expect(subject1Grades[0].value).toBe(5);
        expect(subject1Grades[1].value).toBe(3);
    });

    it('should remove grade correctly', () => {
        const grade1 = new Grade(1, 1, 1, 5, 'Sprawdzian');
        const grade2 = new Grade(2, 1, 1, 4, 'Kartkówka');

        student.addGrade(grade1);
        student.addGrade(grade2);

        student.removeGrade(1);

        expect(student.grades.length).toBe(1);
        expect(student.grades[0].id).toBe(2);
        expect(student.averageGrade).toBe(4);
    });
});

// ==================== TESTY DLA KLASY TEACHER ====================
describe('Teacher', () => {
    let teacher;
    let subject1, subject2;

    beforeEach(() => {
        subject1 = new Subject(1, 'Matematyka', 1);
        subject2 = new Subject(2, 'Fizyka', 1);
        teacher = new Teacher(1, 'Anna Nowak', 'anna@example.com', [subject1], []);
    });

    it('should create a teacher with correct properties', () => {
        expect(teacher.id).toBe(1);
        expect(teacher.name).toBe('Anna Nowak');
        expect(teacher.email).toBe('anna@example.com');
        expect(teacher.subjects.length).toBe(1);
    });

    it('should add subject correctly', () => {
        teacher.addSubject(subject2);
        expect(teacher.subjects.length).toBe(2);
        expect(teacher.getSubjectCount()).toBe(2);
    });

    it('should remove subject correctly', () => {
        teacher.addSubject(subject2);
        teacher.removeSubject(1);
        expect(teacher.subjects.length).toBe(1);
        expect(teacher.subjects[0].id).toBe(2);
    });

    it('should get subject by id', () => {
        const found = teacher.getSubjectById(1);
        expect(found).toBeDefined();
        expect(found.name).toBe('Matematyka');
    });

    it('should return undefined for non-existent subject', () => {
        const found = teacher.getSubjectById(999);
        expect(found).toBeUndefined();
    });
});

// ==================== TESTY DLA KLASY SUBJECT ====================
describe('Subject', () => {
    let subject;

    beforeEach(() => {
        subject = new Subject(1, 'Informatyka', 1, 'Podstawy programowania', 25);
    });

    it('should create a subject with correct properties', () => {
        expect(subject.id).toBe(1);
        expect(subject.name).toBe('Informatyka');
        expect(subject.teacherId).toBe(1);
        expect(subject.description).toBe('Podstawy programowania');
        expect(subject.studentCount).toBe(25);
    });

    it('should update subject info', () => {
        subject.updateInfo('Programowanie', 'Zaawansowane programowanie');
        expect(subject.name).toBe('Programowanie');
        expect(subject.description).toBe('Zaawansowane programowanie');
    });

    it('should update student count', () => {
        subject.updateStudentCount(30);
        expect(subject.studentCount).toBe(30);
    });

    it('should return correct display name', () => {
        expect(subject.getDisplayName()).toBe('Informatyka (25 uczniów)');
    });
});

// ==================== TESTY DLA KLASY CLASS ====================
describe('Class', () => {
    let classObj;
    let student1, student2;

    beforeEach(() => {
        student1 = new Student(1, 'Jan Kowalski', 'jan@example.com', 'Aktywny', [], 4.5);
        student2 = new Student(2, 'Anna Nowak', 'anna@example.com', 'Aktywny', [], 5.0);
        classObj = new Class(1, 'Klasa 7a', [student1]);
    });

    it('should create a class with correct properties', () => {
        expect(classObj.id).toBe(1);
        expect(classObj.name).toBe('Klasa 7a');
        expect(classObj.students.length).toBe(1);
        expect(classObj.studentCount).toBe(1);
    });

    it('should add student correctly', () => {
        classObj.addStudent(student2);
        expect(classObj.students.length).toBe(2);
        expect(classObj.studentCount).toBe(2);
    });

    it('should remove student correctly', () => {
        classObj.addStudent(student2);
        classObj.removeStudent(1);
        expect(classObj.students.length).toBe(1);
        expect(classObj.students[0].id).toBe(2);
    });

    it('should get student by id', () => {
        const found = classObj.getStudentById(1);
        expect(found).toBeDefined();
        expect(found.name).toBe('Jan Kowalski');
    });

    it('should get student by name partial match', () => {
        const found = classObj.getStudentByName('jan');
        expect(found).toBeDefined();
        expect(found.id).toBe(1);
    });

    it('should calculate average grade correctly', () => {
        classObj.addStudent(student2);
        const avg = classObj.getAverageGrade();
        expect(avg).toBe(4.75); // (4.5 + 5.0) / 2
    });

    it('should return 0 for average when no students', () => {
        classObj.removeStudent(1);
        expect(classObj.getAverageGrade()).toBe(0);
    });
});

// ==================== TESTY DLA KLASY GRADE ====================
describe('Grade', () => {
    let grade;

    beforeEach(() => {
        grade = new Grade(1, 1, 1, 5, 'Sprawdzian');
    });

    it('should create a grade with correct properties', () => {
        expect(grade.id).toBe(1);
        expect(grade.studentId).toBe(1);
        expect(grade.subjectId).toBe(1);
        expect(grade.value).toBe(5);
        expect(grade.type).toBe('Sprawdzian');
        expect(grade.date).toBeDefined();
    });

    it('should clamp value between 1 and 6', () => {
        const grade1 = new Grade(1, 1, 1, 7, 'Test');
        const grade2 = new Grade(2, 1, 1, 0, 'Test');

        expect(grade1.value).toBe(6);
        expect(grade2.value).toBe(1);
    });

    it('should validate grade correctly', () => {
        expect(grade.isValid()).toBe(true);
    });

    it('should return correct quality level', () => {
        expect(new Grade(1, 1, 1, 6, 'Test').getQualityLevel()).toBe('Celujący');
        expect(new Grade(1, 1, 1, 5, 'Test').getQualityLevel()).toBe('Bardzo dobry');
        expect(new Grade(1, 1, 1, 4, 'Test').getQualityLevel()).toBe('Dobry');
        expect(new Grade(1, 1, 1, 3, 'Test').getQualityLevel()).toBe('Dostateczny');
        expect(new Grade(1, 1, 1, 2, 'Test').getQualityLevel()).toBe('Niedostateczny');
    });

    it('should return correct grade color', () => {
        expect(new Grade(1, 1, 1, 6, 'Test').getGradeColor()).toBe('#10b981');
        expect(new Grade(1, 1, 1, 4, 'Test').getGradeColor()).toBe('#3b82f6');
        expect(new Grade(1, 1, 1, 3, 'Test').getGradeColor()).toBe('#f59e0b');
        expect(new Grade(1, 1, 1, 2, 'Test').getGradeColor()).toBe('#ef4444');
    });

    it('should update value correctly', () => {
        grade.updateValue(6);
        expect(grade.value).toBe(6);

        grade.updateValue(10); // Should clamp to 6
        expect(grade.value).toBe(6);
    });
});

// ==================== TESTY DLA KLASY USER ====================
describe('User', () => {
    let teacher, student;

    beforeEach(() => {
        teacher = new User(1, 'Jan Kowalski', 'jan@example.com', 'teacher', 'avatar.png');
        student = new User(2, 'Anna Nowak', 'anna@example.com', 'student');
    });

    it('should create a user with correct properties', () => {
        expect(teacher.id).toBe(1);
        expect(teacher.name).toBe('Jan Kowalski');
        expect(teacher.email).toBe('jan@example.com');
        expect(teacher.type).toBe('teacher');
        expect(teacher.avatar).toBe('avatar.png');
    });

    it('should identify teacher correctly', () => {
        expect(teacher.isTeacher()).toBe(true);
        expect(teacher.isStudent()).toBe(false);
    });

    it('should identify student correctly', () => {
        expect(student.isTeacher()).toBe(false);
        expect(student.isStudent()).toBe(true);
    });

    it('should return correct role', () => {
        expect(teacher.getRole()).toBe('Nauczyciel');
        expect(student.getRole()).toBe('Uczeń');
    });

    it('should return display name', () => {
        expect(teacher.getDisplayName()).toBe('Jan Kowalski');
    });

    it('should update profile correctly', () => {
        teacher.updateProfile('Piotr Kowalski', 'piotr@example.com', 'new-avatar.png');
        expect(teacher.name).toBe('Piotr Kowalski');
        expect(teacher.email).toBe('piotr@example.com');
        expect(teacher.avatar).toBe('new-avatar.png');
    });
});
