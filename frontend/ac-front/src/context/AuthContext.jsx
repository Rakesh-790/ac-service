import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../service/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await axiosClient.get("/auth/me");
        setUser({
          loggedIn: true,
          email: data.email,
          role: data.role
        });

      } catch (error) {
        setUser(null);
        console.error("Invalid token:", error);
      }
      finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async() => {
    try {
      const {data} = await axiosClient.get("/auth/me");
      setUser({
        loggedIn: true,
        email: data.email,
        role: data.role
      });

    } catch (error) {
      setUser(null);
      console.error("Invalid login token");
    }
  };


  const logout = async() => {
    await axiosClient.post("/auth/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loding }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
