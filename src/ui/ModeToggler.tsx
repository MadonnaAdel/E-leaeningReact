import { IoMoonOutline } from "react-icons/io5";
import { useMode } from "../contexts/ModeContext";
import { LuSunMoon } from "react-icons/lu";


export default function ModeToggler(): JSX.Element {
    const { dark, setDark } = useMode();

    return (
        <button className="text-xl" onClick={() => setDark(state => !state)}>
            {dark ? <LuSunMoon /> : <IoMoonOutline />}
        </button>
    )
}
