'use client';
import { useGitHubData } from '@/lib/hooks';
import { Star, GitFork, Book, Users, Code, Building } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import { DashboardSectionSkeleton, Skeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';

// --- GitHub Calendar ---
import GitHubCalendar from 'react-github-calendar';
import { useTheme } from 'next-themes';

const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 flex items-center gap-4"
    >
        <div className={`rounded-full p-2 ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
    </motion.div>
);

const PinnedRepoCard = ({ repo }: any) => (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Book className="h-4 w-4 text-indigo-500" />
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">{repo.name}</a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{repo.description}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {repo.primaryLanguage && (
                <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                    <span>{repo.primaryLanguage.name}</span>
                </div>
            )}
            <div className="flex items-center gap-1"><Star className="h-4 w-4" />{repo.stargazers.totalCount}</div>
            <div className="flex items-center gap-1"><GitFork className="h-4 w-4" />{repo.forks.totalCount}</div>
        </div>
    </div>
);


export default function GitHubSection() {
    const { data, isLoading, isError } = useGitHubData();
    const { theme } = useTheme();

    if (isLoading) return <DashboardSectionSkeleton />;
    if (isError || !data) {
        return <ErrorDisplay title="GitHub Connection Error" message="We couldn't fetch your data from GitHub. Please try refreshing or check your connection." />;
    }
    const { profile, pinnedRepos } = data;

    return (
        <div className="space-y-8">
            {/* User Profile Header */}
            <div className="flex items-center gap-4">
                <img src={profile.avatar_url} alt="GitHub Avatar" className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-700" />
                <div>
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400">@{profile.login}</p>
                    {profile.bio && <p className="mt-2 text-sm max-w-lg">{profile.bio}</p>}
                    {profile.company && <p className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-300"><Building className="h-4 w-4" />{profile.company}</p>}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Book} title="Public Repos" value={profile.public_repos} color="bg-indigo-500" />
                <StatCard icon={Users} title="Followers" value={profile.followers} color="bg-pink-500" />
                <StatCard icon={GitFork} title="Following" value={profile.following} color="bg-green-500" />
                <StatCard icon={Code} title="Total Gists" value={profile.public_gists} color="bg-sky-500" />
            </div>

            {/* Contribution Calendar */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <GitHubCalendar
                    username={profile.login}
                    colorScheme={theme === 'dark' ? 'dark' : 'light'}
                    blockSize={12}
                    fontSize={12}
                />
            </div>

            {/* Pinned Repositories */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Pinned Repositories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pinnedRepos.map((repo: any) => <PinnedRepoCard key={repo.id} repo={repo} />)}
                </div>
            </div>
        </div>
    );
}