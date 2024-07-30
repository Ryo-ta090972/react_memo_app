import React, { useState } from "react";
import MemoTable from "./MemoTable.js";
import MemoDetail from "./MemoDetail.js";
import "./App.css";

function App() {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState({});

  function handleSelectMemo(id) {
    if (selectedMemo.id === id) {
      setSelectedMemo({});
    } else {
      const content = memos.find((memo) => memo.id === id).content;
      setSelectedMemo({ id: id, content: content });
    }
  }

  function handleEditContent(content) {
    setSelectedMemo({
      ...selectedMemo,
      content: content,
    });
  }

  function handleSaveContent(content) {
    const newMemos = memos.map((memo) => {
      if (memo.id === selectedMemo.id) {
        return {
          id: selectedMemo.id,
          content: content,
        };
      } else {
        return memo;
      }
    });

    return setMemos(newMemos);
  }

  function handleDeleteMemo(id) {
    const newMemos = memos.filter((memo) => memo.id !== id);
    setMemos(newMemos);
    setSelectedMemo({});
  }

  function handleCreateMemo() {
    const uuid = crypto.randomUUID();
    const newMemo = { id: uuid, content: "新規メモ" };
    const newMemos = [...memos];
    newMemos.push(newMemo);
    setMemos(newMemos);
    setSelectedMemo(newMemo);
  }

  return (
    <div>
      <MemoTable
        memos={memos}
        onSelect={handleSelectMemo}
        onCreate={handleCreateMemo}
      />
      {selectedMemo.id && (
        <MemoDetail
          id={selectedMemo.id}
          content={selectedMemo.content}
          onChange={handleEditContent}
          onSave={handleSaveContent}
          onDelete={handleDeleteMemo}
        />
      )}
    </div>
  );
}

export default App;
