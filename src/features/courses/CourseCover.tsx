import { IoMdArrowBack } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface CourseCoverProps {
    image: string,
    title: string,
    description: string,
    onExplore: () => void
}

const isVideoUrl = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
};

export default function CourseCover({ image, title, description, onExplore }: CourseCoverProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="px-4 py-8 sm:py-12 sm:px-8 sm:w-[85%] sm:mx-auto">
            <h1 className="flex items-center gap-2 text-xl text-violet-600 dark:text-violet-200">
                <TbListDetails /> <span>Course details</span>
            </h1>

            <div className="flex flex-wrap-reverse items-center gap-4 py-12 sm:gap-8 md:flex-nowrap">
                <div className=" w-1/4 h-auto mx-4">
                    <h2 className="  md:text-3xl lg:text-5xl w-fit">{title}</h2>
                    <p className="text-xl lg:text-3xl">{description}</p>
                </div>

                {isVideoUrl(image) ? (
                    <video
                        src={image}
                        controls
                        className=" rounded-lg sm:w-[46rem] bg-black"
                        width={20}
                        autoPlay
                    />
                ) : (
                    <img
                        src={image}
                        alt={description}
                        className="w-full rounded-lg sm:w-[46rem]"
                    />
                )}
            </div>

            <div className="flex items-center gap-4 text-stone-200 sm:gap-6">
                <button
                    className="flex items-center gap-2 py-2 px-3 border rounded-full bg-stone-50 text-violet-600 dark:bg-stone-800 dark:text-violet-200 dark:border-0"
                    onClick={() => navigate(-1)}
                >
                    <IoMdArrowBack />
                    <span> Back</span>
                </button>
                <button
                    onClick={onExplore}
                    className="py-2 px-3 border rounded-full bg-stone-50 text-violet-600 dark:bg-stone-800 dark:text-violet-200 dark:border-0"
                >
                    Start Exploring
                </button>
            </div>
        </div>
    );
}
