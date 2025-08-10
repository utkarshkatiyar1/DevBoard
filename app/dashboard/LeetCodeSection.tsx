'use client';
import useSWR from 'swr';
import { Trophy, Swords, CheckCircle, BrainCircuit } from 'lucide-react';
import RecentSubmissions from '@/components/dashboard/RecentSubmissions';
import { motion } from 'framer-motion';
import { DashboardSectionSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(r => r.json());

const ProgressBar = ({ value, total, color }: any) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">{value}</span>
            <span className="text-gray-500 dark:text-gray-400">/ {total}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
                className={`h-2 rounded-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${(value / total) * 100}%` }}
                transition={{ duration: 1 }}
            />
        </div>
    </div>
);


export default function LeetCodeSection() {
    const { data, error, isLoading } = useSWR('/api/leetcode', fetcher);

    if (isLoading) return <DashboardSectionSkeleton />;
    if (error || !data) {
        return <ErrorDisplay title="LeetCode Connection Error" message="We couldn't fetch your data from Leetcode. Please try refreshing or check your connection." />;
    }
    const {
        ranking, contributionPoints, easySolved, totalEasy, mediumSolved, totalMedium, hardSolved, totalHard, recentSubmissions
    } = data;

    const totalSolved = easySolved + mediumSolved + hardSolved;
    const totalQuestions = totalEasy + totalMedium + totalHard;

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
            <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <div>
                    <h2 className="text-xl font-bold">LeetCode Stats</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ranking: #{ranking?.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-2xl font-bold">{totalSolved}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Solved</p>
                </div>
                <div>
                    <p className="text-2xl font-bold">{contributionPoints}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Contributions</p>
                </div>
            </div>

            <div className="space-y-4">
                <ProgressBar value={easySolved} total={totalEasy} color="bg-green-500" />
                <ProgressBar value={mediumSolved} total={totalMedium} color="bg-yellow-500" />
                <ProgressBar value={hardSolved} total={totalHard} color="bg-red-500" />
            </div>

            <RecentSubmissions submissions={recentSubmissions} />
        </div>
    );
}