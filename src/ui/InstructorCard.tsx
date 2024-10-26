import { LiaVideoSolid } from "react-icons/lia";
import { Instructor } from "../utils/utilities";

export default function InstructorCard({instructor}:{instructor:Instructor}): JSX.Element {
    const {fName, lName, pictureUrl,numOfCrs, aboutYou } = instructor;
    return (
        <div className="flex flex-col flex-1 gap-3 bg-white py-4 px-2 border rounded-md shadow-sm sm:w-[18rem] dark:bg-black dark:border-stone-700">
            <h3 className="font-semibold text-xl pb-2 border-b dark:text-white dark:border-b-stone-700">
                Instructor
            </h3>

            <div className="flex flex-col gap-4  p-4">
                <img
                    src={pictureUrl}
                    alt="instructor profile picture"
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                />

                <div className="flex flex-col gap-3 dark:text-white">
                    <h3 className="font-bold text-xl ">{fName + lName}</h3>
                    <p className="flex items-center gap-2 "><LiaVideoSolid className="text-xl" /><span>{numOfCrs} Courses</span></p>
                    <p className="text-sm  text-stone-500 dark:text-stone-200">
                       {aboutYou}
                    </p>
                </div>
            </div>
        </div>
    );
}
