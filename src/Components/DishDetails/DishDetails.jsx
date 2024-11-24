import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DishDetails.css';

const DishDetails = () => {
  const { id } = useParams(); // Extract the dish ID from the URL
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDishDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          const data = await response.json();
          if (data.meals && data.meals.length > 0) {
            setDish(data.meals[0]);
          } else {
            setError('Dish not found');
          }
        } catch (err) {
          setError('Failed to fetch dish details');
        } finally {
          setLoading(false);
        }
      };

      fetchDishDetails();
    }
  }, [id]);

  // Extract ingredients and measurements dynamically
  const getIngredients = (dish) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = dish[`strIngredient${i}`];
      const measure = dish[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure || ''} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  // Add dish to favourites in localStorage
  const addToFavourites = () => {
    const favouriteDish = {
      id: dish.idMeal,
      name: dish.strMeal,
      image: dish.strMealThumb,
    };

    // Retrieve current favourites from localStorage
    const currentFavourites =
      JSON.parse(localStorage.getItem('favourites')) || [];

    // Check if the dish is already in favourites
    if (
      currentFavourites.some((favourite) => favourite.id === favouriteDish.id)
    ) {
      alert(`${dish.strMeal} is already in your favourites!`);
      return;
    }

    // Add the new favourite and save back to localStorage
    currentFavourites.push(favouriteDish);
    localStorage.setItem('favourites', JSON.stringify(currentFavourites));
    alert(`${dish.strMeal} has been added to your favourites!`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!dish) {
    return <div>No Dish Selected</div>;
  }

  const ingredients = getIngredients(dish);

  return (
    <div className="dish-details-container">
      {/* Dish Title */}
      <h1 className="dish-title">{dish.strMeal}</h1>

      {/* Dish Thumbnail */}
      <img
        src={dish.strMealThumb}
        alt={dish.strMeal}
        className="dish-thumbnail"
      />

      {/* Category and Area */}
      <p>
        <strong>Category:</strong> {dish.strCategory || 'N/A'}
      </p>
      <p>
        <strong>Cuisine:</strong> {dish.strArea || 'N/A'}
      </p>

      {/* Instructions */}
      <div className="dish-instructions">
        <h2>Instructions</h2>
        <p>{dish.strInstructions || 'Instructions not available'}</p>
      </div>

      {/* Ingredients */}
      <div className="dish-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      {dish.strTags && (
        <p>
          <strong>Tags:</strong> {dish.strTags.split(',').join(', ')}
        </p>
      )}

      {/* YouTube Video */}
      {dish.strYoutube && (
        <div className="dish-video">
          <h2>Video Tutorial</h2>
          <a href={dish.strYoutube} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
        </div>
      )}

      {/* Add to Favourites Button */}
      <div className="add-to-favourites">
        <button onClick={addToFavourites} className="button-3">
          Add to Favourites
        </button>
      </div>
    </div>
  );
};

export default DishDetails;
