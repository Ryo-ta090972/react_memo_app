import React from "react";

export default function MemoTable({ memos, onSelect, onCreate }) {
  const list = memos.map((memo) => {
    return (
      <li key={memo.id} onClick={() => onSelect(memo.id)}>
        {memo.content}
      </li>
    );
  });

  list.push(
    <li key={"createMemo"} onClick={() => onCreate()}>
      +
    </li>,
  );

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}
