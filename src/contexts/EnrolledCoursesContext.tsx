import { createContext, ReactNode, useContext, useState } from "react";

interface EnrollledCoursesValues{
    enrolledCourses: number[];
    setEnrolledCourses:React.Dispatch<React.SetStateAction<number[]>>;
}

const EnrolledCoursesContext = createContext<EnrollledCoursesValues>({} as EnrollledCoursesValues);

export function EnrolledCoursesProvider({children}:{children:ReactNode}){
    const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

    return <EnrolledCoursesContext.Provider value={{enrolledCourses, setEnrolledCourses}}>{children}</EnrolledCoursesContext.Provider>
}

export function useEnrolledCourses(){
  const context = useContext(EnrolledCoursesContext);

  if(!context) console.log('EnrolledCoursesContext used out side of scope');

  return context;
}
