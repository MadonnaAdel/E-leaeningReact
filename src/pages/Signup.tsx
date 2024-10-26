import SignupForm from "../features/authentication/SignupForm";

export default function Signup() {
    return (
        <div className=" p-4 flex flex-wrap-reverse gap-3 justify-center lg:grid lg:grid-cols-2 place-items-center bg-stone-50 dark:bg-stone-900">
            <SignupForm />
            <img src="/signUp.png" alt="sign up image" className="max-w-[50%] sm:max-w-[60%] lg:max-w-[70%] aspect-square " />
        </div>
    )
}
