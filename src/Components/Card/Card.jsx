import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import './card.css';

const Card = ({ meal }) => {
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleClick = () => {
   
    navigate(`/dish-details/${meal.idMeal}`);
  };

  return (
    <div key={meal.idMeal} className="cardBody">
      <img className="imagecard" src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="cardData">
        <p className="namestyle">{meal.strMeal}</p>
        <button className="button-3" role="button" onClick={handleClick}>
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default Card;
