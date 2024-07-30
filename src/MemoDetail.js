import React from "react";

export default function MemoDetail({ content, onChange, onSave, onDelete }) {
  return (
    <>
      <textarea value={content} onChange={(e) => onChange(e.target.value)} />
      <button onClick={() => onSave()}>編集</button>
      <button onClick={() => onDelete()}>削除</button>
    </>
  );
}
