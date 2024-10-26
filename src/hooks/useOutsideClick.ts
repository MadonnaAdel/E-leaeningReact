import { useEffect, useRef } from "react";

export default function useOutsideClick({
    clickHandler,
    bubbling,
}: {
    clickHandler: () => void;
    bubbling: boolean;
}): React.RefObject<HTMLDivElement> {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                clickHandler();
            }
        };

        document.addEventListener("click", handleClick, bubbling);

        return () => {
            document.removeEventListener("click", handleClick, bubbling);
        };
    }, [clickHandler, bubbling]);

    return ref;
}
