import ContentTable from "../../ui/ContentTable";
import CourseInfo, { CourseInfoProps } from "../../ui/CourseInfo";
import InstructorCard from "../../ui/InstructorCard";
import { Instructor, Section } from "../../utils/utilities";

interface CourseContentProps extends CourseInfoProps {
    sections: Section[];
    instructor: Instructor;
    totalItems: number;
}

export default function CourseContent({ sections, instructor, enrollments, quizzes, totalItems, courseId }: CourseContentProps) {


    return (
        <div className="px-4 py-8 flex flex-col justify-between gap-10 lg:grid lg:grid-cols-[1fr_auto] xl:gap-16 sm:py-12 sm:px-8 sm:w-[85%] sm:mx-auto">
            <ContentTable sections={sections} courseId={Number(courseId)} />
            <div className="flex flex-col gap-8 md:flex-row lg:flex-col">
                <CourseInfo enrollments={enrollments} quizzes={quizzes} totalItems={totalItems} courseId={courseId}/>
                <InstructorCard instructor={instructor} />
            </div>
        </div>
    );
}
