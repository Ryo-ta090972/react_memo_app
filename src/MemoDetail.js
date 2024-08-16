import React from "react";
import { useLogin } from "./loginContext";
import "./MemoDetail.css";

export default function MemoDetail({ content, onChange, onSave, onDelete }) {
  const { isLogin } = useLogin();

  return (
    <>
      <textarea value={content} onChange={(e) => onChange(e.target.value)} />
      {isLogin && (
        <div>
          <button onClick={() => onSave()}>保存</button>
          <button onClick={() => onDelete()}>削除</button>
        </div>
      )}
    </>
  );
}
