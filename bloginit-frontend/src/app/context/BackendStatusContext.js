"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BackendStatusContext = createContext();

export const BackendStatusProvider = ({ children }) => {
  const [isBackendUp, setIsBackendUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || null
  );

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch("http://localhost:4000/health");
        setIsBackendUp(response.ok);
      } catch (error) {
        setIsBackendUp(false);
      }
    };

    checkBackendStatus();
  }, []);

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("userId", userId || "");
    localStorage.setItem("authToken", authToken || "");
    localStorage.setItem("profilePic", profilePic || "");
  }, [isLoggedIn, userId, profilePic]);

  return (
    <BackendStatusContext.Provider
      value={{
        isBackendUp,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        profilePic,
        setProfilePic,
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </BackendStatusContext.Provider>
  );
};

export const useBackendStatus = () => useContext(BackendStatusContext);
