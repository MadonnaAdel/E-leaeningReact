import axios from "axios";
import { Course } from "./utilities";
import { data } from "autoprefixer";

export async function getCourses(){
  const response = await axios.get("https://localhost:7232/api/course/GetApprovedCourses");
    return response.data;
}


export async function getCourseById(id: string | undefined) {
    const response = await axios.get(`https://localhost:7232/api/course/GetCourseById?id=${id}`);
    return response.data;
}
export async function addCourse(
    courseName: string,
    instructorId: number,
    categoryId: number,
    token: string,
    description: string,
    courseTiming: number,
    img: File
) {
    const formData = new FormData();

    formData.append('courseName', courseName);
    formData.append('description', description);
    formData.append('instructorId', instructorId.toString());
    formData.append('categoryId', categoryId.toString());
    formData.append('courseTiming', courseTiming.toString());
    formData.append('img', img);

    console.log('FormData before sending:', Array.from(formData.entries()));

    try {
        const response = await axios.post(
            `https://localhost:7232/api/course/AddCourse`, 
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log(response.data);

        return response.data;
    } catch (error: any) {
        console.error('Error adding course:', error);

        if (error.response) {
            console.log('Server responded with status:', error.response.status);
            console.log('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Server error occurred');
        } else if (error.request) {
            console.log('No response received:', error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            console.log('Error in request setup:', error.message);
            throw new Error(error.message || 'Error setting up request');
        }
    }
}



export async function updateCourse(
    courseId: number,
    courseName: string,
    categoryId: number,
    token: string,
    description: string,
    courseTiming: number,
    img: File | null 
) {
    const formData = new FormData();

    formData.append('courseName', courseName);
    formData.append('categoryId', categoryId.toString());
    formData.append('description', description);
    formData.append('courseTiming', courseTiming.toString());

    if (img) {
        formData.append('img', img);
    }

    try {
        const response = await axios.put(
            `https://localhost:7232/api/Course/UpdateCourse?id=${courseId}`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response;
    } catch (error: any) {
        console.error('Error updating course:', error);

        if (error.response) {
            console.log('Server responded with status:', error.response.status);
            console.log('Response data:', error.response.data);
            throw new Error(error.response.data.message || 'Server error occurred');
        } else if (error.request) {
            console.log('No response received:', error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            console.log('Error in request setup:', error.message);
            throw new Error(error.message || 'Error setting up request');
        }
    }
}





export async function deleteCourse(id: number, token: string) {
  const response = await axios.delete(`https://localhost:7232/api/course/DeleteCourse`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      id: id
    }
  });
  return response.data;
}

export async function getPendingCourses(categoryId:number,token:string){
  
  const response = await axios.get(`https://localhost:7232/api/Course/GetPendingCourses?${categoryId}`,{
    headers:{
      'Authorization':`Bearer ${token}`
  }});
  return response.data
}
export async function getRejectedCourses(categoryId:number,token:string){
  
  const response = await axios.get(`https://localhost:7232/api/Course/GetRejectedCourses?${categoryId}`,{
    headers:{
      'Authorization':`Bearer ${token}`
  }});
  return response.data
}
export async function getAllCourses(token:string){
  
  const response = await axios.get('https://localhost:7232/api/Course/GetAllCourses',{
    headers:{
      'Authorization':`Bearer ${token}`
  }});
  return response.data
}



//entrollment
// Get Enrolled Courses
export async function getEnrolledCourses({ studentId, token }: { studentId: number, token: string }): Promise<Course[]> {
  const response = await axios.get(`https://localhost:7232/api/Enrollment/GetEnrolledCoursesForStudent?studentId=${studentId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  return response.data;
}

// Unenroll Course
export async function unEnrollCourse({ courseId, studentId, token }: { courseId: number, studentId: number, token: string }) {
  await axios.delete(`https://localhost:7232/api/Enrollment/unEnrollCourse?studentId=${studentId}&courseId=${courseId}`, {
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  });
}

// Enroll Course

export async function enrollCourse({ courseId, studentId, token }: { courseId: number; studentId: number; token: string }): Promise<void> {
    await axios.post(
        `https://localhost:7232/api/Enrollment/AddEnrollment?studentId`,
           {
      courseId: courseId, 
      studentId: studentId,
    },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }
    );
}


