import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { updateUserInfo } from "../../utils/apiUser";
import toast from "react-hot-toast";

const EMAIL_REGEX =
    /^[a-zA-Z_]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;

interface UpdateUserInfoFormProps{
    fName:string;
    lName: string;
    email: string;
    phone: string;
    role:string;
    userId:number;
    token:string;
}

export default function UpdateUserInfoForm({fName,lName, email, phone, userId,role,token}:UpdateUserInfoFormProps): JSX.Element {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FieldValues>();
    
    const queryClient = useQueryClient();
    const {mutate, isPending} = useMutation({mutationFn:updateUserInfo});

    const handleSubmitForm: SubmitHandler<FieldValues> = (data) => {

        mutate({userId,role,token,newUser:data},{
            onSuccess: (data) => {
                toast.success('User Info updated successfully');
                queryClient.setQueryData(['user-data'], data);
            }
            ,
            onError:()=>{
                toast.error('Error: Failed to update User Info')
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-3 bg-white p-4 rounded-md shadow-sm dark:bg-black"
        >
            <h2 className="text-violet-600 text-xl font-bold mb-3 dark:text-violet-200">
                User Info
            </h2>

            <div className="flex justify-between flex-col gap-4 sm:flex-row sm:gap-0">
                <div className="w-[100%] sm:w-[48%]">
                    <input
                        type="text"
                        placeholder="First name" 
                        className="p-2 w-[100%] rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3  dark:border-black dark:bg-stone-900 dark:text-stone-50"
                        defaultValue={fName}
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

                <div className="w-[100%] sm:w-[48%]">
                    <input
                        type="text"
                        placeholder="Last name"
                        className="p-2 w-[100%] rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 dark:border-black dark:bg-stone-900 dark:text-stone-50"
                        defaultValue={lName}
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

            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
                <div className="w-[100%] sm:w-[48%]">
                    <input
                        type="email"
                        placeholder="Email: name@anything.any"
                        className="p-2 w-full rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 dark:border-black dark:bg-stone-900 dark:text-stone-50"
                        defaultValue={email}
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: EMAIL_REGEX, message: "Invalid email" },
                        })}
                    />
                    {typeof errors.email?.message === "string" && (
                        <p className="text-sm mt-1 text-red-700">*{errors.email.message}</p>
                    )}
                </div>

                <div className="w-[100%] sm:w-[48%]">
                    <input
                        type="tele"
                        placeholder="Phone"
                        className="p-2 w-[100%] rounded-md transition-all border focus:outline-none focus:ring-1 ring-violet-700 ring-offset-3 dark:border-black dark:bg-stone-900 dark:text-stone-50"
                        defaultValue={phone}
                        {...register("phoneNumber", { required: false })}
                    />
                    
                </div>
                
            </div>


            <div className="flex items-center justify-end gap-4 text-sm sm:text-base mt-3">
                <button 
                type='button'
                className="bg-white rounded p-2 border border-stone-300 hover:bg-stone-50 transition-colors dark:bg-stone-800 dark:border-stone-900 dark:text-stone-50 dark:hover:bg-stone-900" 
                onClick={()=>reset()}
                disabled={isPending}
                >Cancel</button>

                <button 
                className="p-2  rounded-md bg-violet-500 text-stone-50 transition-colors hover:bg-violet-600 "
                disabled={isPending}
                >
                    Update Account
                </button>
            </div>
        </form>
    );
}
