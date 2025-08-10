'use client'; // This is a client component

import Link from 'next/link';

export default function HomePage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  // Use mock auth in development, unless a specific flag is set
  // const useMock = process.env.NODE_ENV === 'development';
  const useMock = false;

  const authUrl = useMock ? `${backendUrl}/api/auth/github/mock` : `${backendUrl}/api/auth/github`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="space-y-6 text-center">
        <h1 className="text-5xl font-bold">Welcome to DevBoard</h1>
        <p className="text-gray-400">Your entire digital developer life, in one place.</p>
        <div>
          <a // Use an <a> tag for external navigation to the backend
            href={authUrl}
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 font-medium text-black shadow-sm hover:bg-gray-200 transition-colors"
          >
            {/* ... SVG icon ... */}
            Sign In with GitHub {useMock && '(Mock)'}
          </a>
        </div>
      </div>
    </main>
  );
}