/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import Button from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../utils/apiAuth";
import { User } from "../../utils/utilities";
import toast from "react-hot-toast";

const EMAIL_REGEX =
    /^[a-zA-Z_]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;


export default function SignupForm(): JSX.Element {
    const [show, setShow] = useState(false);
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FieldValues>();

    const {mutate,isPending} = useMutation({mutationFn:signUp});
    const navigate = useNavigate();

    const handleSubmitForm: SubmitHandler<FieldValues> = (data) => {
        const userData: Partial<User> = {...data, role:+data.role, username: data.email.split('@')[0]};
        
        mutate(userData, {
            onSuccess: () => {
                reset();
                toast.success('Account created successfully');
                navigate('/login');
            },
            onError:(error)=>{
                console.log(error)
               toast.error('Failed to create an account, You may use another Email');
            }
        });
    };


    return (
        <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-3 w-[95%] sm:w-[90%]  lg:w-[26rem] bg-white p-4 rounded-sm shadow-sm dark:bg-black"
        >
            <h2 className="text-center text-violet-600 text-xl font-semibold mb-3 dark:text-violet-200">
                Sign Up
            </h2>

            <div className="flex justify-between ">
                <div className="w-[48%]">
                    <input
                        type="text"
                        placeholder="First name"
                        className="p-2 w-[100%] rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900 dark:text-stone-50"
                        {...register("fName", {
                            required: "First name is required",
                            minLength: { value: 4, message: "min length is 4 chars" },
                            maxLength: { value: 15, message: "max length is 15 chars" },
                        })}
                    />
                    {typeof errors.fName?.message === "string" && (
                        <p className="text-sm mt-1 text-red-700">*{errors.fName.message}</p>
                    )}
                </div>

                <div className="w-[48%]">
                    <input
                        type="text"
                        placeholder="Last name"
                        className="p-2 w-[100%] rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900 dark:text-stone-50"
                        {...register("lName", {
                            required: "Last name is required",
                            minLength: { value: 4, message: "min length is 4 chars" },
                            maxLength: { value: 15, message: "max length is 15 chars" },
                        })}
                    />
                    {typeof errors.lName?.message === "string" && (
                        <p className="text-sm mt-1 text-red-700">*{errors.lName.message}</p>
                    )}
                </div>
            </div>

            <div>
                <input
                    type="email"
                    placeholder="Email: name@anything.any"
                    className="p-2 w-full rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900 dark:text-stone-50"
                    {...register("email", {
                        required: "Email is required",
                        pattern: { value: EMAIL_REGEX, message: "Invalid email" },
                    })}
                />
                {typeof errors.email?.message === "string" && (
                    <p className="text-sm mt-1 text-red-700">*{errors.email.message}</p>
                )}
            </div>

            <div>
                <div className="relative">
                    <input
                        type={`${show ? 'text' : 'password'}`}
                        placeholder="Password"
                        className="p-2 w-full rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900 dark:text-stone-50"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password min length is 9" },
                            pattern: { value: PASSWORD_REGEX, message: 'Password must contains at lest one upper, one lower and one none alphabetic' }
                        })}
                    />
                    <button type="button" className="absolute top-3 right-3 dark:text-stone-400" onClick={() => setShow(state => !state)}>
                        {show ? <GoEyeClosed /> : <RxEyeOpen />}
                    </button>
                </div>

                {typeof errors.password?.message === "string" && (
                    <p className="text-sm mt-1 text-red-700">
                        *{errors.password.message}
                    </p>
                )}
            </div>

            <input
                type="tele"
                placeholder="Phone"
                className="p-2 rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900 dark:text-stone-50"
                {...register("phoneNumber", { required: false })}
            />

            <div>
                <select
                    className="p-2 w-full rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 bg-stone-50 dark:border-black dark:bg-stone-900 dark:text-stone-400 dark:text-stone-50"
                    {...register("role", { required: "You have to select account type" })}
                >
                    <option value="" hidden>
                        Choose account type
                    </option>
                    <option value="1">Student</option>
                    <option value="2">Instructor</option>
                </select>
                {typeof errors.role?.message === "string" && (
                    <p className="text-sm mt-1 text-red-700">*{errors.role.message}</p>
                )}
            </div>

            <Button isDisabled={isPending}>
                Create account
            </Button>

            <p className="text-sm flex items-center gap-2 dark:text-white">
                Already have an account ?<Link to="/login">Login</Link>
            </p>
        </form>
    );
}
