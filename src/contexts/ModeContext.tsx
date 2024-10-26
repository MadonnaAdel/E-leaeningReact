import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ModeProviderProps {
    children: ReactNode
}

interface ModeContextValue {
    dark: boolean,
    setDark: React.Dispatch<React.SetStateAction<boolean>>
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export function ModeProvider({ children }: ModeProviderProps): JSX.Element {
    const [dark, setDark] = useState(() => {
        return window.localStorage.getItem('mode') === 'dark';
    });

    useEffect(() => {
        if (dark) {
            window.localStorage.setItem('mode', 'dark');
        } else {
            window.localStorage.setItem('mode', 'light');
        }
    }, [dark]);

    return <ModeContext.Provider value={{ dark, setDark }}>{children}</ModeContext.Provider>
}

export function useMode(): ModeContextValue {
    const context = useContext(ModeContext);

    if (!context) throw new Error('Mode Context used outside scope');

    return context;
}