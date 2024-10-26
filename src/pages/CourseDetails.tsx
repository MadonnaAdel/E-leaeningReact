import { useParams } from "react-router-dom";
import CourseCover from "../features/courses/CourseCover";
import CourseContent from "../features/courses/CourseContent";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../utils/apiCourses"; 
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";
import { getCourseItems } from "../utils/apiContentItems";

export default function CourseDetails(): JSX.Element {
    const { courseId } = useParams();
    const contentRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    if (!courseId) {
        return <ErrorMessage message="Course ID is missing from URL." />;
    }

    const { data: course, isLoading: courseLoading, isError: isCourseError, error: courseError } = useQuery({
        queryKey: [`course/${courseId}`], 
        queryFn: () => getCourseById(courseId), 
    });

    const { data: totalItems, isLoading, isError, error } = useQuery({
        queryKey: [`courseItems/${courseId}`],
        queryFn: () => getCourseItems(Number(courseId)),
        enabled: !!courseId, 
    });

    const scrollTo = () => {
        contentRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    useEffect(() => {
        if (pageRef.current) {
            pageRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, []);

    if (isLoading || courseLoading) {
        return <div className="flex items-center justify-center mt-24"><Spinner /></div>;
    }

    if (isCourseError) {
        return <ErrorMessage message={courseError?.message || "Failed to load course data."} />;
    }

    if (!course || !course.courseId) {
        return <ErrorMessage message="Course data is missing." />;
    }

    const { contentItems, instructor, enrollments, quizzes } = course;

    return (
        <div ref={pageRef}>
            <div className="bg-white bg-gradient-to-b from-white to-violet-600 dark:from-stone-900 dark:to-violet-600 dark:text-stone-100 sm:py-12">
                <CourseCover
                    image={course?.pictureUrl || ''}
                    title={course?.courseName || ''}
                    description={course?.description || ''}
                    onExplore={scrollTo}
                />
            </div>

            <div className="min-h-[100dvh]" ref={contentRef}>
                <CourseContent
                    instructor={instructor}
                    sections={contentItems}
                    enrollments={enrollments}
                    quizzes={quizzes.length}
                    totalItems={totalItems} 
                    courseId={course.courseId} 
                />
            </div>
        </div>
    );
}
