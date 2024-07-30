import React from "react";

export default function MemoTable({ memos, onSelect, onCreate }) {
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
    return (
      <li key={memo.id} onClick={() => onSelect(memo.id)}>
        {firstRow}
      </li>
    );
  });

  list.push(
    <li key={"createNewMemo"} onClick={() => onCreate()}>
      +
    </li>,
  );

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}
