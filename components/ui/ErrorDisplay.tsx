import { AlertTriangle } from 'lucide-react';

type Props = {
    title: string;
    message: string;
    action?: React.ReactNode;
};

export const ErrorDisplay = ({ title, message, action }: Props) => (
    <div className="bg-red-500/10 dark:bg-red-900/20 border border-red-500/20 dark:border-red-800 rounded-lg p-6 text-center text-red-700 dark:text-red-300">
        <AlertTriangle className="mx-auto h-12 w-12" />
        <h3 className="mt-2 text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm">{message}</p>
        {action && <div className="mt-4">{action}</div>}
    </div>
);