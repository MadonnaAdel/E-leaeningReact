import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import UpdatePasswordForm from "../features/user/UpdatePasswordForm";
import UpdateUserImage from "../features/user/UpdateUserImage";
import UpdateUserInfoForm from "../features/user/UpdateUserInfoForm";
import { getUserInfo } from "../utils/apiUser";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";
import { jwtDecode } from "jwt-decode";

interface JWTPayloadValues{
    email: string;
    phoneNumber: string;
}


export default function Profile(): JSX.Element {
    const {user} = useAuth();
    const role = user.studentId !== null ? 'student': user.instructorId !== null ? 'instructor' : 'admin';
    const userId = user.studentId || user.instructorId || user.adminId;
    const {email, phoneNumber} = jwtDecode<JWTPayloadValues>(user.token);
    console.log(user.token, email);

    const {data, isLoading , isError, error} = useQuery({queryKey:['user-data'], queryFn:()=>getUserInfo(role, userId as number, user.token)});

    if(isLoading) return <div className="w-full text-center mt-24"><Spinner/></div>

    if(isError) return <ErrorMessage message={error.message}/>;

    return (
        <div className="p-4 flex flex-col gap-6 sm:p-12">
            <h2 className="font-bold text-2xl text-violet-600 dark:text-violet-200">Your Profile</h2>

            <div className="flex flex-wrap gap-6">
                <UpdateUserImage pictureUrl={data.pictureUrl} role={role} userId={userId as number} token={user.token}/>
                <UpdatePasswordForm />
            </div>

            <UpdateUserInfoForm fName={data.fName} lName={data.lName} email={data.email} phone={data.phoneNumber} role={role} userId={userId as number} token={user.token}/>
        </div>
    )
}
