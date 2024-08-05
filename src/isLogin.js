import React, { useState, createContext, useContext } from "react";

const IsLoginContext = createContext();

export function IsLoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  function toggleLogin() {
    setIsLogin(!isLogin);
  }

  return (
    <IsLoginContext.Provider value={{ isLogin, toggleLogin }}>
      {children}
    </IsLoginContext.Provider>
  );
}

export function useIsLogin() {
  return useContext(IsLoginContext);
}
