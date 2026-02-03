import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState("");
    

  // Step 1: Decode token and set role
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded.role || "";
        setRole(userRole);
      } catch (err) {
        console.error("Invalid token:", err);
        setToken("");
        setRole("");
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  const contextValue = {
    token,
    setToken,
    role,
    setRole,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
