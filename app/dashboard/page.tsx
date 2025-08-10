// 'use client';

// import DashboardLayout from '@/components/layout/DashboardLayout';
// import LeetCodeWidget from './LeetCodeWidget';
// import StatCard from '@/components/dashboard/StatCard';
// import { useGitHubData, useUser } from '@/lib/hooks';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// // A simple loading skeleton component
// const LoadingSkeleton = () => (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
//         <div className="h-28 rounded-lg bg-gray-800"></div>
//         <div className="h-28 rounded-lg bg-gray-800"></div>
//         <div className="h-28 rounded-lg bg-gray-800"></div>
//         <div className="h-28 rounded-lg bg-gray-800"></div>
//     </div>
// );


// export default function DashboardPage() {
//     const router = useRouter();
//     const { user, isLoading: userLoading, isError: userError } = useUser();
//     const { data: githubData, isLoading: githubLoading, isError: githubError } = useGitHubData();

//     useEffect(() => {
//         if (!userLoading && (userError || !user)) {
//             router.push('/');
//         }
//     }, [user, userLoading, userError, router]);

//     if (userLoading || !user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-900">
//                 <p>Loading user profile...</p>
//             </div>
//         );
//     }

//     return (
//         <DashboardLayout>
//             <div className="space-y-8">
//                 <h1 className="text-2xl font-semibold">Welcome back, {user.displayName}!</h1>

//                 <section>
//                     <h2 className="text-xl font-semibold mb-4">GitHub Stats</h2>
//                     {githubLoading && <LoadingSkeleton />}
//                     {githubError && <p className="text-red-400">Failed to load GitHub stats.</p>}
//                     {githubData && (
//                         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                             <StatCard title="Public Repos" value={githubData.profile.public_repos} />
//                             <StatCard title="Followers" value={githubData.profile.followers} />
//                             <StatCard title="Following" value={githubData.profile.following} />
//                             <StatCard title="Total Stars" value={"N/A"} /> {/* Need to calculate this */}
//                         </div>
//                     )}
//                 </section>

//                 <LeetCodeWidget />


//                 <section>
//                     <h2 className="text-xl font-semibold mb-4">Pinned Repositories</h2>
//                     {/* You would map over githubData.pinnedRepos here and render PinnedRepoCard components */}
//                 </section>
//             </div>
//         </DashboardLayout>
//     );
// }



'use client';

import AppLayout from '@/components/layout/AppLayout';
import GitHubSection from './GitHubSection';
import LeetCodeSection from './LeetCodeSection';
import DevtoSection from './DevtoSection';

export default function DashboardPage() {
    return (
        <AppLayout>
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <GitHubSection />
                    </div>
                    <div className="space-y-8">
                        <LeetCodeSection />
                        <DevtoSection />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}