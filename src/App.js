import React, { useState } from "react";
import MemoTable from "./MemoTable.js";
import MemoDetail from "./MemoDetail.js";
import "./App.css";

function App() {
  const [memos, setMemos] = useState(fetchSavedMemos());
  const [selectedMemo, setSelectedMemo] = useState({});

  function fetchSavedMemos() {
    const savedMemos = localStorage.length === 0 ? [] : getLocalStorage();
    return savedMemos;
  }

  function getLocalStorage() {
    return Object.entries(localStorage).map(([id, content]) => ({
      id,
      content,
    }));
  }

  function handleCreateNewMemo() {
    const id = crypto.randomUUID();
    const content = "新規メモ";
    createMemos(id, content);
    setSelectedMemo({ id, content });
  }

  function createMemos(id, content) {
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
    deleteMemo();
    setSelectedMemo({});
  }

  function deleteMemo() {
    const deletedMemos = memos.filter((memo) => memo.id !== selectedMemo.id);
    setMemos(deletedMemos);
    localStorage.removeItem(selectedMemo.id);
  }

  return (
    <div>
      <MemoTable
        memos={memos}
        onSelect={handleSelectMemo}
        onCreate={handleCreateNewMemo}
      />
      {selectedMemo.id && (
        <MemoDetail
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
