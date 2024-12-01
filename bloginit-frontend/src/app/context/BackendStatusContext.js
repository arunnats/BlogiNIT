"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BackendStatusContext = createContext();

export const BackendStatusProvider = ({ children }) => {
  const [isBackendUp, setIsBackendUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

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
      }}
    >
      {children}
    </BackendStatusContext.Provider>
  );
};

export const useBackendStatus = () => useContext(BackendStatusContext);
