import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import AddCourseForm from "../features/courses/AddCourseForm";
import { addCourse } from "../utils/apiCourses";
import { Course } from "../utils/utilities";
export default function AddCourse() {
    const navigate = useNavigate();


    return (
        <div className="p-6 flex flex-col gap-6 md:p-12">
            <div className="flex items-center gap-4 ">
                <button onClick={() => navigate(-1)} className="bg-white p-2 rounded-full border border-stone-200 dark:bg-black dark:text-white dark:border-stone-400">
                    <IoArrowBackSharp className="text-xl " />
                </button>

                <h2 className="text-lg  font-bold sm:text-2xl dark:text-white">Add new course</h2>
            </div>

            <AddCourseForm  />
        </div>
    )
}
