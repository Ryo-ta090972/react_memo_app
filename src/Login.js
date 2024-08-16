import React from "react";
import { useLogin } from "./loginContext";
import "./Login.css";

export default function Header() {
  const { isLogin, toggleLogin } = useLogin();

  return (
    <button className="button" onClick={() => toggleLogin()}>
      {isLogin ? "ログアウト" : "ログイン"}
    </button>
  );
}
