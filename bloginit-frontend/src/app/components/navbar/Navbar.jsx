"use client"; // Required for client-side rendering with hooks

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchBar from "../searchbar/SearchBar";
import SearchResultsList from "../searchbar/SearchResultList";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const containerRef = useRef(null);
  const backendStatus = useBackendStatus();
  const router = useRouter();
  const fetchProfilePic = async () => {
    if (backendStatus.isLoggedIn && backendStatus.userId) {
      try {
        const response = await axios.get(
          `http://localhost:4000/profile-pic/${backendStatus.userId}`
        );
        const { profilePic } = response.data; // Extract Base64 string
        backendStatus.setProfilePic(profilePic); // Store in state
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    }
  };

  fetchProfilePic();

  // Fetch search results
  const fetchSearchResults = async (term) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/search/?query=${term}`
      );
      setSearchResults(response.data);
    } catch (error) {
      // console.error("Error fetching search results:", error);
    }
  };

  // Handle search term changes
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (term) {
      fetchSearchResults(term);
    } else {
      setSearchResults([]);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("profilePic");

    backendStatus.setIsLoggedIn(false);
    backendStatus.setUserId(null);
    backendStatus.setProfilePic(null);

    router.push("/");
  };

  // Handle clicking a result
  const handleResultClick = (result) => {
    console.log("Selected user:", result);
    setSearchTerm(""); // Clear search term
    setSearchResults([]); // Clear displayed results
    router.push(`/user/${result.user_id}`); // Navigate to the user's profile page
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
            className="menu menu-sm dropdown-content bg-base-background rounded-box z-[1] mt-3 w-52 translate-x-3 p-2 shadow"
          >
            <li>
              <a href="/feed">Feed</a>
            </li>
            <li>
              <a href="/create">Create</a>
            </li>
          </ul>
        </div>

        <a
          className="border-r-2 h-full px-5 border-black text-3xl font-aloevera text-accent flex items-center"
          href="/"
        >
          <p className="translate-y-1">BlogiNIT</p>
        </a>
        <a
          className="border-r-2 h-full px-6 font-poppinsbold border-black text-2xl text-accent hidden lg:flex items-center"
          href="/feed"
        >
          Feed
        </a>
        <a
          className="border-r-2 h-full px-6 font-poppinsbold border-black text-2xl text-accent hidden lg:flex items-center"
          href="/create"
        >
          Create
        </a>
      </div>

      <div className="navbar-center flex justify-center items-center pl-10">
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
            {backendStatus.isBackendUp && backendStatus.isLoggedIn ? (
              <img
                alt="User Avatar"
                src={
                  backendStatus.profilePic
                    ? `data:image/png;base64,${backendStatus.profilePic}` // Use the base64 string for the profile picture
                    : "/noPfp.webp" // Fallback to the default image if no profile picture
                }
                referrerPolicy="no-referrer"
                className="w-16 rounded-full"
              />
            ) : (
              <img
                alt="Default Avatar"
                src="/noPfp.webp"
                referrerPolicy="no-referrer"
                className="w-16 rounded-full"
              />
            )}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 -translate-x-3 shadow bg-accent rounded-box w-52"
        >
          {backendStatus.isBackendUp && backendStatus.isLoggedIn ? (
            <>
              <li>
                <Link
                  className="text-foreground font-poppins"
                  href={`/user/${backendStatus.userId}`}
                >
                  Your Blog
                </Link>
              </li>

              <li>
                <button
                  className="text-foreground font-poppins"
                  onClick={handleLogout}
                >
                  Logout
                </button>
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
