'use client';

import { useUser } from '@/lib/hooks';
import Link from 'next/link';

export default function Header() {
    const { user } = useUser();

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-700 bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-xl font-bold">DevBoard</Link>
            </div>
            {user && (
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-300">{user.displayName}</span>
                    <img src={user.avatarUrl} alt="User Avatar" className="h-8 w-8 rounded-full" />
                    <a href="/api/auth/logout" className="text-sm text-gray-400 hover:text-white">Logout</a>
                </div>
            )}
        </header>
    );
}