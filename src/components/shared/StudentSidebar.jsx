// src/components/shared/StudentSidebar.jsx
export default function StudentSidebar({ currentPage, onNavigate }) {
    const items = [
        { id: 'studentGrades', label: 'Moje Oceny', icon: 'grade' },
        { id: 'studentSubjects', label: 'Moje Przedmioty', icon: 'book' },
    ];

    return (
        <aside className="flex w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-[#1d1a15]">
            <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-6 dark:border-gray-700">
                <span className="material-symbols-outlined text-2xl text-[#D0BB95]">school</span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Panel Ucznia</h2>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${currentPage === item.id
                                ? 'bg-[#D0BB95]/10 text-[#D0BB95] dark:bg-[#D0BB95]/20'
                                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`}
                    >
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
            <button
                onClick={() => onNavigate('login')}
                className="flex items-center gap-3 m-4 rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
                <span className="material-symbols-outlined">logout</span>
                <span>Wyloguj</span>
            </button>
        </aside>
    );
}