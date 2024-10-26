import { Link } from "react-router-dom";
import { useMode } from "../contexts/ModeContext";


export default function Logo(): JSX.Element {
    const { dark } = useMode();

    return (
        <Link to={'/'}>
            <img src={`${dark ? '/public/logo_dark.png' : '/public/logo_.png'}`} alt="" className="h-[4rem]" />
        </Link>
    )
}
