//import { category, Course } from './utilities';
export interface Course {
  courseId: number;
  pictureUrl: string ; 
  courseName: string;
  description: string;
  enrollments: number;
  lectures: number;
  quizzes: number;
  instructor: {
    id: number;
    fName: string;
    lName: string;
  };
  courseTiming: number;
  category: string;
  img: string;
  status: number;
}
interface section{
    id: number;
    title:string
}



export interface Section {
  contentId: number;
  title: string;
  isDeleted: boolean;
  courseId: number;
  contentTypes: {
    contentTypeId: number;
  };
}

export interface SectionItemValues{
  contentId:string;
  title:string;
  path:string;
}

export interface Instructor {
  fName: string;
  lName: string;
  numOfCrs: number;
  pictureUrl: string;
  address: string;
  aboutYou: string;
  isDeleted: boolean;
  userId: string;
  user: null;
}

export interface User{
  fName: string;
  lName:string;
  email: string;
  password: string;
  username:string;
  phoneNumber: string;
  role:number;
}

export interface UserInfo extends User{
  token: string;
  studentId: number | null;
  instructorId: number ;
  adminId: number | null;
}

export function getContentType(contentURL: string): string | null {
  const imageTypes = [
    "jpg",
    "png",
    "jpeg",
    "gif",
    "svg",
    "webp",
    "bmp",
    "tiff",
  ];
  const videoTypes = ["mp4", "webm", "m4v", "3gp", "wmv", "avi", "mov", "mkv"];

  const type = contentURL.split(".").pop() || "";

  if (imageTypes.indexOf(type) !== -1) return "image";
  else if (videoTypes.indexOf(type) !== -1) return "video";
  else if (type === "docx" || type === "doc") return "word";
  else if (type === "pdf") return "pdf";

  return null;
}

export interface category{

  name:string,

}
export interface Quiz{
  quizName: string,
  description: string,
  totalMarks: number,
  courseId:number,
  questions: Questions[]


}
interface Questions{
  content: string,
  quizId: number,
  choices: [{
    content: string,
    isCorrect: boolean
  }]
}

