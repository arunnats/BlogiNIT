"use client";
import React, { useEffect, useRef } from "react";

const SearchBar = ({ setResults, searchTerm, setSearchTerm }) => {
  const sampleData = [
    { "Book-Title": "JavaScript Essentials" },
    { "Book-Title": "Learning React" },
    { "Book-Title": "Advanced CSS Techniques" },
    { "Book-Title": "Python for Data Science" },
    { "Book-Title": "FastAPI Fundamentals" },
  ];

  const fetchData = (value) => {
    const filteredData = sampleData.filter((item) =>
      item["Book-Title"].toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredData);
  };

  const handleChange = (value) => {
    setSearchTerm(value);
    if (value === "") {
      setResults([]);
    } else {
      fetchData(value);
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
