import React from "react";
import { useIsLogin } from "./isLogin";
import "./Header.css";

export default function Header() {
  const { isLogin, toggleLogin } = useIsLogin();

  return (
    <button className="button" onClick={() => toggleLogin()}>
      {isLogin ? "ログアウト" : "ログイン"}
    </button>
  );
}
