// src/components/teacher/AddSubjectPage.jsx
import { useState } from 'react';
import Header from '../shared/Header';
import TeacherSidebar from '../shared/TeacherSidebar';
import { Subject, createSubjectExamples } from '../../models/Models';

export default function AddSubjectPage({ onNavigate }) {
    const [subjects, setSubjects] = useState(createSubjectExamples());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        if (name.trim()) {
            const newSubject = new Subject(
                Date.now(), // Simple ID generation
                name,
                1, // teacherId
                description,
                0 // initial student count
            );
            setSubjects([...subjects, newSubject]);
            setName('');
            setDescription('');
        }
    };

    const handleDelete = (subjectId) => {
        setSubjects(subjects.filter((s) => s.id !== subjectId));
    };

    return (
        <div className="flex h-screen w-full">
            <TeacherSidebar currentPage="addSubject" onNavigate={onNavigate} />
            <main className="flex-1 overflow-y-auto flex flex-col">
                <Header title="Dodaj Przedmiot" />
                <div className="p-8 flex-1">
                    <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800/50">
                        <div className="mb-8 space-y-4">
                            <div>
                                <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                    Nazwa przedmiotu
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                                    className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="np. Matematyka"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                    Opis (opcjonalnie)
                                </label>
                                <input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="np. Nauka matematyki"
                                />
                            </div>
                            <button
                                onClick={handleAdd}
                                className="w-full bg-[#D0BB95] text-white px-5 py-3 rounded-lg hover:bg-[#c9ad86] font-medium"
                            >
                                Dodaj Przedmiot
                            </button>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                Lista przedmiotów
                            </h3>
                            <ul className="space-y-2">
                                {subjects.map((subject) => (
                                    <li
                                        key={subject.id}
                                        className="flex justify-between items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <span className="text-gray-900 dark:text-white font-medium">{subject.name}</span>
                                            {subject.description && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subject.description}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(subject.id)}
                                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm ml-4"
                                        >
                                            Usuń
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}