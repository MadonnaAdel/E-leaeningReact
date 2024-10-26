export default function Progressbar({ progress }: { progress: string | undefined }): JSX.Element {
    return (
        <div className="flex items-center gap-2">
            <div className="h-2 rounded-full bg-stone-100 w-full dark:bg-stone-800">
                <div className={`h-full rounded-full bg-violet-400`} style={{ width: progress || '0%' }}></div>
            </div>

            <span className="text-sm dark:text-stone-50">{progress}</span>
        </div>
    )
}
