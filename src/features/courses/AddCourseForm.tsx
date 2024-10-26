
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";
import { OptionCat, Optionstate } from "../../ui/Filter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getCategory } from "../../utils/apiCategory";
import toast from "react-hot-toast";
import { addCourse } from "../../utils/apiCourses";
import { CiImageOn } from "react-icons/ci";

export default function AddCourseForm() {
    const statusOptions: Optionstate[] = [
        { value: '1', text: 'Upcoming' },
        { value: '3', text: 'Ongoing' },
        { value: '2', text: 'Completed' },
    ];

    const { user } = useAuth();
    const [categoryOptions, setCategoryOptions] = useState<OptionCat[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [courseData, setCourseData] = useState({
        courseName: '',
        category: 0,
        courseTiming: 0,
        description: '',
        img: null as File | null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategory(user.token);
                setCategoryOptions(data);
            } catch (err) {
                setErrorMessage("Something went wrong while fetching categories.");
            }
        };
        fetchCategories();
    }, [user.token]);

    const handleCategoryFilter = (categoryId: number) => {
        setCourseData(prev => ({ ...prev, category: categoryId }));
    };

    const handleStateFilter = (query: number) => {
        setCourseData(prev => ({ ...prev, courseTiming: query }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCourseData({
                ...courseData,
                img: e.target.files[0],
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!courseData.img || !courseData.courseName || !courseData.description) {
            toast.error("Please fill in all required fields and upload an image or video.");
            return;
        }

        try {
            const result = await addCourse(
                courseData.courseName,
                user.instructorId,
                courseData.category,
                user.token,
                courseData.description,
                courseData.courseTiming,
                courseData.img
            );
            toast.success('Course added successfully! your course will be pending untill admin approve it');
            navigate(`/courses/${result.courseId}`);
        } catch (error: any) {
            console.error('Error occurred during course addition:', error);
            toast.error('Something went wrong while adding the course.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-[95%] mx-auto bg-white p-4 rounded-lg shadow-sm dark:bg-black sm:w-[26rem]"
        >
            <h3 className="font-semibold text-lg text-center dark:text-white">Course Info</h3>
            <input
                type="text"
                placeholder="Course Title"
                name="courseName"
                className="p-2 w-full rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900"
                onChange={handleChange}
            />

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2 dark:text-white">Category</label>
                <select
                    className="w-full bg-white p-2 rounded-md border border-stone-200 focus:outline-none dark:bg-black dark:border-stone-800 dark:text-white"
                    onChange={(e) => handleCategoryFilter(Number(e.target.value))}
                    defaultValue=""
                >
                    <option value="" disabled>Select Category</option>
                    {categoryOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                <select
                    className="w-full bg-white p-2 rounded-md border border-stone-200 focus:outline-none dark:bg-black dark:border-stone-800 dark:text-white"
                    onChange={(e) => handleStateFilter(Number(e.target.value))}
                    defaultValue=""
                >
                    <option value="" disabled>Select Status</option>
                    {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>

            <textarea
                placeholder="Write Course Description"
                className="p-2 w-full h-[6rem] rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900"
                name="description"
                onChange={handleChange}
            />

            <label htmlFor="image" className="flex items-center gap-2 p-2 rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900 dark:text-white">
                <CiImageOn className="text-xl" />
                <span className="text-sm">Upload Course Image or video</span>
                <input type="file" accept="image/*,video/*" id="image" hidden onChange={handleFileChange} />
            </label>

            {errorMessage && <ErrorMessage message={errorMessage} />}

            <Button>Add Course</Button>
        </form>
    );
}

