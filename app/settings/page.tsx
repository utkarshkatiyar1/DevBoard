'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUser } from '@/lib/hooks';
import AppLayout from '@/components/layout/AppLayout';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const settingsSchema = z.object({
    leetcodeUsername: z.string().optional().or(z.literal('')),
    devtoApiKey: z.string().optional().or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
    const { user, mutate } = useUser();
    const [copied, setCopied] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),

        values: {
            leetcodeUsername: user?.leetcodeUsername || '',
            // devtoApiKey: user?.devtoApiKey || "",
            devtoApiKey: "3hzzfMk1bTwn5QJyWUVuNaVM",
        }
    });

    console.log(user, 'my user');

    const onSubmit = async (data: SettingsFormValues) => {
        const toastId = toast.loading('Saving...');
        try {
            const res = await fetch('/api/user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            const responseData = await res.json();
            if (!res.ok) throw new Error(responseData.message || 'Failed to save settings.');

            await mutate(); // Re-fetch user data to update UI
            toast.success('Settings saved!', { id: toastId });
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
        }
    };

    const handleCopy = () => {
        if (user?.username) {
            const url = `${window.location.origin}/${user.username}`;
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        }
    };

    return (
        <AppLayout>
            {/* This renders the toast notifications */}
            <Toaster position="top-center" toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                }
            }} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto py-8"
            >
                <h1 className="text-3xl font-bold mb-8">Settings</h1>

                {/* LeetCode Form */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="leetcodeUsername" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                LeetCode Username
                            </label>
                            <input
                                id="leetcodeUsername"
                                type="text"
                                {...register('leetcodeUsername')}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="e.g., johndoe"
                            />
                            {errors.leetcodeUsername && <p className="mt-2 text-sm text-red-500">{errors.leetcodeUsername.message}</p>}
                        </div>

                        {/* Dev.to API Key */}
                        <div>
                            <label htmlFor="devtoApiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Dev.to API Key
                            </label>
                            <input
                                id="devtoApiKey"
                                {...register("devtoApiKey")}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.devtoApiKey && (
                                <p className="text-sm text-red-500 mt-1">{errors.devtoApiKey.message}</p>
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                You can generate your API key at dev.to/settings/account.
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Public Profile URL Section */}
                {user?.username && (
                    <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Your Public Profile</h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Share your dashboard with this public URL.</p>
                        <div className="mt-4 flex items-center gap-2 rounded-md bg-gray-100 dark:bg-gray-800 p-2 border border-gray-300 dark:border-gray-700">
                            <span className="flex-1 text-sm text-indigo-600 dark:text-indigo-400 truncate">
                                {`${window.location.origin}/${user.username}`}
                            </span>
                            <button onClick={handleCopy} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-500" />}
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </AppLayout>
    );
}