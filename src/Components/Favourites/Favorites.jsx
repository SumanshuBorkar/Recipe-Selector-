import React, { useState, useEffect } from 'react';
import Card from '../Card/Card'; // Import the Card component
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorite dishes from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavorites(storedFavorites);
  }, []);

  if (favorites.length === 0) {
    return <div className="no-favorites">No favorites yet!</div>;
  }

  return (
    <div className="favorites-container">
      <h1>Your Favorite Dishes</h1>
      <div className="favorites-grid">
        {favorites.map((dish) => (
          // Reuse Card component for each favorite dish
          <Card key={dish.id} meal={{ idMeal: dish.id, strMeal: dish.name, strMealThumb: dish.image }} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
