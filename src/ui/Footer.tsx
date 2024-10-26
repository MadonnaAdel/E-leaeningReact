import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { Link } from "./Header";
import { FaAngleDoubleRight } from "react-icons/fa";

const links: Link[] = [
  {
    href: "#",
    name: "Legal Notice",
  },
  {
    href: "#",
    name: "Privacy policy",
  },
  {
    href: "#",
    name: "Accessability",
  },
];

export default function Footer(): JSX.Element {
  return (
    <div className=" bg-stone-950 text-stone-50 px-3 py-6">
      <div className="max-w-[95%] sm:max-w-[80%] mx-auto flex flex-wrap justify-between">
        <div>
          <a href="https://www.learnify.com" target="blank">
            www.learnify.com
          </a>
          <img
            src="/logo_dark.png"
            alt="leanify logo dark"
            className="h-[5rem]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-violet-400 text-lg">Links of interests</h2>

          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.name} className="flex gap-2 items-center text-sm hover:ps-2 transition-all ">
                <FaAngleDoubleRight />
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 ">
          <h2 className="font-semibold text-violet-400 text-lg">Contact us</h2>
          <p className="flex items-center gap-2">
            <MdOutlineLocalPhone />
            <span>+21654898797</span>
          </p>
          <p className="flex items-center gap-2">
            <MdOutlineEmail />
            <span>learnify@info.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
