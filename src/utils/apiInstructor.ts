import axios from 'axios'

export async function getInstructor(){
    const response = await axios.get('https://localhost:7232/api/instructor')
    return response.data
}

export async function getInstructorCourses(id:number,token:string){
    const response = await axios.get(`https://localhost:7232/api/instructor/instructorCourses?instructorId=${id}`, {
         headers:{
        'Authorization':`Bearer ${token}`,
    }
    })
    return response.data
}