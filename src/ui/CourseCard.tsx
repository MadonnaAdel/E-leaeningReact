import { Link } from "react-router-dom";
import EnrollButton from "./EnrollButton";
import { Course } from "../utils/utilities";
import { useMutation } from "@tanstack/react-query";
import { enrollCourse, unEnrollCourse } from "../utils/apiCourses";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function CourseCard({ courseId, pictureUrl, courseName, description, instructor, courseTiming }: Partial<Course>) {
    const { user } = useAuth();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const enrollMutation = useMutation({
        mutationFn: enrollCourse,
        onSuccess: () => {
            updateLocalStorage(Number(courseId), true);
            toast.success('Successfully enrolled in the course');
            setIsEnrolled(true);
        },
        onError: () => {
            toast.error('Failed to enroll in the course');
        }
    });

    const unenrollMutation = useMutation({
        mutationFn: unEnrollCourse,
        onSuccess: () => {
            updateLocalStorage(Number(courseId), false);
            setIsEnrolled(false);
            toast.success('Successfully unenrolled from the course');
        },
        onError: () => {
            toast.error('Failed to unenroll from the course');
        }
    });

    useEffect(() => {
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        const isEnrolled = enrolledCourses.includes(courseId);

        setIsEnrolled(isEnrolled);
    }, [courseId]);

    const updateLocalStorage = (courseId: number, isEnrolled: boolean) => {
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        if (isEnrolled) {
            if (!enrolledCourses.includes(courseId)) {
                enrolledCourses.push(courseId);
            }
        } else {
            const index = enrolledCourses.indexOf(courseId);
            if (index > -1) enrolledCourses.splice(index, 1);
        }
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    };

    const handleToggleEnrollment = () => {
        if (!user) {
            toast.dismiss('You must be logged in to manage course enrollment');
            return;
        }

        if (user.studentId === null || user.studentId === undefined) {
            toast.error('Student ID is missing.');
            return;
        }

        if (courseId !== undefined && typeof courseId === "number") {
            const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
            const isEnrolled = enrolledCourses.includes(courseId);

            if (isEnrolled) {
                unenrollMutation.mutate({ courseId: Number(courseId), studentId: user.studentId, token: user.token });
            } else {
                enrollMutation.mutate({ courseId: Number(courseId), studentId: user.studentId, token: user.token });
            }
        } else {
            toast.error('Course ID is missing or invalid.');
        }
    };

    return (
        <li className="flex flex-col bg-white rounded-md border border-stone-100 shadow-sm overflow-hidden relative dark:bg-black dark:border-black ">

            <div className={`bage absolute p-1 rounded-md top-3 left-3 text-xs
    ${courseTiming === 2 ? 'bg-gray-100 text-gray-500 border border-gray-500' :
                courseTiming === 1 ? 'bg-purple-100 text-purple-500 border border-purple-500' :
                        courseTiming === 3 ? 'bg-green-100 text-green-500 border border-green-300' : ''}`}>
                {courseTiming === 2 ? (
                    <span>Completed</span>
                ) : courseTiming === 1 ? (
                    <span>Up Coming</span>
                ) : courseTiming === 3 ? (
                    <span>On Going</span>
                ) : null}
            </div>

            <img src={pictureUrl} alt={description} className="w-[100%] h-auto aspect-video object-cover dark:bg-black" />
            <div className="p-2 flex flex-1 flex-col gap-2 ">
                <h2 className="text-violet-600 font-semibold dark:text-violet-200">{courseName}</h2>
                <p className="text-sm text-stone-600 overflow-hidden text-ellipsis whitespace-nowrap dark:text-stone-50">{description}</p>
                <p className="text-sm text-stone-600 font-bold dark:text-stone-50">{instructor?.fName} {instructor?.lName}</p>

                <div className="flex items-center justify-between">
                    {
                        user?.studentId &&    <EnrollButton
                        onClick={handleToggleEnrollment}
                        isDisabled={enrollMutation.isPending || unenrollMutation.isPending}
                        isEnrolled={isEnrolled}
                    />
                    }
                 
                    <Link to={`${courseId}`} className="text-violet-600 font-semibold dark:text-violet-200">Show details</Link>
                </div>
            </div>
        </li>
    );
}
