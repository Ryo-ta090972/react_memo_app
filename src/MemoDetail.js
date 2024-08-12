import React from "react";
import "./MemoDetail.css";

export default function MemoDetail({ content, onChange, onSave, onDelete }) {
  return (
    <>
      <textarea value={content} onChange={(e) => onChange(e.target.value)} />
      <div>
        <button onClick={() => onSave()}>保存</button>
        <button onClick={() => onDelete()}>削除</button>
      </div>
    </>
  );
}
