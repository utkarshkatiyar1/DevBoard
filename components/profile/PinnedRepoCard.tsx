import { Star, GitFork, Book } from 'lucide-react';

export const PinnedRepoCard = ({ repo }: { repo: any }) => (
    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="block p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center gap-3 mb-2">
            <Book className="h-5 w-5 text-indigo-500 flex-shrink-0" />
            <p className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate">{repo.name}</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 h-10 mb-4">{repo.description}</p>
        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            {repo.primaryLanguage && (
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                    <span>{repo.primaryLanguage.name}</span>
                </div>
            )}
            <div className="flex items-center gap-1.5"><Star className="h-4 w-4" />{repo.stargazers.totalCount.toLocaleString()}</div>
            <div className="flex items-center gap-1.5"><GitFork className="h-4 w-4" />{repo.forks.totalCount.toLocaleString()}</div>
        </div>
    </a>
);