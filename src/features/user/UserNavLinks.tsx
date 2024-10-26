import { FaChalkboardUser, FaUserLarge } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { Link } from "../../ui/Header";
import { useAuth } from "../../contexts/AuthContext";

const links: Link[] = [
    {
        href: 'profile',
        name: 'Profile',
        rolesAllowed:[1,2,3],
        icon: <FaUserLarge className="text-lg" />
    },
    {
        href: 'my-courses',
        name: 'My Courses',
        rolesAllowed:[1,2],
        icon: <FaChalkboardUser className="text-lg" />
    },
]

export default function UserNavLinks() {
   const {user,setUser} = useAuth();

    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem('enrolledCourses');
    }

    return (
            <ul className="h-[85dvh] bg-white border-r border-r-stone-200 flex flex-col gap-2 py-6 lg:px-4 dark:border-black dark:bg-black">
                {links.map((link) =>
                 (
                        <li className="font-bold" key={link.href}>
                            <NavLink
                                key={link.href}
                                to={link.href}
                                className={
                                    'flex items-center gap-2 p-4 lg:p-3 rounded text-violet-700 hover:bg-stone-100 dark:hover:bg-stone-900 dark:text-violet-400'
                                }
                            >
                                {link.icon} <span className="hidden lg:block">{link.name}</span>
                            </NavLink>
                        </li>
                    
                ))}
                <li className="font-bold cursor-pointer" onClick={handleLogOut}>
                    <p
                        className={
                            'flex items-center gap-2 p-4 rounded text-violet-700 hover:bg-stone-100 lg:p-3 dark:hover:bg-stone-900 dark:text-violet-400'
                        }
                    >
                        <TbLogout className="text-lg" />
                        <span className="hidden lg:block">Log out</span>
                    </p>
                </li>
            </ul>
        );
}
