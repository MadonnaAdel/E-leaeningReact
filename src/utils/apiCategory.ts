import axios from 'axios'


export async function getCategory(token:string){
  const response = await axios.get("https://localhost:7232/api/category/GetAllcategories",
       {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
    );
    return response.data;
}

export async function getCategoryById(id: string | undefined) {
    const response = await axios.get(`https://localhost:7232/api/Category/GetCategoryById?id=${id}`);
    return response.data;
}
export async function addCatgeory(name: string | undefined,token:string) {
    const response = await axios.post('https://localhost:7232/api/Category/AddCategory',{name},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

    return response.data;
}
export async function deleteCatgeory(id: number | undefined,token:string) {
    const response = await axios.post('https://localhost:7232/api/Category/DeleteCategory',{id},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

    return response.data;
}