// src/components/shared/TeacherSidebar.jsx
export default function TeacherSidebar({ currentPage, onNavigate }) {
    const items = [
        { id: 'subjects', label: 'Przedmioty', icon: 'book' },
        { id: 'addSubject', label: 'Dodaj przedmiot', icon: 'library_add' },
        { id: 'classesGrades', label: 'Klasy i Uczniowie', icon: 'groups' },
        { id: 'addGrades', label: 'Dodaj oceny', icon: 'add_circle' },
    ];

    return (
        <aside className="w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-[#1d1a15] flex flex-col">
            <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 px-6 shrink-0">
                <span className="material-symbols-outlined text-2xl text-[#D0BB95]">school</span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Panel Nauczyciela</h2>
            </div>
            <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
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
                className="m-4 flex items-center gap-3 rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
                <span className="material-symbols-outlined">logout</span>
                <span>Wyloguj</span>
            </button>
        </aside>
    );
}