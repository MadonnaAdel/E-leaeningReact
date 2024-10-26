/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

import Button from "../../ui/Button";
import { logIn } from "../../utils/apiAuth";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/AuthContext";

const EMAIL_REGEX =
    /^[a-zA-Z_]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;


export default function LoginForm() {
    const [show, setShow] = useState(false);
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FieldValues>();
    
    const {mutate, isPending} = useMutation({mutationFn:logIn});
    const navigate = useNavigate();
    const {setUser} = useAuth();

    const handleSubmitForm: SubmitHandler<FieldValues> = (data) => {
        const loginData = {email: data.email, password:data.password};

        mutate(loginData, {
            onSuccess:(data)=>{
                setUser(data);
                
                toast.success('Logged in successfully');
                if (data.studentId) navigate('/courses'); 
                    else  navigate('/user');
            },
            onError:()=>{
                toast.error('Invalid email or password');
            },
            onSettled:()=>{
                reset();
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-3 w-[95%] sm:w-[90%] lg:w-[26rem] bg-white p-4 rounded-sm shadow-sm dark:bg-black"
        >
            <h2 className="text-center text-violet-600 text-xl font-semibold mb-3 dark:text-violet-200">
                Login to Your Account
            </h2>

            <div>
                <input
                    type="email"
                    placeholder="Email"
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
                            minLength: { value: 6, message: "Password min length is 6" },
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

            <div className="flex justify-between items-center dark:text-stone-300">
                <div className="flex items-center gap-2 ">
                    <input
                        type="checkbox"
                        id="remember"
                        className="p-2 cursor-pointer h-4 w-4 appearance-none  relative peer rounded  border checked:bg-violet-500 focus:outline-none focus:ring-1 ring-violet-700 dark:bg-stone-800 dark:border-black "
                        {...register("remember")}
                    />
                    <label htmlFor="remember">Remember me</label>
                    <svg
                        className="absolute w-4 h-4 hidden peer-checked:block text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <a href="#" className="text-sm">Forget password ?</a>
            </div>

            <Button isDisabled={isPending}>
                Login
            </Button>

            <p className="text-sm dark:text-stone-300">
                Don't have an account ? <Link to="/signup">Signup</Link>
            </p>
        </form>
    );
}
