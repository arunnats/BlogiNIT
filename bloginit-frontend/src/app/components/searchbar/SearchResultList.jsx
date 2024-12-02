"use client";
import React from "react";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results, onResultClick }) => {
  return (
    <div className="w-[22rem] text-primary font-poppins flex flex-col rounded-box border-4 shadow-xl border-foreground px-4 bg-accent mt-2 max-h-72 overflow-y-auto z-50 absolute top-16">
      {results.map((result, index) => (
        <SearchResult
          key={index}
          result={result}
          onClick={() => onResultClick(result)}
        />
      ))}
    </div>
  );
};

export default SearchResultsList;
