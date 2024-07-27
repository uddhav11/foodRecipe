import axios from "axios";

const API_URL= 'https://www.themealdb.com/api/json/v1/1/search.php';

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