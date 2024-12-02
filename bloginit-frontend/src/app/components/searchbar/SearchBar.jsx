"use client";
import React, { useRef } from "react";
import axios from "axios";

const SearchBar = ({ setResults, searchTerm, setSearchTerm }) => {
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchResults = useRef(
    debounce(async (value) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/search?query=${value}`
        );
        setResults(response.data.results); // Update results based on response
      } catch (error) {}
    }, 300)
  ).current;

  const handleChange = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setResults([]);
    } else {
      fetchResults(value);
    }
  };

  return (
    <div className="flex flex-col mx-auto items-center w-80">
      <div className="w-full h-10 rounded-lg px-4 bg-accent flex items-center">
        <input
          placeholder="Type to find users..."
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          className="text-foreground font-poppins bg-transparent border-none h-full text-lg w-full ml-2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
