import React from "react";

const SearchResult = ({ result, onClick }) => {
  return (
    <div
      className="search-result-item flex items-center gap-4  py-2 cursor-pointer hover:bg-gray-200 rounded-lg"
      onClick={onClick}
    >
      <img
        src={
          result.profile_pic
            ? `data:image/png;base64,${result.profile_pic}`
            : "/noPfp.webp"
        }
        alt={result.username}
        className="w-10 h-10 rounded-full"
      />
      <p className="text-lg text-black font-medium">{result.username}</p>
    </div>
  );
};

export default SearchResult;
