import React from "react";

export default function MemoDetail({
  id,
  content,
  onChange,
  onSave,
  onDelete,
}) {
  return (
    <>
      <textarea value={content} onChange={(e) => onChange(e.target.value)} />
      <button onClick={() => onSave(content)}>編集</button>
      <button onClick={() => onDelete(id)}>削除</button>
    </>
  );
}
