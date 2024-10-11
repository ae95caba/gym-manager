// context/SessionContext.js
"use client"; // Add this at the top to indicate this is a Client Component
import React, { createContext, useState, useContext, useEffect } from "react";

const SessionContext = createContext();

export const useSessionContext = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [onsiteUsers, setOnsiteUsers] = useState(0);

  // Fetch the number of users with active sessions
  const fetchOnsiteUsers = async () => {
    const res = await fetch("/api/users?onsite=true");
    const data = await res.json();
    setOnsiteUsers(data.length);
  };

  // Call fetch on mount to initially load the data
  useEffect(() => {
    fetchOnsiteUsers();
  }, []);

  // This method will allow other components to trigger a re-fetch
  const refreshOnsiteUsers = () => {
    fetchOnsiteUsers();
  };

  return (
    <SessionContext.Provider value={{ onsiteUsers, refreshOnsiteUsers }}>
      {children}
    </SessionContext.Provider>
  );
};
