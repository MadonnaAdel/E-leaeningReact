export default function InfoItem({ label, value }: { label: string; value: number }): JSX.Element {
    return (
        <p className="py-2 flex items-center justify-between border-b dark:border-stone-500 last:border-0">
            <span>{label}</span>{" "}
            <span className="px-1 bg-violet-100 text-violet-600 text-sm rounded-md ">{value}</span>
        </p>
    )
}
