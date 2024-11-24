import React, { useState } from 'react';
import './SearchBar.css';
import Card from '../Card/Card';

const SearchBar = () => {
  const [query, setQuery] = useState(''); // To store the user's input
  const [results, setResults] = useState([]); // To store API response
  const [error, setError] = useState(null); // To handle errors

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter an ingredient!');
      setResults([]);
      return;
    }

    try {
      setError(null); 
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query.trim()}`
      );
      const data = await response.json();

      if (data.meals) {
        setResults(data.meals);
      } else {
        setResults([]);
        setError('No results found for the entered ingredient.');
      }
    } catch (err) {
      setError('An error occurred while fetching data. Please try again.');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter ingredient (e.g., chicken)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {error && <p className="error-message">{error}</p>}

      <div className="results">
        {results.map((meal) => (
          <Card
            meal={meal}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;