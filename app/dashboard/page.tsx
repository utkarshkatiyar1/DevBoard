'use client';

import AppLayout from '@/components/layout/AppLayout';
import GitHubSection from './GitHubSection';
import LeetCodeSection from './LeetCodeSection';

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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}