// ==================== KLASA STUDENT ====================
export class Student {
    constructor(id, name, email, status = 'Aktywny', grades = [], averageGrade = 0) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.status = status;
        this.grades = grades;
        this.averageGrade = averageGrade;
    }

    calculateAverage() {
        if (this.grades.length === 0) return 0;
        const sum = this.grades.reduce((acc, grade) => acc + grade.value, 0);
        return sum / this.grades.length;
    }

    addGrade(grade) {
        this.grades.push(grade);
        this.averageGrade = this.calculateAverage();
    }

    getGradesBySubject(subjectId) {
        return this.grades.filter(g => g.subjectId === subjectId);
    }

    removeGrade(gradeId) {
        this.grades = this.grades.filter(g => g.id !== gradeId);
        this.averageGrade = this.calculateAverage();
    }
}

export class Teacher {
    constructor(id, name, email, subjects = [], classes = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subjects = subjects;
        this.classes = classes;
    }

    addSubject(subject) {
        this.subjects.push(subject);
    }

    removeSubject(subjectId) {
        this.subjects = this.subjects.filter(s => s.id !== subjectId);
    }

    getSubjectById(subjectId) {
        return this.subjects.find(s => s.id === subjectId);
    }

    getStudentsFromClass(classId) {
        const classData = this.classes.find(c => c.id === classId);
        return classData?.students || [];
    }

    getSubjectCount() {
        return this.subjects.length;
    }
}

export class Subject {
    constructor(id, name, teacherId, description = '', studentCount = 0) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.teacherId = teacherId;
        this.studentCount = studentCount;
    }

    updateInfo(name, description) {
        this.name = name;
        this.description = description;
    }

    updateStudentCount(count) {
        this.studentCount = count;
    }

    getDisplayName() {
        return `${this.name} (${this.studentCount} uczniów)`;
    }
}

export class Class {
    constructor(id, name, students = []) {
        this.id = id;
        this.name = name;
        this.students = students;
        this.studentCount = students.length;
    }

    addStudent(student) {
        this.students.push(student);
        this.studentCount = this.students.length;
    }

    removeStudent(studentId) {
        this.students = this.students.filter(s => s.id !== studentId);
        this.studentCount = this.students.length;
    }

    getStudentById(studentId) {
        return this.students.find(s => s.id === studentId);
    }

    getStudentByName(name) {
        return this.students.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
    }

    getAverageGrade() {
        if (this.students.length === 0) return 0;
        const sum = this.students.reduce((acc, student) => acc + student.averageGrade, 0);
        return sum / this.students.length;
    }

    getStudentCount() {
        return this.students.length;
    }
}

export class Grade {
    constructor(id, studentId, subjectId, value, type, date = new Date().toISOString()) {
        this.id = id;
        this.studentId = studentId;
        this.subjectId = subjectId;
        this.value = Math.max(1, Math.min(6, value));
        this.type = type;
        this.date = date;
    }

    isValid() {
        return this.value >= 1 && this.value <= 6;
    }

    getQualityLevel() {
        switch (this.value) {
            case 6:
                return 'Celujący';
            case 5:
                return 'Bardzo dobry';
            case 4:
                return 'Dobry';
            case 3:
                return 'Dostateczny';
            case 2:
                return 'Niedostateczny';
            default:
                return 'Brak';
        }
    }

    getGradeColor() {
        if (this.value >= 5) return '#10b981'; // green
        if (this.value >= 4) return '#3b82f6'; // blue
        if (this.value >= 3) return '#f59e0b'; // yellow
        return '#ef4444'; // red
    }

    updateValue(newValue) {
        this.value = Math.max(1, Math.min(6, newValue));
    }
}


export class User {
    constructor(id, name, email, type, avatar = '') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = type;
        this.avatar = avatar;
    }

    isTeacher() {
        return this.type === 'teacher';
    }

    isStudent() {
        return this.type === 'student';
    }

    getDisplayName() {
        return this.name;
    }

    getRole() {
        return this.type === 'teacher' ? 'Nauczyciel' : 'Uczeń';
    }

    updateProfile(name, email, avatar) {
        this.name = name;
        this.email = email;
        this.avatar = avatar;
    }
}


export const createStudentExamples = () => [
    new Student(1, 'Adam Nowak', 'adam@example.com', 'Aktywny', [], 4.30),
    new Student(2, 'Ewa Kowalska', 'ewa@example.com', 'Aktywny', [], 5.40),
    new Student(3, 'Piotr Wiśniewski', 'piotr@example.com', 'Aktywny', [], 3.10),
    new Student(4, 'Anna Dąbrowska', 'anna@example.com', 'Aktywny', [], 4.00),
    new Student(5, 'Krzysztof Zieliński', 'krzysztof@example.com', 'Nieobecny', [], 2.20),
];

export const createSubjectExamples = () => [
    new Subject(1, 'Matematyka', 1, 'Nauka matematyki', 30),
    new Subject(2, 'Fizyka', 1, 'Nauka fizyki', 28),
    new Subject(3, 'Informatyka', 1, 'Nauka informatyki', 25),
    new Subject(4, 'Historia', 1, 'Nauka historii', 32),
    new Subject(5, 'Polski', 1, 'Nauka języka polskiego', 31),
];
