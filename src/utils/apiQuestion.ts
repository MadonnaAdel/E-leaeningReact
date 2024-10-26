import axios from "axios";


export async function getQuizQuestions({
  quizId,
  token,
}: {
  quizId: number;
  token: string;
}) {

  const response = await axios.get(
    `https://localhost:7232/api/Question/GetquestionsOfQuiz?${quizId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function AddQuestion(content:string, quizId:number,choices:[{}],token:string){
    const response = await axios.post('https://localhost:7232/api/Quesiton/AddQuestion',{content,quizId,choices},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;

}

export async function deleteQuiz(questionId:number,token:string){
    const response = await axios.post(`https://localhost:7232/api/Quesiton/DeleteQuestion?questionId=${questionId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}

export async function updateQuestion(questionId:number, content:string,token:string){
    const response = await axios.put(`https://localhost:7232/api/Quesiton/UpdateQuestion?questionId=${questionId}?content=${content}`,{
        headers:{
            authorization:`bearer${token}`
    }})
    return response.data;
}
