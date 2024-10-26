
export default function EnrollButton({
    onClick,
    isDisabled,
    isEnrolled 
}: {
    onClick: () => void;
    isDisabled: boolean;
    isEnrolled: boolean; 
    }): JSX.Element {
 

    return (
        <button
            onClick={onClick}
            className={`py-1 px-3 text-sm border rounded transition-colors sm:text-base ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-violet-500 text-stone-50 hover:bg-violet-600'
                }`}
            disabled={isDisabled}
        >
            {isEnrolled ? 'Unenroll' : 'Enroll now'}
        </button>
    );
}
