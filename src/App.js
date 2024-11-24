import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./Components/Header/Header";
import SearchBar from './Components/Searchbar/SearchBar';
import DishDetails from './Components/DishDetails/DishDetails';
import Favorites from './Components/Favourites/Favorites';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/dish-details/:id" element={<DishDetails />} /> 
          <Route path="/favorites" element={<Favorites />} />       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
