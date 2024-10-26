import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { updateUserImage } from "../../utils/apiUser";
import toast from "react-hot-toast";

interface updateUserImageProps{
    pictureUrl:string;
    userId:number;
    role:string;
    token:string;
}

export default function UpdateUserImage({pictureUrl, role, userId, token}:updateUserImageProps): JSX.Element {
    const [src, setSrc] = useState<string>('');
    const [img, setImg] = useState<File>({} as File);
    
    const {mutate, isPending} = useMutation({mutationFn: updateUserImage});
    const queryClient = useQueryClient();

    const handleChangeSrc = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            const image = e.target.files[0];
            setImg(image);

            if(image){
              const reader = new FileReader();
              reader.readAsDataURL(image);
        
              reader.onload = ()=>{
                setSrc(reader.result as string);
              }
            }
        }
    }

    const handleUpdateImage = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("img", img);
        
        mutate({img:formData,role,userId, token},{
            onSuccess:(data)=>{
                toast.success('Image updated successfully.')
                queryClient.setQueryData(['user-data'], data);
            }, 
            onError:()=>{
                toast.error('Failed to update user image.');
            }
        })
    }

    return (
        <form onSubmit={handleUpdateImage} className="flex flex-wrap items-center justify-between gap-4 px-2 bg-white rounded-md shadow-sm md:w-[50%] dark:bg-black">
            <label htmlFor="image" className=" w-[8rem] h-[8rem] overflow-hidden cursor-pointer rounded-full aspect-square">
                <img src={src || pictureUrl || '/public/user.png'} alt="user profile picture" />
                <input type="file" accept="image/*" id='image' name="img"  hidden disabled={isPending} onChange={handleChangeSrc}/>
            </label>

            <div className="flex flex-1 flex-wrap  justify-start gap-4 px-2 text-sm sm:text-base">
                <button 
                disabled={isPending}

                className="p-2 w-fit rounded bg-violet-500 text-stone-50 hover:bg-violet-600 transition-colors disabled:bg-stone-100 disabled:cursor-notallowed"
                >Update photo
                </button>
                <button
                   onClick={()=> {setSrc(''); setImg({} as File);}}
                  disabled={isPending}
                  type="button"
                 className="bg-white rounded p-2 me-auto border border-stone-300 hover:bg-stone-50 transition-colors dark:bg-stone-800 dark:border-stone-900 dark:text-stone-50 dark:hover:bg-stone-900"
                 >
                    Reset
                </button>
            </div>
        </form>
    )
}
