
import { useQuery } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";
import EnrolledCourse from "../../ui/EnrolledCourse";
import Menu from "../../ui/Menu";
import Modal from '../../ui/Modal';
import AddCourseForm from "../courses/AddCourseForm";
import { Course } from "../../utils/utilities";
import { getEnrolledCourses } from "../../utils/apiCourses";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../../ui/Spinner";
import ErrorMessage from "../../ui/ErrorMessage";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getInstructorCourses } from "../../utils/apiInstructor";

export default function UserCourses() {
    const { user } = useAuth();

    const fetchCourses = () => {
        if (user.instructorId) {
            return getInstructorCourses(user.instructorId, user.token);
        }
        return getEnrolledCourses({ studentId: Number(user.studentId), token: user.token });
    };

    const { data: courses, isLoading, error, isError } = useQuery({
        queryKey: ['user-courses'],
        queryFn: fetchCourses,
        enabled: !!user.studentId || !!user.instructorId,
    });

    const isStudent = !!user.studentId;
    const isInstructor = !!user.instructorId;

    if (isLoading) return <div className="flex justify-center"><Spinner /></div>;
    if (isError) return <ErrorMessage message={error?.message} />;

    return (
        <Menu>
            <Modal>
                <div className="p-6 sm:p-12 h-[85dvh] overflow-auto scrollbar-hidden">
                    <h2 className="text-lg font-bold mb-6 sm:text-2xl dark:text-white">
                        {isStudent ? (
                            <h2>Courses You're Enrolled In</h2>
                        ) : (
                            <div className="flex items-center justify-between ">
                                <div className="mr-2">Your Courses</div>
                                <div className="">
                                    <Modal.Open name="add-course">
                                        <span className="p-2 mt-2 bg-violet-600 text-white text-xl rounded-full shadow-lg cursor-pointer z-[9] flex items-center">
                                            <FiPlus />
                                            <div className="ml-2">Add Course</div>
                                        </span>
                                    </Modal.Open>
                                </div>
                            </div>
                        )}
                    </h2>
                    {isInstructor &&
                        <Sepretor title="Courses Approved" />

}
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
                        {courses
                            ?.filter((course: Course) => course.status === 1) 
                            .map((course: Course) => (
                                <EnrolledCourse key={course.courseId} {...course} />
                            ))
                        }

                        {!courses?.length && (
                            <p className="text-sm dark:text-white">
                                {isStudent ? (
                                    <span>
                                        <div>
                                            Start learning by enrolling in some courses
                                        </div>
                                        <span className="flex items-center gap-2 text-violet-600 dark:text-violet-200">
                                            <FaLongArrowAltRight />
                                            <Link to={'/courses'}>Go to courses</Link>
                                        </span>
                                    </span>
                                ) : (
                                    <span>No courses found. Consider adding your courses.</span>
                                )}
                            </p>
                        )}
                    </ul>

                    {isInstructor && (
                        <>
                            <Sepretor title="Courses Pending" />
                            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
                                {courses
                                    ?.filter((course: Course) => course.status === 0) 
                                    .map((course: Course) => (
                                        <EnrolledCourse key={course.courseId} {...course} />
                                    ))
                                }
                            </ul>
                        </>
                    )}

                    {isInstructor && (
                        <>
                            <Sepretor title="Courses Canceled" />
                            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
                                {courses
                                    ?.filter((course: Course) => course.status === 2) 
                                    .map((course: Course) => (
                                        <EnrolledCourse key={course.courseId} {...course} />
                                    ))
                                }
                            </ul>
                        </>
                    )}

                    {isInstructor && (
                        <>
                            <Modal.Window name="add-course">
                                <AddCourseForm />
                            </Modal.Window>
                        </>
                    )}
                </div>
            </Modal>
        </Menu>
    );
}
interface SepretorProps {
    title: string;
}

export function Sepretor({ title }: SepretorProps) {
    return (
        <div className="bg-slate-200 p-2 my-5 rounded-lg">
            <h1 className="text-xl text-slate-500 text-center">{title}</h1>
        </div>
    );
}