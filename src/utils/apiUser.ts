import axios from "axios";

//d

export async function getUserInfo(role:string, userId:number, token:string){
 const END_POINT = role === 'student' ? 'Student/GetStudentById' : role === 'instructor' ? 'Instructor/id' : 'Admin/id';

 const {data} = await axios.get(`https://localhost:7232/api/${END_POINT}?id=${userId}`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
 });

 return data;
}

export async function updateUserInfo({role,userId,newUser,token}:{role:string,userId:number,newUser:any, token:string}){
    const END_POINT = role === 'student' ? 'Student/UpdateStudent' : role === 'instructor' ? 'Instructor/UpdateInstructor' : 'Admin/UpdateAdmin';
    
    console.log(newUser);

    const {data} = await axios.put(`https://localhost:7232/api/${END_POINT}?id=${userId}`,newUser,{
       headers:{
           Authorization: `Bearer ${token}`,
           'Content-Type': ' multipart/form-data',
       }
    });

    return data;
}

export async function updateUserImage({role,userId, img, token}:{role:string,userId:number, img:FormData, token:string}){
    const END_POINT = role === 'student' ? 'Student/UpdateStudent' : role === 'instructor' ? 'Instructor/UpdateInstructor' : 'Admin/UpdateAdmin';

    const { data } = await axios.put(
      `https://localhost:7232/api/${END_POINT}?id=${userId}`,
      img, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      }
    );
   
    return data;
  }
  export async function updatePassword(role:string, userId:number,password:string,currentPassword:string ,token:string){
    const END_POINT = role === 'student' ? 'Student/UpdatePassword' : role === 'instructor' ? 'Instructor/UpdatePassword' : 'Admin/UpdatePassword';
   
    const {data} = await axios.put(`https://localhost:7232/api/${END_POINT}?id=${userId}`,{'currentPassword':currentPassword,
      'newPassword':password
    },{
       headers:{
           Authorization: `Bearer ${token}`
       }
    });
   
    return data;
   }

export async function deleteUser(role:string,userId:string ,token:string){
  const END_POINT = role === 'student' ? 'Student/DeleteStudent' : role === 'instructor' ? 'Instructor/DeleteInstructor' : 'Admin/DeleteAdmin';
 
  const {data} = await axios.delete(`https://localhost:7232/api/${END_POINT}?id=${userId}`,
    
  {
     headers:{
         Authorization: `Bearer ${token}`
     }
  });
 
  return data;
 }