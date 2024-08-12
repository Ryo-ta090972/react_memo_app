import React from "react";
import "./MemosList.css";

export default function MemoTable({ memos, selectedId, onSelect, onCreate }) {
  function extractFirstRow(content) {
    const indexOfFirstRow = content.indexOf("\n");

    if (indexOfFirstRow >= 1) {
      return content.substring(0, indexOfFirstRow);
    } else if (content === "" || indexOfFirstRow === 0) {
      return "NO TITLE";
    } else {
      return content;
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
