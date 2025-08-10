'use client';

import useSWR from 'swr';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { Skeleton } from '@/components/ui/LoadingSkeleton';
import { Heart, MessageSquare, BookOpen, LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json());

const DevtoCard = ({ article }: { article: any }) => (
    <motion.a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{article.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {new Date(article.published_at).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{article.description}</p>
        <div className="mt-2 flex gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> {article.public_reactions_count}
            </span>
            <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" /> {article.comments_count}
            </span>
        </div>
        <p className="mt-2 text-xs text-indigo-500 hover:underline flex items-center gap-1">
            <LinkIcon className="h-3 w-3" /> Read more
        </p>
    </motion.a>
);

export default function DevtoSection() {
    const { data, error, isLoading } = useSWR('/api/devto', fetcher);
    console.log(data, "Dev To API Data");

    if (isLoading) return <Skeleton className="h-64" />;
    if (error || !data)
        return <ErrorDisplay title="Dev.to Connection Error" message="Unable to fetch Dev.to articles." />;

    if (data.length === 0)
        return (
            <div className="p-4 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <BookOpen className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">No Dev.to articles found.</p>
            </div>
        );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dev.to Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.map((article: any) => (
                    <DevtoCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
