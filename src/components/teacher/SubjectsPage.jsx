// src/components/teacher/SubjectsPage.jsx
import { useState } from 'react';
import Header from '../shared/Header';
import TeacherSidebar from '../shared/TeacherSidebar';
import { createSubjectExamples } from '../../models/Models';

export default function SubjectsPage({ onNavigate }) {
    const [subjects] = useState(createSubjectExamples());
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubjects = subjects.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen w-full">
            <TeacherSidebar currentPage="subjects" onNavigate={onNavigate} />
            <main className="flex-1 overflow-y-auto">
                <Header title="Przedmioty" />
                <div className="p-8">
                    <div className="mx-auto max-w-4xl">
                        {/* Nagłówek */}
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Moje przedmioty
                            </h2>
                            <div className="relative w-full sm:w-auto">
                                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    search
                                </span>
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-[#D0BB95] focus:ring-1 focus:ring-[#D0BB95] dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-64"
                                    placeholder="Szukaj przedmiotu..."
                                    type="search"
                                />
                            </div>
                        </div>

                        {/* Grid przedmiotów */}
                        {filteredSubjects.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredSubjects.map((subject) => (
                                    <div
                                        key={subject.id}
                                        className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#D0BB95]/10 flex-shrink-0">
                                                    <span className="material-symbols-outlined text-[#D0BB95]">
                                                        book
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {subject.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {subject.studentCount} uczniów
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                                                <span className="material-symbols-outlined text-xl">close</span>
                                            </button>
                                        </div>

                                        {/* Akcje */}
                                        <div className="mt-4 flex gap-2">
                                            <button className="flex-1 rounded-lg bg-[#D0BB95]/10 px-3 py-2 text-sm font-medium text-[#D0BB95] hover:bg-[#D0BB95]/20 transition-colors">
                                                Edytuj
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-600 dark:bg-gray-800/30">
                                <span className="material-symbols-outlined mx-auto mb-2 block text-3xl text-gray-400">
                                    inbox
                                </span>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Brak przedmiotów spełniających kryteria wyszukiwania
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}