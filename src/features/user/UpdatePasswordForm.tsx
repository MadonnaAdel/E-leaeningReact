import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { updatePassword } from "../../utils/apiUser";
import { useAuth } from "../../contexts/AuthContext";
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{9,20}$/;

type FormValues = {
    currentPassword:string
    password: string;
    confirmPassword: string;
};

export default function UpdatePasswordForm(): JSX.Element {
    const [show, setShow] = useState(false);
    const {user}= useAuth()
    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            currentPassword: "",
            password: '',
            confirmPassword: ''
        }
    });


    const password = watch('password');
    const currentPassword = watch('currentPassword');

    const handleSubmitForm: SubmitHandler<FieldValues> = (data) => {
        const role = user.studentId !== null ? 'student': user.instructorId !== null ? 'instructor' : 'admin';
    const userId = user.studentId || user.instructorId || user.adminId;
        updatePassword(role,userId as number,password,currentPassword,user.token)
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-3 flex-1 bg-white p-4 rounded-md shadow-sm dark:bg-black">
            <h2 className="text-violet-600 text-xl font-bold mb-3 dark:text-violet-200">Account Password</h2>

            <div>
                <div className="relative">
                    <input
                        type={`${show ? 'text' : 'password'}`}
                        placeholder=" Current Password"
                        className="mb-4 p-2 w-full rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3  dark:border-black dark:bg-stone-900"
                        {...register("currentPassword", {
                            required: "Password is required",
                            minLength: { value: 9, message: "Password min length is 9" },
                            maxLength: { value: 20, message: "Password max length is 20" },
                            pattern: { value: PASSWORD_REGEX, message: 'Password must contains at lest one upper, one lower and one none alphabetic' }
                        })}
                    />
                    <input
                        type={`${show ? 'text' : 'password'}`}
                        placeholder=" New Password"
                        className="p-2 w-full rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3  dark:border-black dark:bg-stone-900"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 9, message: "Password min length is 9" },
                            maxLength: { value: 20, message: "Password max length is 20" },
                            pattern: { value: PASSWORD_REGEX, message: 'Password must contains at lest one upper, one lower and one none alphabetic' }
                        })}
                    />
                    <button type="button" className="absolute top-3 right-3" onClick={() => setShow(state => !state)}>
                        {show ? <GoEyeClosed /> : <RxEyeOpen />}
                    </button>
                </div>

                {typeof errors.password?.message === "string" && (
                    <p className="text-sm mt-1 text-red-700">
                        *{errors.password.message}
                    </p>
                )}
            </div>

            <div>
                <div className="relative">
                    <input
                        type={`password`}

                        placeholder="Confirm Password"
                        className="p-2 w-full rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 dark:border-black dark:bg-stone-900"
                        {...register("confirmPassword", {
                            required: "You must confirm password",
                            validate: function (value: string): boolean | string {
                                return value === password || 'This does not match password';
                            }
                        })}
                    />

                </div>

                {typeof errors.confirmPassword?.message === "string" && (
                    <p className="text-sm mt-1 text-red-700">
                        *{errors.confirmPassword?.message}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-end gap-4 text-sm sm:text-base mt-3">
                <button className="bg-white rounded p-2 border border-stone-300 hover:bg-stone-50 transition-colors dark:bg-stone-800 dark:border-stone-900 dark:text-stone-50 dark:hover:bg-stone-900" type="button" onClick={() => reset()}>Cancel</button>

                <button className="p-2 rounded-md bg-violet-500 text-stone-50 transition-colors hover:bg-violet-600 ">
                    Update Account
                </button>
            </div>
        </form>
    )
}
