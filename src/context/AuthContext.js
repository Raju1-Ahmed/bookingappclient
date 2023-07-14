import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Perform your login API call here
      // Example:
      // const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      // const userDetails = res.data.details;
      // setUser(userDetails);
      setUser({ name: credentials.name }); // Temporary placeholder code
      setLoading(false);
    } catch (err) {
      setError(err.response.data);
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setLoading(false);
    setError(null);
    localStorage.removeItem("user");
  };

  const authContextValue = {
    user,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
