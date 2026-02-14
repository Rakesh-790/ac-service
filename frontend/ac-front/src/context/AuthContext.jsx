import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || typeof token !== "string") return;

    try {
      const decoded = jwtDecode(token);

      setUser({
        loggedIn: true,
        token,
        role: decoded.role
      });

    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("accessToken");
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);

    try {
      const decoded = jwtDecode(token);

      setUser({
        loggedIn: true,
        token,
        role: decoded.role
      });

    } catch (error) {
      console.error("Invalid login token");
    }
  };


  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
