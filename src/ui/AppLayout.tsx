import { Outlet } from "react-router-dom";
import { useMode } from "../contexts/ModeContext";
import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout(): JSX.Element {
    const { dark } = useMode();

    return (
        <div className={`min-h-[100dvh]  ${dark && 'dark'} `}>
            <div className=" min-h-[100dvh] bg-stone-50 dark:bg-stone-900 transition-colors font-mono" >
                <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
                    <Header />
                    <main className="">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
