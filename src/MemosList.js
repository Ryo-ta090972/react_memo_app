import React from "react";
import "./MemosList.css";

export default function MemoTable({ memos, selectedId, onSelect, onCreate }) {
  function extractFirstRow(content) {
    const firstRow = content.split("\n", 1)[0];

    if (firstRow === "") {
      return "NO TITLE";
    } else {
      return firstRow;
    }
  }

  const list = memos.map((memo) => {
    const firstRow = extractFirstRow(memo.content);
    const className = memo.id === selectedId ? "selected" : "list";

    return (
      <ul className={className} key={memo.id} onClick={() => onSelect(memo.id)}>
        <li>{firstRow}</li>
      </ul>
    );
  });

  list.push(
    <span
      className="create-new-memo"
      key={"createNewMemo"}
      onClick={() => onCreate()}
    >
      +
    </span>,
  );

  return list;
}
