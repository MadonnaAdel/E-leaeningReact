import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode,
    className?: string,
    isDisabled?: boolean;
    onClick?: () => void
}

export default function Button({ children, className, onClick, isDisabled }: ButtonProps) {
    return (
        <button 
        className={`p-2 rounded-md bg-violet-500 text-stone-50 transition-colors hover:bg-violet-600 disabled:bg-gray-400  ${className}`} 
        onClick={onClick}
        disabled={isDisabled}
        >
            {children}
         </button>
    )
}
