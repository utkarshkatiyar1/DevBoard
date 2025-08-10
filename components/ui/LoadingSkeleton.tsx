import { motion } from 'framer-motion';

// A generic skeleton component for clean loading states
export const Skeleton = ({ className }: { className?: string }) => (
    <div className={`bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md ${className}`} />
);

// A specific layout for loading the main dashboard sections
export const DashboardSectionSkeleton = () => (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-40 w-full" />
    </div>
);