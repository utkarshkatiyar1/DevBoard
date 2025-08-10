type Props = {
    title: string;
    value: string | number;
};

export default function StatCard({ title, value }: Props) {
    return (
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
        </div>
    );
}