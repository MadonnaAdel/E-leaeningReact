import { PiMoney } from "react-icons/pi";
import EnrollButton from "./EnrollButton";
import InfoItem from "./InfoItem";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { enrollCourse, unEnrollCourse } from "../utils/apiCourses";

export interface CourseInfoProps{
    enrollments: number;
    quizzes: number;
    totalItems: number;
    courseId?: number;
}

export default function CourseInfo({ enrollments, quizzes, totalItems, courseId }: CourseInfoProps): JSX.Element {
    const { user } = useAuth();
    const [isEnrolled, setIsEnrolled] = useState(false);

    const enrollMutation = useMutation({
        mutationFn: enrollCourse,
        onSuccess: () => {
            updateLocalStorage(Number(courseId), true);
            console.log(courseId);
            
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
        }else if (user.studentId === null || user.studentId === undefined) {
            toast.error('Student ID is missing.');
            return;
        }else if (courseId !== undefined && typeof courseId === "number") {
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
        <div className="p-2 h-fit flex flex-col gap-3 bg-white border border-violet-600 rounded-md dark:bg-black sm:w-[18rem]">
            <h3 className="flex items-center gap-2 font-semibold text-xl text-violet-600 dark:text-violet-200"> <PiMoney /> Free</h3>
            {user.studentId && <EnrollButton
                onClick={handleToggleEnrollment}
                isDisabled={enrollMutation.isPending || unenrollMutation.isPending}
                isEnrolled={isEnrolled}
            />
            }
            <div className="flex flex-col gap-2 dark:text-white">
                <InfoItem label="Enrolled" value={enrollments || 0} />
                <InfoItem label="Lectures" value={totalItems} />
                <InfoItem label="Quizzes" value={quizzes} />
            </div>
        </div>
    );
}
