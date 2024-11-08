"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BackendStatusContext = createContext();

export const BackendStatusProvider = ({ children }) => {
  const [isBackendUp, setIsBackendUp] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch("https://your-backend-url.com/health");
        setIsBackendUp(response.ok);
      } catch (error) {
        setIsBackendUp(false);
      }
    };

    checkBackendStatus();
  }, []);

  return (
    <BackendStatusContext.Provider
      value={{ isBackendUp, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </BackendStatusContext.Provider>
  );
};

export const useBackendStatus = () => useContext(BackendStatusContext);
