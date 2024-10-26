import axios from "axios";

export async function getSectionById(id:number){
    const {data:sectoin} = await axios.get(`https://localhost:7232/api/Course/GetContentTypesForSection?contentId=${id}`) ;

    return sectoin;
}