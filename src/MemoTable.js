import React from "react";
import { useIsLogin } from "./isLogin";
import "./MemoTable.css";

export default function MemoTable({ memos, selectedId, onSelect, onCreate }) {
  const { isLogin } = useIsLogin();

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
      <span
        className={className}
        key={memo.id}
        onClick={() => onSelect(memo.id)}
      >
        {firstRow}
        <br />
      </span>
    );
  });

  isLogin &&
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
