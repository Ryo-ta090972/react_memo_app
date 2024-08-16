import React, { useState, createContext, useContext } from "react";

const loginContext = createContext();

export function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  function toggleLogin() {
    setIsLogin(!isLogin);
  }

  return (
    <loginContext.Provider value={{ isLogin, toggleLogin }}>
      {children}
    </loginContext.Provider>
  );
}

export function useLogin() {
  return useContext(loginContext);
}
