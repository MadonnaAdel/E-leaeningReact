import { BiErrorAlt } from "react-icons/bi";

export default function ErrorMessage({message}:{message?:string}):JSX.Element{
    return  <p className="w-fit mt-24 mx-auto flex items-center gap-3  text-red-700 font-semibold bg-white border p-4 rounded-md dark:bg-black dark:border-stone-700">
    <BiErrorAlt className="text-2xl" />
    <span> Error: {message}</span>
</p>
}