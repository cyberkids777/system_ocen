// src/components/auth/Login.jsx
import { useState } from 'react';

export default function Login({ onNavigate }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('teacher');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!email || !password) {
            setError('Wypełnij wszystkie pola');
            return;
        }
        if (userType === 'teacher') {
            onNavigate('addSubject');
        } else {
            onNavigate('studentGrades');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f7f7f6] px-4 py-12 dark:bg-[#1d1a15] sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D0BB95] text-white">
                        <span className="material-symbols-outlined text-3xl">school</span>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Zaloguj się
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loguj się jako:</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="teacher"
                                    checked={userType === 'teacher'}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="h-4 w-4 accent-[#D0BB95]"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Nauczyciel</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="student"
                                    checked={userType === 'student'}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="h-4 w-4 accent-[#D0BB95]"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Uczeń</span>
                            </label>
                        </div>
                    </div>
                    <input
                        autoComplete="email"
                        className="block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-[#D0BB95] focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        autoComplete="current-password"
                        className="block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-[#D0BB95] focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                        placeholder="Hasło"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
                    <button
                        onClick={handleSubmit}
                        className="flex w-full justify-center rounded-lg bg-[#D0BB95] px-4 py-3 text-sm font-semibold text-white hover:bg-[#c9ad86] focus:outline-none focus:ring-2 focus:ring-[#D0BB95] focus:ring-offset-2 dark:focus:ring-offset-[#1d1a15]"
                    >
                        Zaloguj się
                    </button>
                </div>
            </div>
        </div>
    );
}