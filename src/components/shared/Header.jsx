// src/components/shared/Header.jsx
export default function Header({ title }) {
    return (
        <header className="sticky top-0 z-10 h-16 border-b border-gray-200 bg-white/50 dark:border-gray-700 dark:bg-[#1d1a15]/50 flex items-center justify-between px-8 backdrop-blur-sm">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#D0BB95]"></span>
                </button>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D0BB95] to-[#c9ad86]"></div>
            </div>
        </header>
    );
}