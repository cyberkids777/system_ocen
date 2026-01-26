// src/components/student/StudentSubjectsPage.jsx
import { useState, useMemo } from 'react';
import Header from '../shared/Header';
import StudentSidebar from '../shared/StudentSidebar';
import { createStudentExamples, createSubjectExamples } from '../../models/Models';

export default function StudentSubjectsPage({ onNavigate }) {
    const [students] = useState(createStudentExamples());
    const [subjects] = useState(createSubjectExamples());
    // Symulacja zalogowanego ucznia
    const currentUser = students[0];

    const subjectsData = useMemo(() => {
        if (!currentUser) return [];
        return subjects.map(subject => {
            const grades = currentUser.getGradesBySubject(subject.id);
            const values = grades.map(g => g.value);
            const avg = values.length > 0
                ? values.reduce((a, b) => a + b, 0) / values.length
                : 0;

            return {
                id: subject.id,
                name: subject.name,
                count: values.length,
                average: avg
            };
        });
    }, [currentUser, subjects]);

    const getAverageColor = (avg) => {
        if (avg >= 5) return 'text-green-600 dark:text-green-400';
        if (avg >= 4) return 'text-blue-600 dark:text-blue-400';
        if (avg >= 3) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <div className="flex h-screen">
            <StudentSidebar currentPage="studentSubjects" onNavigate={onNavigate} />
            <main className="flex-1 overflow-y-auto">
                <Header title="Moje Przedmioty" />
                <div className="p-8">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                            Przedmioty i średnie
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {subjectsData.map((data) => (
                                <div
                                    key={data.id}
                                    className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {data.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Ocen: {data.count}
                                            </p>
                                        </div>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#D0BB95]/10">
                                            <span className="material-symbols-outlined text-[#D0BB95]">
                                                book
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Średnia
                                        </p>
                                        <p
                                            className={`text-3xl font-bold ${getAverageColor(
                                                data.average
                                            )}`}
                                        >
                                            {data.average.toFixed(2)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onNavigate('studentGrades')}
                                        className="mt-4 w-full rounded-lg bg-[#D0BB95]/10 px-3 py-2 text-sm font-medium text-[#D0BB95] hover:bg-[#D0BB95]/20"
                                    >
                                        Szczegóły
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}