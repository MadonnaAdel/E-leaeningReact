import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import ModeToggler from "./ModeToggler";
import { useAuth } from "../contexts/AuthContext";

export interface Link {
    href: string,
    name: string,
    rolesAllowed?: number[],
    icon?: React.ReactNode
}

const basicLinks: Link[] = [
    {
        href: '/about',
        name: 'About'
    },
    {
        href: '/contact',
        name: 'Contact Us'
    },
];

const unAuthLinks: Link[] = [
    {
        href: '/login',
        name: 'Login'
    },
    {
        href: '/signup',
        name: 'Signup'
    }
];

const authLinks: Link[] = [
    {
        href: '/user',
        name: 'Dashboard'
    },
    {
        href: '/',
        name: 'Log out'
    }
];

export default function Header() {
    const { pathname } = useLocation();
    const [show, setShow] = useState(false);
    const { user, setUser } = useAuth();

    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem('enrolledCourses');
    };

    useEffect(() => {
        setShow(false);
    }, [pathname]);

    return (
        <header className="bg-white py-2 border-b border-b-stone-200 dark:border-stone-950 dark:bg-black">
            <div className='flex items-center justify-between w-[95%] mx-auto'>
                <Logo />

                <ul className={`flex flex-col sm:gap-4 fixed top-0 right-0 h-[100dvh] bg-stone-50 w-[16rem] transition-transform z-10 ${show ? 'translate-x-0' : 'translate-x-full'} sm:flex-row sm:static sm:h-auto sm:w-auto sm:bg-transparent sm:dark:bg-transparent sm:translate-x-0 dark:bg-stone-900`}>
                    <p className="flex justify-end py-4 px-2 cursor-pointer sm:hidden dark:text-white" onClick={() => setShow(false)}>
                        <RiCloseLargeLine />
                    </p>

                  
                        <li className="font-bold p-2 text-violet-600 text-center transition-colors hover:bg-white sm:hover:bg-transparent sm:p-0 dark:text-violet-200 dark:hover:bg-black">
                            <Link to="/courses">Courses</Link>
                        </li>
      

                    {basicLinks.map((link) => (
                        <li key={link.href} className="font-bold p-2 text-violet-600 text-center transition-colors hover:bg-white sm:hover:bg-transparent sm:p-0 dark:text-violet-200 dark:hover:bg-black">
                            <Link to={link.href}>{link.name}</Link>
                        </li>
                    ))}

                    {user ? (
                        authLinks.map((link) => (
                            <li
                                key={link.href}
                                className="font-bold p-2 cursor-pointer text-violet-600 text-center transition-colors hover:bg-white sm:hover:bg-transparent sm:p-0 dark:text-violet-200 dark:hover:bg-black"
                                onClick={link.name === 'Log out' ? handleLogOut : () => { }}
                            >
                                {link.name === 'Log out' ? 'Log out' : <Link to={link.href}>{link.name}</Link>}
                            </li>
                        ))
                    ) : (
                        unAuthLinks.map((link) => (
                            <li key={link.href} className="font-bold p-2 text-violet-600 text-center transition-colors hover:bg-white sm:hover:bg-transparent sm:p-0 dark:text-violet-200 dark:hover:bg-black">
                                <Link to={link.href}>{link.name}</Link>
                            </li>
                        ))
                    )}

                    <li className="font-bold p-2 text-xl text-violet-600 text-center transition-colors sm:p-0 hover:bg-white sm:hover:bg-transparent dark:text-violet-200 dark:hover:bg-black">
                        <ModeToggler />
                    </li>
                </ul>

                <span className="text-xl block cursor-pointer sm:hidden dark:text-violet-200" onClick={() => setShow(true)}>
                    <AiOutlineMenu />
                </span>
            </div>
        </header>
    );
}
