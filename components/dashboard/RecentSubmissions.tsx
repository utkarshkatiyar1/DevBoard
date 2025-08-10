'use client';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import TimeAgo from 'react-timeago'; // A nice library for relative times

type Submission = {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
};

type Props = {
    submissions: Submission[];
};

const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case 'Accepted':
            return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />;
        case 'Wrong Answer':
            return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
        default:
            return <Clock className="h-5 w-5 text-gray-500 flex-shrink-0" />;
    }
};

export default function RecentSubmissions({ submissions }: Props) {
    if (!submissions || submissions.length === 0) {
        return <p className="text-gray-400">No recent submissions found.</p>;
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Recent Submissions</h3>
            <ul className="space-y-3">
                {submissions.slice(0, 5).map((sub) => ( // Show latest 5
                    <li key={`${sub.titleSlug}-${sub.timestamp}`} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                            <StatusIcon status={sub.statusDisplay} />
                            <div>
                                <a href={`https://leetcode.com/problems/${sub.titleSlug}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                                    {sub.title}
                                </a>
                                <p className="text-xs text-gray-400">
                                    <TimeAgo date={new Date(parseInt(sub.timestamp) * 1000)} /> - {sub.lang}
                                </p>
                            </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${sub.statusDisplay === 'Accepted' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                            {sub.statusDisplay}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}