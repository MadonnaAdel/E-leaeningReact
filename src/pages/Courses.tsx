import { useEffect, useState } from "react";
import Filter from "../ui/Filter";
import Search from "../ui/Search";
import { getCategory } from "../utils/apiCategory";
import ErrorMessage from "../ui/ErrorMessage";
import { useAuth } from "../contexts/AuthContext";
import CoursesList from "../features/courses/CoursesList";
const statusOptions = [
    { value: '1', text: 'Upcoming' },
    { value: '3', text: 'Ongoing' },
    { value: '2', text: 'Complated' },
];
export default function Courses() {
    const [searchTerm, setSearchTerm] = useState(""); 
    const [stateFilterTerm, setStateFilterTerm] = useState(""); 
    const [categoryFilterTerm, setCategoryFilterTerm] = useState(""); 
    const [categoryOptions, setCategoryOptions] = useState([]);
    const { user } = useAuth();
  
    const handleSearch = (query: string) => {
        setSearchTerm(query);
    };
    const handleStateFilter= (query: string) => {
        setStateFilterTerm(query);
    };
    const handleCategoryFilter= (query: string) => {
        setStateFilterTerm(query);
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategory(user.token);
                setCategoryOptions(data);
            } catch (err) {
                <ErrorMessage message={"some thing wrong"} />;
            }
        };
        fetchCategories();
    }, []); 
    return (
        <div className="py-12 flex flex-col gap-6">
            <div className="flex flex-col gap-4 px-8 py-4 sm:flex-row sm:justify-between sm:items-center w-[95%] mx-auto">
                <Search onSearch={handleSearch} />
                <Filter categoryOptions={categoryOptions} statusOptions={statusOptions} onStateFilter={handleStateFilter} onCategoryFilter={handleCategoryFilter} />
            </div>
            <CoursesList searchTerm={searchTerm} stateTerm={stateFilterTerm} catTerm={categoryFilterTerm } />
        </div>
    );
}
