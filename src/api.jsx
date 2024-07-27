import axios from "axios";

const API_URL= process.env.API_URL ;


export const fetchMeal= async (query) => {
    try{
        const response= await axios.get(API_URL, {
            params: {s:query},
        })
        return response.data.meals

    } catch(error){
        console.error('Error fetching the meal: ', error)
        throw error
    }
}