'use client';
import { motion } from 'framer-motion';

const StatItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="text-center">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
);

const ProblemBar = ({ difficulty, solved, total }: { difficulty: string; solved: number; total: number }) => {
    const colorClasses: { [key: string]: string } = {
        Easy: "bg-green-500",
        Medium: "bg-yellow-500",
        Hard: "bg-red-500"
    };

    return (
        <div>
            <div className="flex justify-between items-end mb-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">{difficulty}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{solved} <span className="text-xs">/ {total}</span></p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                    className={`h-2.5 rounded-full ${colorClasses[difficulty]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(solved / total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </div>
        </div>
    );
};

export const LeetCodePublicStats = ({ leetcode }: { leetcode: any }) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
        <div className="grid grid-cols-3 gap-4">
            <StatItem label="Total Solved" value={leetcode.easySolved + leetcode.mediumSolved + leetcode.hardSolved} />
            <StatItem label="Ranking" value={`#${leetcode.ranking.toLocaleString()}`} />
            <StatItem label="Contributions" value={leetcode.contributionPoints} />
        </div>
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <ProblemBar difficulty="Easy" solved={leetcode.easySolved} total={leetcode.totalEasy} />
            <ProblemBar difficulty="Medium" solved={leetcode.mediumSolved} total={leetcode.totalMedium} />
            <ProblemBar difficulty="Hard" solved={leetcode.hardSolved} total={leetcode.totalHard} />
        </div>
    </div>
);