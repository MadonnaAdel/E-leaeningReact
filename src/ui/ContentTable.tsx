import { FiPlus } from "react-icons/fi";
import { Section } from "../utils/utilities";
import Button from "./Button";
import CourseSection from "./CourseSection";
import Menu from "./Menu";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddCourseSection } from "../utils/apiContentItems";

interface ContentTableProps {
    sections: Section[];
    courseId: number;
}

export default function ContentTable({ sections, courseId }: ContentTableProps): JSX.Element {
    console.log(sections)
    return (
        <Menu>
            <Modal>
                <div className="p-6 h-fit bg-white border rounded-md dark:bg-black dark:border-stone-700">
                    <div className="flex justify-between items-center">
                        <h3 className="pb-2 text-xl font-bold text-stone-800 border-b dark:text-stone-100 dark:border-stone-700 block">Course Content</h3>
                        <div className="">
                            <Modal.Open name="add-section">
                                <span className="p-2 mt-2 bg-violet-600 text-white rounded-full shadow-lg cursor-pointer  flex items-center">
                                    <FiPlus />
                                    <div className="ml-2">Add Section</div>
                                </span>
                            </Modal.Open>
                        </div>
                    </div>

                    {sections?.map((section: Section) => (
                        <CourseSection key={section.contentId} section={section} id={String(section.contentId)} courseId={courseId} />
                    ))}
                </div>

                <Modal.Window name="add-section">
                    <AddCourseSectionForm courseId={courseId} /> 
                </Modal.Window>
            </Modal>
        </Menu>
    );
}

interface AddCourseSectionFormProps {
    courseId: number; 
}

function AddCourseSectionForm({ courseId }: AddCourseSectionFormProps) {
    const { user } = useAuth();
    const [courseSection, setCourseSection] = useState(''); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseSection(e.target.value); 
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!courseSection) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const result = await AddCourseSection(courseSection, courseId, user.token);
            console.log(result);
            if(result) toast.success('Course Section added successfully!'); 
        } catch (error: any) {
            console.error('Error occurred during course addition:', error);
            toast.error('Something went wrong while adding the course.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-[95%] mx-auto bg-white p-4 rounded-lg shadow-sm dark:bg-black sm:w-[26rem]"
        >
            <h3 className="font-semibold text-lg dark:text-white">Section Title</h3>
            <input
                type="text"
                name="courseName"
                className="p-2 w-full rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900"
                onChange={handleChange}
            />
            <Button>Add Course Section</Button>
        </form>
    );
}
