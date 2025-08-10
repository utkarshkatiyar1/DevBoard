'use client';
import useSWR from 'swr';
import StatCard from '@/components/dashboard/StatCard';
import { AlertTriangle, Link } from 'lucide-react';
import RecentSubmissions from '@/components/dashboard/RecentSubmissions';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(r => r.json());


export default function LeetCodeWidget() {
    const { data, error, isLoading } = useSWR('/api/leetcode', fetcher, {
        // Re-fetch every 5 minutes
        refreshInterval: 300000
    });

    if (isLoading) return <div className="text-center p-4 bg-gray-800 rounded-lg">Loading LeetCode Stats...</div>;

    // User hasn't linked their account yet
    if (error && error.status === 404) {
        return (
            <div className="p-4 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded-lg flex items-center gap-4">
                <AlertTriangle className="h-8 w-8" />
                <div>
                    <p className="font-bold">Link Your LeetCode Account</p>
                    <p className="text-sm">Go to settings to add your username and see your stats.</p>
                </div>
                <a href="/settings" className="ml-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md inline-flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    Settings
                </a>
            </div>
        );
    }

    if (error) return <div className="text-red-400 p-4 bg-gray-800 rounded-lg">Failed to load LeetCode stats.</div>;
    if (!data) return null; // Initial load before first fetch completes

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-semibold">LeetCode Progress (@{data.username})</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <StatCard title="Ranking" value={`#${data.ranking?.toLocaleString()}`} />
                <StatCard title="Contribution" value={data.contributionPoints} />
                <StatCard title="Solved" value={`${data.easySolved + data.mediumSolved + data.hardSolved}`} />
                <StatCard title="Submissions" value={data.recentSubmissions.length > 0 ? 'Recent Activity' : 'No Activity'} />
            </div>

            {/* Recent Submissions */}
            <RecentSubmissions submissions={data.recentSubmissions} />
        </section>
    );
}