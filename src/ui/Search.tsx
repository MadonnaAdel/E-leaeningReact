import { CiSearch } from "react-icons/ci";
import { useState } from "react";

interface SearchProps {
    onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="relative w-full dark:text-white">
            <input
                type="search"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search for courses ..."
                className="p-2 ps-10 w-full border border-stone-200 bg-white rounded-md focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 transition-all dark:bg-black dark:border-stone-800"
            />
            <span className="absolute top-2 left-3">
                <CiSearch className="text-2xl text-stone-400" />
            </span>
        </div>
    );
}
