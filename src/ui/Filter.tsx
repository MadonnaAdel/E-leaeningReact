import { useState, useEffect, useRef } from "react";
import { FaFilter, FaRedo } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export interface OptionCat {
    id: number;
    name: string;
    isDelete: boolean;
    courses: [];
}

export interface Optionstate {
    value: string;
    text: string;
}

interface FilterProps {
    categoryOptions: OptionCat[];
    statusOptions: Optionstate[];
    onStateFilter: (query: string) => void;
    onCategoryFilter: (query: string) => void;
}

export default function Filter({ categoryOptions, statusOptions, onStateFilter, onCategoryFilter }: FilterProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        searchParams.set("category", e.target.value);
        setSearchParams(searchParams);
        onCategoryFilter(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        searchParams.set("status", e.target.value);
        setSearchParams(searchParams);
        onStateFilter(e.target.value);
    };

    const resetFilters = () => {
        searchParams.delete("category");
        searchParams.delete("status");
        setSearchParams(searchParams);
        onStateFilter(""); 
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative z-10" ref={dropdownRef}>
            <button
                className="bg-white p-3 rounded-md border border-stone-200 focus:outline-none dark:bg-black dark:border-stone-800 dark:text-white"
                onClick={toggleDropdown}
            >
                <FaFilter className="text-lg filter-outline text-violet-700" />
            </button>
           

            {isDropdownOpen && (
                <div className="absolute -left-16 w-40 mt-2 bg-white border border-stone-200 p-4 rounded-md shadow-lg dark:bg-black dark:border-stone-800">
                    
                    {/* Filter Category */}
                    <div className="mb-4">
                        <div className="flex justify-between align-middle mb-2">
                            <label className="block text-sm font-medium mb-2 dark:text-white">Category</label>
                            <button
                                className="border border-violet-500 text-violet-500  p-1 rounded-md hover:bg-violet-500 hover:text-white focus:outline-none text-xs "
                                onClick={resetFilters}
                            >
                                <FaRedo />
                            </button>
                        </div>
                        <select
                            className="w-full bg-white p-2 rounded-md border border-stone-200 focus:outline-none dark:bg-black dark:border-stone-800 dark:text-white"
                            onChange={handleCategoryChange}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Category</option>
                            {categoryOptions.map((option) => (
                                <option key={option.id} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filter Status */}
                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                        <select
                            className="w-full bg-white p-2 rounded-md border border-stone-200 focus:outline-none dark:bg-black dark:border-stone-800 dark:text-white"
                            onChange={handleStatusChange}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Status</option>
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Reset Filters Button */}
                    
                </div>
            )}
        </div>
    );
}
