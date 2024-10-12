// context/SessionContext.js
"use client"; // Add this at the top to indicate this is a Client Component
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the context value
interface SessionContextType {
  onsiteUsers: number;
  refreshOnsiteUsers: () => void;
}

// Define the props for the provider
interface SessionProviderProps {
  children: ReactNode;
}

// Create the context with a default value
const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSessionContext = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [onsiteUsers, setOnsiteUsers] = useState<number>(0);

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
