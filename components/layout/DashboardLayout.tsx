import { ReactNode } from 'react';
import Header from './Header'; // We'll create this
type Props = {
    children: ReactNode;
};
export default function DashboardLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}