import Fuse from "fuse.js";
import { Course } from "../../utils/utilities";
import { useEffect, useState } from "react";
import CourseCard from "../../ui/CourseCard";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import useCourses from "./useCourses";

interface CoursesListProps {
    searchTerm: string;
    stateTerm: string;
    catTerm: string;
}

export default function CoursesList({ searchTerm, stateTerm ,catTerm}: CoursesListProps) {
    const { data: courses, isLoading, isError, error } = useCourses();
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    useEffect(() => {
        if (courses) {
            let updatedCourses = courses;

            if (searchTerm) {
                const fuse = new Fuse(courses, {
                    keys: ["title", "description"],
                    threshold: 0.3,
                });
                const result = fuse.search(searchTerm);
                updatedCourses = result.map((res) => res.item as Course);
            }
            if (stateTerm) {
                updatedCourses = updatedCourses.filter((res: Course) => { 
                    return res.courseTiming === Number(stateTerm);
                });
            }
            if (catTerm) {
                updatedCourses = updatedCourses.filter((res: Course) => { 
                    return res.category === catTerm;
                });
            }

            setFilteredCourses(updatedCourses);
        }
    }, [searchTerm, stateTerm, courses]);

    if (isLoading) return <Spinner />;
    if (isError) return <ErrorMessage message={error?.message} />;

    return (
        <>
            {filteredCourses.length > 0 ? (
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-8 w-[95%] mx-auto">
                    {filteredCourses.map((course: Course) => (
                        <CourseCard key={course.courseId} {...course} />
                    ))}
                </ul>
            ) : (
                <p className="text-center text-lg dark:text-white">No courses match your search.</p>
            )}
        </>
    );
}
