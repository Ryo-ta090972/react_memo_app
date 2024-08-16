import React from "react";
import { useLogin } from "./loginContext";
import "./MemoList.css";

export default function MemoList({ memos, selectedId, onSelect, onCreate }) {
  const { isLogin } = useLogin();

  function extractFirstRow(content) {
    const firstRow = content.split("\n", 1)[0];

    if (firstRow === "") {
      return "NO TITLE";
    } else {
      return firstRow;
    }
  }

  const memoList = memos.map((memo) => {
    const firstRow = extractFirstRow(memo.content);
    const className = memo.id === selectedId ? "selected" : "list";

    return (
      <li className={className} key={memo.id} onClick={() => onSelect(memo.id)}>
        {firstRow}
      </li>
    );
  });

  return (
    <>
      <ul>{memoList}</ul>
      {isLogin && (
        <div
          className="create-new-memo"
          key={"createNewMemo"}
          onClick={() => onCreate()}
        >
          +
        </div>
      )}
    </>
  );
}
