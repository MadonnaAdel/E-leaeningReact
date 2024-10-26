import LoginForm from '../features/authentication/LoginForm';

export default function Login() {
    return (
        <div className=" p-4 flex flex-wrap gap-3 justify-center lg:grid lg:grid-cols-2 place-items-center bg-stone-50 dark:bg-stone-900">
            <img src="/login.png" alt="login image" className="max-w-[50%] sm:max-w-[60%] lg:max-w-[70%] aspect-square " />
            <LoginForm />
        </div>
    )
}
