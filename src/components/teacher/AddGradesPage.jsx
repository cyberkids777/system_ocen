// src/components/teacher/AddGradesPage.jsx
import { useState } from 'react';
import Header from '../shared/Header';
import TeacherSidebar from '../shared/TeacherSidebar';
import { createStudentExamples } from '../../models/Models';

export default function AddGradesPage({ onNavigate }) {
    const [selectedClass, setSelectedClass] = useState('Klasa 7a');
    const [selectedSubject, setSelectedSubject] = useState('Matematyka');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);
    const [newGradeValue, setNewGradeValue] = useState('');

    const [students] = useState(createStudentExamples());

    const filteredStudents = students.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openEditModal = (student) => {
        setEditingGrade(student);
        setNewGradeValue('');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingGrade(null);
    };

    const handleSaveGrade = () => {
        // Logic to save grade would go here
        closeModal();
    };

    return (
        <div className="flex h-screen">
            <TeacherSidebar currentPage="addGrades" onNavigate={onNavigate} />
            <main className="flex-1 overflow-y-auto">
                <Header title="Dodaj Oceny" />
                <div className="p-8">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Wybierz przedmiot
                                </label>
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#D0BB95] focus:outline-none focus:ring-[#D0BB95] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                >
                                    <option>Matematyka</option>
                                    <option>Fizyka</option>
                                    <option>Informatyka</option>
                                    <option>Historia</option>
                                    <option>Polski</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Oceny - {selectedClass}, {selectedSubject}
                            </h2>
                            <div className="relative w-full sm:w-auto">
                                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    search
                                </span>
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-[#D0BB95] focus:ring-[#D0BB95] dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-64"
                                    placeholder="Szukaj ucznia..."
                                    type="search"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50">
                            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Uczeń
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Oceny
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Średnia
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Akcje
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900/50">
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                {student.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {student.grades.map(g => g.value).join(', ')}
                                            </td>
                                            <td
                                                className={`whitespace-nowrap px-6 py-4 text-sm font-semibold ${student.averageGrade < 3
                                                    ? 'text-red-500 dark:text-red-400'
                                                    : 'text-gray-900 dark:text-white'
                                                    }`}
                                            >
                                                {student.averageGrade.toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <button
                                                    onClick={() => openEditModal(student)}
                                                    className="text-[#D0BB95] hover:text-[#c9ad86]"
                                                >
                                                    Edytuj
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Edit Grade Modal */}
                {showModal && editingGrade && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edytuj ocenę</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Uczeń: {editingGrade.name}
                            </p>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nowa ocena
                                </label>
                                <input
                                    type="text"
                                    value={newGradeValue}
                                    onChange={(e) => setNewGradeValue(e.target.value)}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-[#D0BB95] focus:ring-[#D0BB95] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Wprowadź nową ocenę"
                                />
                            </div>
                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    onClick={closeModal}
                                    className="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/50 sm:w-auto"
                                >
                                    Usuń
                                </button>
                                <button
                                    onClick={handleSaveGrade}
                                    className="w-full rounded-lg border border-transparent bg-[#D0BB95] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#c9ad86] focus:outline-none focus:ring-2 focus:ring-[#D0BB95] focus:ring-offset-2 dark:focus:ring-offset-[#1d1a15] sm:w-auto"
                                >
                                    Popraw
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}