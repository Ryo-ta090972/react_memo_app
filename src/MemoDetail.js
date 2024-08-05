import React from "react";
import { useIsLogin } from "./isLogin";
import "./MemoDetail.css";

export default function MemoDetail({ content, onChange, onSave, onDelete }) {
  const { isLogin } = useIsLogin();

  return (
    <>
      <textarea value={content} onChange={(e) => onChange(e.target.value)} />
      {isLogin && (
        <div>
          <button onClick={() => onSave()}>編集</button>
          <button onClick={() => onDelete()}>削除</button>
        </div>
      )}
    </>
  );
}
