// src/components/teacher/ClassesGradesPage.jsx
import { useState } from 'react';
import Header from '../shared/Header';
import TeacherSidebar from '../shared/TeacherSidebar';
import { createStudentExamples } from '../../models/Models';

export default function ClassesGradesPage({ onNavigate }) {
    const [selectedClass, setSelectedClass] = useState('Klasa 7a');

    const [students] = useState(createStudentExamples());

    return (
        <div className="flex h-screen">
            <TeacherSidebar currentPage="classesGrades" onNavigate={onNavigate} />
            <main className="flex-1 overflow-y-auto">
                <Header title="Klasy i Uczniowie" />
                <div className="p-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Wybierz klasę
                            </label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#D0BB95] focus:outline-none focus:ring-[#D0BB95] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            >
                                <option>Klasa 7a</option>
                                <option>Klasa 8b</option>
                                <option>Klasa 6c</option>
                            </select>
                        </div>

                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                            Uczniowie - {selectedClass}
                        </h2>

                        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Uczeń
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Email
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {students.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                {student.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {student.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${student.status === 'Aktywny'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                                        }`}
                                                >
                                                    {student.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}