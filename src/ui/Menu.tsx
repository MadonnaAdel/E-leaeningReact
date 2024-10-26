/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, ReactNode, useContext, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import useOutsideClick from "../hooks/useOutsideClick";

interface MenuContextValues {
    menuID: string;
    setMenuID: React.Dispatch<React.SetStateAction<string>>;
}

interface MenuProps {
    children: ReactNode;
}

const MenuContext = createContext<MenuContextValues>({} as MenuContextValues);

export default function Menu({ children }: MenuProps): JSX.Element {
    const [menuID, setMenuID] = useState<string>("");

    return (
        <MenuContext.Provider value={{ menuID, setMenuID }}>
            {children}
        </MenuContext.Provider>
    );
}

function Toggler({ id, className }: { id: string, className?: string }): JSX.Element {
    const { menuID, setMenuID } = useContext(MenuContext);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();

        if (menuID === id && id !== "") {
            setMenuID("");
        } else {
            setMenuID(id);
        }
    };

    return (
        <button onClick={handleClick} className={`p-2 cursor-pointer ${className}`}>
            <CiMenuKebab />
        </button>
    );
}

function List({
    children,
    id,
    className
}: {
    children: ReactNode;
    id: string;
    className?: string
}): JSX.Element {
    const { menuID, setMenuID } = useContext(MenuContext);
    const ref = useOutsideClick({
        clickHandler: () => setMenuID(""),
        bubbling: false,
    });

    if (menuID !== id) return <></>;

    return (
        <div
            className={`w-[10rem] flex flex-col rounded-lg bg-white overflow-hidden absolute z-10 right-[100%] dark:bg-black ${className}`}
            ref={ref}
        >
            {children}
        </div>
    );
}

function Option({
    children,
    id,
    onClick,
}: {
    children: ReactNode;
    id: string;
    onClick?: () => void;
}): JSX.Element {
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onClick?.();
    };

    return (
        <div
            onClick={handleClick}
            className="p-2 w-full flex items-center gap-2 hover:bg-stone-100 text-gray-800 border-b cursor-pointer last:border-0 dark:border-stone-600 dark:text-white dark:hover:bg-stone-800"
        >
            {children}
        </div>
    );
}

Menu.Toggler = Toggler;
Menu.List = List;
Menu.Option = Option;
