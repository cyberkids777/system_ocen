// src/components/student/StudentGradesPage.jsx
import { useState, useMemo } from 'react';
import Header from '../shared/Header';
import StudentSidebar from '../shared/StudentSidebar';
import { createStudentExamples, createSubjectExamples } from '../../models/Models';

export default function StudentGradesPage({ onNavigate }) {
    const [students] = useState(createStudentExamples());
    const [subjects] = useState(createSubjectExamples());
    // Symulacja zalogowanego ucznia (pierwszy z listy)
    const currentUser = students[0];

    const [selectedSubjectName, setSelectedSubjectName] = useState(subjects[0]?.name || '');

    const currentSubject = subjects.find(s => s.name === selectedSubjectName);

    const subjectGrades = useMemo(() => {
        if (!currentSubject || !currentUser) return [];
        return currentUser.getGradesBySubject(currentSubject.id);
    }, [currentUser, currentSubject]);

    const stats = useMemo(() => {
        if (subjectGrades.length === 0) return { avg: 0, count: 0, max: 0, min: 0 };
        const values = subjectGrades.map(g => g.value);
        const sum = values.reduce((a, b) => a + b, 0);
        return {
            avg: sum / values.length,
            count: values.length,
            max: Math.max(...values),
            min: Math.min(...values)
        };
    }, [subjectGrades]);

    const getGradeColor = (grade) => {
        if (grade >= 5) return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
        if (grade >= 4) return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
        if (grade >= 3) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    };

    return (
        <div className="flex h-screen">
            <StudentSidebar currentPage="studentGrades" onNavigate={onNavigate} />
            <main className="flex-1 overflow-y-auto">
                <Header title="Moje Oceny" />
                <div className="p-8">
                    <div className="mx-auto max-w-2xl">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Przedmiot
                        </label>
                        <select
                            value={selectedSubjectName}
                            onChange={(e) => setSelectedSubjectName(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 p-2 mb-8 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        >
                            {subjects.map((s) => (
                                <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                        </select>

                        <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800/50">
                            <div className="mb-8 flex items-end justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedSubjectName}</h2>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">Twoje oceny</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Średnia</p>
                                    <p className="text-4xl font-bold text-[#D0BB95]">{stats.avg.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Oceny</h3>
                                <div className="flex flex-wrap gap-3">
                                    {subjectGrades.length > 0 ? (
                                        subjectGrades.map((grade) => (
                                            <div
                                                key={grade.id}
                                                className={`flex h-16 w-16 items-center justify-center rounded-lg font-bold text-xl ${getGradeColor(
                                                    grade.value
                                                )}`}
                                            >
                                                {grade.value}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">Brak ocen</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Statystyka</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Liczba ocen</p>
                                        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                            {stats.count}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Najwyższa</p>
                                        <p className="mt-1 text-2xl font-bold text-green-600">
                                            {stats.max}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Najniższa</p>
                                        <p className="mt-1 text-2xl font-bold text-red-600">
                                            {stats.min}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}