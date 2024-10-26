import { data } from 'autoprefixer';
import axios from "axios";

export async function getCourseItems(courseId: number) {
    const { data } = await axios.get(`https://localhost:7232/api/Course/${courseId}/contentTypesCount`);
    return data.totalContentCount;
}
export async function deletCountent(courseId: number, token: string) {
    const { data } = await axios.get(`https://localhost:7232/api/Course/DeleteContentType/${courseId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            ' Content-Type': 'application/json',

        }
    });
    return data.totalContentCount;
}
// export async function getCourseItems(courseId:number){
//     const {data} = await axios.get(`https://localhost:7232/api/Course/${courseId}/contentTypesCount`);
//     return data.totalContentCount;
// }


export async function deletesection(sectiontId: number, token: string) {


    const response = await axios.delete(`https://localhost:7232/api/Course/DeleteContent?contentId=${sectiontId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    return response;


}

interface ContentData {
    title: string;
    contentId: number;
    attachment: File;
    token: string;
}


export async function addContentTypeFile({ title, contentId, attachment, token }: ContentData) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("contentId", contentId.toString());
    formData.append("attachment", attachment);

    try {
        const response = await axios.post("https://localhost:7232/api/Course/AddContentType",
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        console.log("Response:", response);
        return response;
    } catch (error) {
        console.error("Error uploading content:", error);
        throw error;
    }
}

export async function AddCourseSection(courseSection: string, courseId: number, token: string) {
  const response = await axios.post(
    `https://localhost:7232/api/Course/AddCourseContent?courseId=${courseId}&title=${encodeURIComponent(courseSection)}`, // استخدام الـ query parameters
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );

  return response;
}