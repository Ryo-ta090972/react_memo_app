import React, { useState } from "react";
import MemoList from "./MemoList.js";
import MemoDetail from "./MemoDetail.js";
import "./App.css";

function App() {
  const [memos, setMemos] = useState(fetchSavedMemos());
  const [selectedMemo, setSelectedMemo] = useState({});

  function fetchSavedMemos() {
    return Object.entries(localStorage)
      .filter(([id]) => id.includes("memo_"))
      .map(([id, content]) => ({ id, content }));
  }

  function handleCreateNewMemo() {
    const id = "memo_" + crypto.randomUUID();
    const content = "新規メモ";
    saveNewMemo(id, content);
    setSelectedMemo({ id, content });
  }

  function saveNewMemo(id, content) {
    const newMemo = { id, content };
    const newMemos = [...memos];
    newMemos.push(newMemo);
    setMemos(newMemos);
    localStorage.setItem(id, content);
  }

  function handleSelectMemo(id) {
    if (selectedMemo.id === id) {
      setSelectedMemo({});
    } else {
      const content = memos.find((memo) => memo.id === id).content;
      setSelectedMemo({ id, content });
    }
  }

  function handleEditContent(content) {
    setSelectedMemo({
      ...selectedMemo,
      content,
    });
  }

  function handleSaveContent() {
    const id = selectedMemo.id;
    const content = selectedMemo.content;
    const newMemos = memos.map((memo) => {
      return memo.id === id ? { id, content } : memo;
    });

    setMemos(newMemos);
    localStorage.setItem(id, content);
  }

  function handleDeleteMemo() {
    const deletedMemos = memos.filter((memo) => memo.id !== selectedMemo.id);
    setMemos(deletedMemos);
    localStorage.removeItem(selectedMemo.id);
    setSelectedMemo({});
  }

  return (
    <div className="app">
      <div>
        <MemoList
          memos={memos}
          selectedId={selectedMemo.id}
          onSelect={handleSelectMemo}
          onCreate={handleCreateNewMemo}
        />
      </div>
      <div>
        {selectedMemo.id && (
          <MemoDetail
            content={selectedMemo.content}
            onChange={handleEditContent}
            onSave={handleSaveContent}
            onDelete={handleDeleteMemo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
