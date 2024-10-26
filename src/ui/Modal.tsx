/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useContext, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

interface ModalContextValues {
    modalName: string;
    open: React.Dispatch<React.SetStateAction<string>>;
    close: () => void;
}

export const ModalContext = createContext({} as ModalContextValues);

export default function Modal({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const [modalName, setModalName] = useState<string>("");
    const close = () => setModalName("");

    return (
        <ModalContext.Provider value={{ modalName, open: setModalName, close }}>
            {children}
        </ModalContext.Provider>
    );
}

function Open({
    children,
    name,
}: {
    children: ReactNode;
    name: string;
}): JSX.Element {
    const { open } = useContext(ModalContext);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        open(name);
    };

    return <button onClick={handleClick} className="w-full flex items-center gap-2">{children}</button>;
}

function Window({
    children,
    name,
}: {
    children: ReactNode;
    name: string;
}): JSX.Element {

    const { modalName, close } = useContext(ModalContext);
    const ref = useOutsideClick({ clickHandler: close, bubbling: true });

    if (modalName !== name) return <></>;

    return (
        <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-30  backdrop-blur-sm flex flex-col items-center justify-center p-6 sm:p-16">
            <div className="w-full max-h-[90dvh] overflow-auto scrollbar-hidden grid place-items-center sm:w-auto" ref={ref}>
                {children}
            </div>
        </div>
    );
}

Modal.Open = Open;
Modal.Window = Window;
