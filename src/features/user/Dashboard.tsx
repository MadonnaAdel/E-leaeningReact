import { Outlet } from "react-router-dom";
import UserNavLinks from "./UserNavLinks";


export default function Dashboard(): JSX.Element {
    return (
        <div className="h-full grid grid-cols-[auto_1fr] lg:grid-cols-[16rem_1fr] ">
            <UserNavLinks />
            <section className="max-h-[85dvh] overflow-auto scrollbar-hidden relative">
                <Outlet />
            </section>
        </div>
    )
}
