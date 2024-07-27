import { useState } from "react";
import "./App.css";
import axios from "axios";
import { fetchMeal } from "./api";

function App() {
  const [recipe, setRecipe] = useState("");
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetchMeal(recipe); 
      setDatas(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const renderIngredients = (meal) => {
    const ingredients = [];
    for (let i = 0; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      }
    }

    return ingredients.map((ingredient, index) => (
      <li key={index} className="list">
        {ingredient}
      </li>
    ));
  };
  return (
    <>
      <h1>Recipe Website</h1>
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="text"
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
          placeholder="Enter the recipes"
        />
        <button type="submit" className="search">
          Search
        </button>
      </form>
      <div className="meals-container">
        {datas &&
          datas.map((meal) => (
            <div key={meal.idMeal} className="meal">
              <img src={meal.strMealThumb} alt={meal.strMeal} />

              <h2>{meal.strMeal}</h2>
              <p>
                <strong>Category:</strong> {meal.strCategory}
              </p>
              <p>
                <strong>Cuisine:</strong> {meal.strArea}
              </p>
              <p className="inst">
                <strong>Instructions:</strong> {meal.strInstructions}
              </p>
              <h3>Ingredients: </h3>
              <ul>{renderIngredients(meal)}</ul>
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Recipe
              </a>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
