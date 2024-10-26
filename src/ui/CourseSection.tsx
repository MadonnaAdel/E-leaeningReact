import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { BsDatabaseAdd } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import Menu from "./Menu";
import SectionItem from "./SectionItem";
import ErrorMessage from "./ErrorMessage";
import { getSectionById } from "../utils/apiSections";
import { useAuth } from "../contexts/AuthContext";
import { getInstructorCourses } from "../utils/apiInstructor";
import { Course, Section } from "../utils/utilities";
import { addContentTypeFile, deletesection } from "../utils/apiContentItems";
import toast from "react-hot-toast";

interface CourseSectionProps {
    section: Section;
    id: string;
    courseId: number;
}

export default function CourseSection({ section, id, courseId }: CourseSectionProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const [isAddingContent, setIsAddingContent] = useState(false);
    const [contentType, setContentType] = useState<"link" | "file" | null>(null);
    const [link, setLink] = useState("");
    const [titleContent, setTitleContent] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const { data: sectionItems, isLoading: isSectionLoading, isError: isSectionError, error: sectionError } = useQuery({
        queryKey: [`section/${id}`],
        queryFn: () => getSectionById(Number(id)),
    });

    const { user } = useAuth();

    const { data: instructorCourses, isLoading: isCoursesLoading, isError: isCoursesError, error: coursesError } = useQuery({
        queryKey: [`user-course`],
        queryFn: () => getInstructorCourses(Number(user.instructorId), user.token),
        enabled: !!user.instructorId,
    });

    if (isSectionError) console.error("Section error:", sectionError);
    if (isCoursesError) console.error("Courses error:", coursesError);

    function isMyCourse() {
        return instructorCourses?.some((course: Course) => course.courseId === courseId);
    }

    function addContent() {
        setIsAddingContent((prev) => !prev);
    }

    function handleContentTypeSelect(type: "link" | "file") {
        setContentType(type);
    }

    async function handleAddContentSubmit() {
        if (contentType === "link" && link) {
            console.log("Add external link:", link);
        } else if (contentType === "file" && file) {
            const titleContent = "Your Title Here"; 
            console.log("Add file:", file, titleContent);

            try {
                const res = await addContentTypeFile({
                    title: titleContent,
                    contentId:Number(id),
                    attachment: file,
                    token: user.token,
                });
                console.log("Upload Response:", res);

            } catch (error) {
                console.error("Error adding file:", error);
            }
        }
        setContentType(null);
        setLink("");
        setFile(null);
        setIsAddingContent(false);
    }
    async function deleteSection() {
        const result = await deletesection(section.contentId, user.token);
        toast.success("Section deleted successfully");
    }

    return (
        <div className="py-4 w-full gap-4 border-b last:border-0 dark:border-b-stone-700 dark:text-white">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
                <div className="flex items-center gap-3">
                    <IoIosArrowUp className={`${open ? 'rotate-180' : ''} transition-transform`} />
                    <h4 className="font-semibold text-md">{section.title}</h4>
                </div>
                {user?.instructorId && isMyCourse() && (
                    <div className="relative">
                        <Menu.Toggler id={id} />
                        <Menu.List id={id} className="border shadow-sm dark:border-stone-700">
                            <Menu.Option id={id}>
                                <BsDatabaseAdd />
                                <button className="text-xs" onClick={addContent}>Add Content</button>
                            </Menu.Option>
                            <Menu.Option id={id}>
                                <FaRegEdit />
                                <span className="text-xs">Update Section</span>
                            </Menu.Option>
                            <Menu.Option id={id}>
                                <RiDeleteBin5Line />
                                <button className="text-xs text-red-600" onClick={deleteSection}>Delete Section</button>
                            </Menu.Option>
                        </Menu.List>
                    </div>
                )}
            </div>

            {isAddingContent && (
                <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="flex gap-4 mb-3">
                        <button onClick={() => handleContentTypeSelect("link")} className="w-1/2 rounded-md border border-violet-500 p-2 text-violet-500">Add Link</button>
                        <button onClick={() => handleContentTypeSelect("file")} className="w-1/2 rounded-md border border-violet-500 p-2 text-violet-500">Upload File</button>
                    </div>
                    {contentType === "link" && (
                        <input
                            type="text"
                            placeholder="Enter external link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full mb-3 p-2 border rounded-md"
                        />
                    )}
                    {contentType === "file" && (
                        <>
                            <input
                                type="text"
                                className="w-full mb-3 p-2 border rounded-md"
                                placeholder="Enter content title"
                                onChange={(e)=>setTitleContent(e.target.value)}
                            />
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                className="w-full mb-3 p-2 border rounded-md"
                            />
                        </>
                    )}
                    <button onClick={handleAddContentSubmit} className="w-full bg-violet-600 text-white p-2 rounded-md">
                        Add Content
                    </button>
                </div>
            )}

            {open && (
                <div className="flex flex-col gap-4 mt-4">
                    {isSectionLoading ? (
                        <p>Loading...</p>
                    ) : isSectionError ? (
                        <ErrorMessage message={sectionError.message} />
                    ) : (
                        sectionItems?.map((item: any, index: number) => (
                            <SectionItem key={item.contentId} index={index} {...item} sectionItems={sectionItems} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
