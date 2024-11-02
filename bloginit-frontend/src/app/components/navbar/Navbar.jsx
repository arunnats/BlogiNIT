"use client"; // Required for client-side rendering with hooks

import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../searchbar/SearchBar";
import SearchResultsList from "../searchbar/SearchResultList";
import Link from "next/link";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const containerRef = useRef(null);
  const user = useState(1);

  // Fetch search results
  //   const fetchSearchResults = async (term) => {
  //     try {
  //       const response = await axios.get(`${fastAPIURL}search/?query=${term}`);
  //       setSearchResults(response.data);
  //     } catch (error) {
  //       console.error("Error fetching search results:", error);
  //     }
  //   };

  // Handle search term changes
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (term) {
      fetchSearchResults(term);
    } else {
      setSearchResults([]);
    }
  };

  // Handle clicking a result
  const handleResultClick = (result) => {
    console.log("Selected:", result); // Log or perform any action with the selected result
    setSearchTerm(""); // Clear the search term
    setSearchResults([]); // Clear the search results
  };

  // Handle outside clicks to close search results
  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="navbar bg-background border-y-4 border-black h-12 p-0"
      ref={containerRef}
    >
      <div className="navbar-start flex items-center h-full">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="#">Item 1</a>
            </li>
            <li>
              <a href="#">Parent</a>
              <ul className="p-2">
                <li>
                  <a href="#">Submenu 1</a>
                </li>
                <li>
                  <a href="#">Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Item 3</a>
            </li>
          </ul>
        </div>

        <a
          className="border-r-2 h-full px-5 border-black text-3xl font-aloevera text-accent flex items-center"
          href="#"
        >
          <p className="translate-y-1">BlogiNIT</p>
        </a>
        <a
          className="border-r-2 h-full px-6 font-poppinsbold border-black text-2xl text-accent hidden lg:flex items-center"
          href="#"
        >
          Feed
        </a>
      </div>

      <div className="navbar-center flex justify-center items-center">
        {/* Centered Search Bar */}
        <SearchBar
          setResults={setSearchResults}
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
        />
        {searchResults.length > 0 && (
          <SearchResultsList
            results={searchResults}
            onResultClick={handleResultClick}
          />
        )}
      </div>

      <div className="navbar-end"></div>
      <div className="dropdown dropdown-end border-l-2 h-full px-5 border-black">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar translate-y-1"
        >
          <div className="w-16 rounded-full ">
            <img
              alt="User Avatar"
              src="/defaultPfp.svg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 -translate-x-3 shadow bg-accent rounded-box w-52"
        >
          {user ? (
            <>
              <li>
                <Link className="text-foreground font-poppins" href="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="text-foreground font-poppins" href="/Library">
                  Your Blog
                </Link>
              </li>
              <li>
                {/* <a className="text-primary font-poppins" onClick={handleLogout}> */}
                <a className="text-foreground font-poppins">Logout</a>
              </li>
            </>
          ) : (
            <li>
              <Link className="text-foreground font-poppins" href="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
