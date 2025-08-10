import type { Metadata } from 'next';
import { getPublicProfileData } from '@/services/server/publicProfileService'; // Ensure you created this file
import { Building, Link as LinkIcon } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { PinnedRepoCard } from '@/components/profile/PinnedRepoCard';
import { LeetCodePublicStats } from '@/components/profile/LeetCodePublicStats';


export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    const data = await getPublicProfileData(params.username);
    if (!data) return { title: 'User Not Found' };
    return {
        title: `${data.displayName}'s DevBoard Profile`,
        description: `Explore the developer profile of ${data.displayName}.`,
    };
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
    const data = await getPublicProfileData(params.username);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <ErrorDisplay
                    title="Profile Not Found"
                    message={`We couldn't find a user with the username "${params.username}".`}
                />
            </div>
        );
    }

    const { github, leetcode, displayName, avatarUrl, githubUsername } = data;

    return (
        <div className="bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen font-sans">
            <main className="container mx-auto max-w-5xl p-4 md:p-8">
                {/* Profile Header */}
                <header className="flex flex-col sm:flex-row items-start gap-6 mb-12">
                    <img src={avatarUrl} alt={displayName} className="w-40 h-40 rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-lg" />
                    <div className="pt-4">
                        <h1 className="text-4xl md:text-5xl font-bold">{displayName}</h1>
                        <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-xl text-gray-500 dark:text-gray-400 hover:text-indigo-500">
                            @{githubUsername}
                        </a>
                        {github?.profile.bio && <p className="mt-4 text-lg max-w-lg">{github.profile.bio}</p>}
                        <div className="flex items-center gap-4 mt-4 text-gray-600 dark:text-gray-400">
                            {github?.profile.company && <p className="flex items-center gap-2"><Building className="h-5 w-5" />{github.profile.company}</p>}
                            {github?.profile.blog && <a href={github.profile.blog} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-500"><LinkIcon className="h-5 w-5" />Website</a>}
                        </div>
                    </div>
                </header>

                <div className="space-y-12">
                    {github && (
                        <section>
                            <h2 className="text-3xl font-bold mb-6">GitHub Insights</h2>
                            <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-6">
                                {/* FIX for Server-Side Theme Calendar */}
                                <div className="dark:hidden"><GitHubCalendar username={github.profile.login} colorScheme="light" /></div>
                                <div className="hidden dark:block"><GitHubCalendar username={github.profile.login} colorScheme="dark" /></div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Pinned Repositories</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {github.pinnedRepos.map((repo: any) => <PinnedRepoCard key={repo.id} repo={repo} />)}
                            </div>
                        </section>
                    )}

                    {leetcode && (
                        <section>
                            <h2 className="text-3xl font-bold mb-6">LeetCode Breakdown</h2>
                            <LeetCodePublicStats leetcode={leetcode} />
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}