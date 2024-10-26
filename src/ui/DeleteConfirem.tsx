import { TiWarningOutline } from "react-icons/ti";

interface DeleteConfirmProps {
    label: string;
    title: string;
    courseId: number;
    onConfirm: (courseId: number) => void;
    onCancel: () => void;
}

export default function DeleteConfirm({
    label,
    title,
    courseId, 
    onConfirm,
    onCancel,
}: DeleteConfirmProps) {
    return (
        <div className="flex flex-col gap-3 bg-white border rounded-lg p-8 w-[100%] sm:w-[32rem] dark:bg-black dark:text-white">
            <div className="grid grid-cols-[1fr_auto] gap-4">
                <TiWarningOutline className="text-5xl text-red-600" />
                <p>
                    Are you sure you want to delete {title} {label}?
                </p>
            </div>
            <div className="flex items-center justify-end gap-3 ">
                <button
                    onClick={onCancel}
                    className="p-2 rounded-md border bg-white hover:bg-stone-50 transition-colors dark:bg-stone-700 dark:hover:bg-stone-800 dark:text-white"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onConfirm(courseId)}
                    className="p-2 rounded-md border text-white bg-red-500 hover:bg-red-600 transition-colors dark:border-0"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
