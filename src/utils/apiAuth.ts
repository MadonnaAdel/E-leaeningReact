import axios from "axios";
import { User } from "./utilities";

export async function signUp(userData:Partial<User>){
  console.log(userData);

  const {data} = await axios.post('https://localhost:7232/api/Account/Register', userData);

  return data;
}

export async function logIn(loginData:Partial<User>){
  const {data} = await axios.post('https://localhost:7232/api/Account/Login', loginData);

  return data;
}
