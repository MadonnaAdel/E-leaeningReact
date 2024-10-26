/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { LuSubtitles } from "react-icons/lu";
import { getContentType, SectionItemValues } from "../utils/utilities";

interface ContentViewerProps {
    index: number;
    sectionItems:SectionItemValues[];
}

export default function ContentViewer({
    index,
    sectionItems,
}: ContentViewerProps): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState<number>(index);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < sectionItems.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const type = getContentType(sectionItems[currentIndex].path);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [currentIndex]);

    return (
        <div className="h-[80dvh] flex flex-col items-center justify-center gap-8 bg-violet-50 px-4 py-6 rounded-md dark:bg-stone-900">
            <h2 className="flex items-center gap-3 text-center bg-white w-fit border rounded-md px-2 py-3 mx-auto sm:text-3xl dark:bg-black dark:text-white dark:border-stone-700">
                <LuSubtitles />
                {sectionItems[currentIndex].title}
            </h2>

            <div className="flex items-center gap-6 w-[70dvw] sm:w-[60dvw] md:w-[50dvw]  lg:w-[40dvw]">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="ms-auto p-1 rounded-md bg-stone-100 dark:bg-stone-800"
                    aria-label="previous item"
                >
                    <GrPrevious className="text-xl text-violet-500 sm:text-4xl" />
                </button>

                {type === "video" && (
                    <video
                        controls
                        autoPlay
                        className="mx-auto w-[80%] sm:w-[60%] "
                        ref={videoRef}
                    >
                        <source src={sectionItems[currentIndex].path} />
                    </video>
                )}

                {type === "pdf" && (
                    <embed
                        src={sectionItems[currentIndex].path}
                        className="w-[50dvw] h-[75dvh] py-6"
                    />
                )}

                {type === "image" && (
                    <img
                        src={sectionItems[currentIndex].path}
                        className="objct-cover w-[80%]   "
                    />
                )}

                {
                    type === "word" && (
                        <iframe
                            src={sectionItems[currentIndex].path}
                            className="w-[50dvw] h-[75dvh] py-6"
                        />
                    )
                }
                <button
                    onClick={handleNext}
                    disabled={currentIndex === sectionItems.length - 1}
                    className="me-auto p-1 rounded-md bg-stone-100 dark:bg-stone-800"
                    aria-label="next item"
                >
                    <GrNext className="text-xl text-violet-500 sm:text-4xl" />
                </button>
            </div>
        </div>
    );
}
