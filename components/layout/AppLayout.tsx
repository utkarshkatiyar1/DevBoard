'use client';

import { Sun, Moon, LayoutDashboard, User, Settings, LogOut, Code } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/lib/hooks'; // Assuming your hook is here

const NavItem = ({ href, icon: Icon, children }: any) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href} className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'}`}>
            <Icon className="h-4 w-4" />
            {children}
        </Link>
    );
};

const ThemeSwitcher = () => {
    const { setTheme, theme } = useTheme();
    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-800"
        >
            <Sun className="h-5 w-5 scale-100 dark:scale-0 transition-all text-gray-900" />
            <Moon className="h-5 w-5 absolute scale-0 dark:scale-100 transition-all text-gray-50" />
        </button>
    );
};


export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <div className="hidden border-r bg-gray-100/40 dark:bg-gray-900/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Code className="h-6 w-6 text-indigo-500" />
                            <span className="">DevBoard</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <NavItem href="/dashboard" icon={LayoutDashboard}>Dashboard</NavItem>
                            <NavItem href="/settings" icon={Settings}>Settings</NavItem>
                            {user && <NavItem href={`/${user.username}`} icon={User}>Public Profile</NavItem>}
                        </nav>
                    </div>
                    <div className="mt-auto p-4 flex items-center justify-between">
                        <a href="/api/auth/logout" className="flex items-center gap-3 text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </a>
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex flex-col bg-gray-50 dark:bg-black">
                <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 dark:bg-gray-900/40 px-4 lg:h-[60px] lg:px-6">
                    {/* Mobile Nav could go here */}
                    <div className="w-full flex-1">
                        {/* Can add a search bar or other header content here */}
                    </div>
                    {user && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{user.displayName}</span>
                            <img src={user.avatarUrl} alt="Avatar" className="h-8 w-8 rounded-full" />
                        </div>
                    )}
                </header>
                <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}