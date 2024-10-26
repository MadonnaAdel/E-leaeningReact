import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Menu from "./Menu";
import Modal, { ModalContext } from './Modal';
import DeleteConfirem from "./DeleteConfirem";
import { Course } from "../utils/utilities";
import { useAuth } from "../contexts/AuthContext";
import { deleteCourse } from "../utils/apiCourses";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AddCourseForm from "../features/courses/AddCourseForm";
import UpdateCourseForm from "./UpdateCourseForm";

interface EnrolledCourseProps extends Course { }

export default function EnrolledCourse({
    courseId,
    pictureUrl,
    category,
    courseTiming,
    courseName,
    description,
}: EnrolledCourseProps): JSX.Element {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { close } = useContext(ModalContext);

    const isInstructor = !!user.instructorId;

    const isVideoUrl = (url: string) => {
        return url.match(/\.(mp4|webm|ogg)$/i);
    };

    const deleteCourseHandler = async () => {
        try {
            await deleteCourse(courseId, user.token);
            queryClient.invalidateQueries();
            close();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <li className="flex flex-col gap-1 bg-white rounded-md border border-stone-100 shadow-sm overflow-hidden relative dark:border-stone-800 dark:bg-black">
            {isVideoUrl(pictureUrl) ? (
                <video
                    src={pictureUrl}
                    controls
                    className="w-full object-cover aspect-video"
                />
            ) : (
                <img
                    src={pictureUrl}
                    alt={description}
                    className="w-full object-cover aspect-video"
                />
            )}
            <div className="p-2 flex flex-1 flex-col gap-1">
                <h2 className="text-violet-600 text-sm font-semibold dark:text-violet-200">
                    {courseName}
                </h2>
                <p className="text-xs dark:text-stone-300 overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>

                <Link
                    to={`/courses/${courseId}`}
                    className="px-2 text-sm flex justify-end items-center gap-1 py-1 text-violet-600 dark:text-violet-200"
                >
                    <span>Go to course</span>
                    <FaLongArrowAltRight className="mt-1" />
                </Link>
            </div>

            {isInstructor && (
                <div className="absolute top-2 right-2 bg-white text-violet-600 rounded-md dark:bg-stone-800 dark:text-violet-200">
                    <Menu.Toggler id={String(courseId)} />

                    <Menu.List id={String(courseId)}>
                        <Menu.Option id={String(courseId)}>
                            <Modal.Open name="update-course">
                                <FaRegEdit />
                                <span className="text-xs">Update Course</span>
                            </Modal.Open>

                            <Modal.Window name="update-course">
                                <UpdateCourseForm
                                    courseId={courseId}
                                    initialData={{
                                        courseName,
                                        description,
                                        category: Number(category), 
                                        courseTiming: courseTiming, 
                                        imgUrl: pictureUrl
                                    }}
                                />
                            </Modal.Window>
                        </Menu.Option>
                        <Menu.Option id={String(courseId)}>
                            <Modal.Open name="delete-course">
                                <RiDeleteBin5Line />
                                <span className="text-xs">Delete Course</span>
                            </Modal.Open>

                            <Modal.Window name="delete-course">
                                <DeleteConfirem
                                    label="Course"
                                    title={courseName}
                                    onCancel={close}
                                    onConfirm={deleteCourseHandler}
                                    courseId={courseId}
                                />
                            </Modal.Window>
                        </Menu.Option>
                    </Menu.List>
                </div>
            )}
        </li>
    );
}
