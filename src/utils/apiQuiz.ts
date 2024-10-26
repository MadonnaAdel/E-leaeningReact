import axios from 'axios'
import { Quiz } from './utilities';

export async function getQuizzes(courseId:number,token:string){
    const response = await axios.put(`https://localhost:7232/api/Quiz/GetQuizzesOfCoures?courseId=${courseId}`,{
        headers:{
            authorization:`bearer${token}`
    }})
    return response.data;
}
export async function addQuiz(quiz:Quiz,token:string){
    const response = await axios.put(`https://localhost:7232/api/Quiz/AddQuizWithQustionsAndChoices`,{quiz},{
        headers:{
            authorization:`bearer${token}`
    }})
    return response.data;
}
export async function deleteQuiz(quizId:number,token:string){
    const response = await axios.put(`https://localhost:7232/api/Quiz/DeleteQuiz?quizId=${quizId}`,{
        headers:{
            authorization:`bearer${token}`
    }})
    return response.data;
}
export async function updateQuiz(quizId:number, quizName:string, description:string, totalMarks:number,token:string){
    const response = await axios.put(`https://localhost:7232/api/Quiz/UpdateQuiz?quizId=${quizId}?quizName=${quizName}?description=${description}?totalMarks=${totalMarks}`,{
        headers:{
            authorization:`bearer${token}`
    }})
    return response.data;
}