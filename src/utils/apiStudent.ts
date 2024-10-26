import  axios  from 'axios';

export async function getStudent(token:string){
    const response = await axios.get('https://localhost:7232/api/student',{
        headers:{
            Authorization:`bearer${token}`
        }
    })

    return response.data;
}

