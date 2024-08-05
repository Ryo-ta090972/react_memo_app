import React, { useState } from "react";
import MemoTable from "./MemoTable.js";
import MemoDetail from "./MemoDetail.js";
import Header from "./Header.js";
import "./App.css";
import { IsLoginProvider } from "./isLogin.js";

function App() {
  const [memos, setMemos] = useState(fetchSavedMemos());
  const [selectedMemo, setSelectedMemo] = useState({});

  function fetchSavedMemos() {
    const savedMemos = localStorage.length === 0 ? [] : getSavedMemos();
    return savedMemos;
  }

  function getSavedMemos() {
    return Object.entries(localStorage).map(([id, content]) => ({
      id,
      content,
    }));
  }

  function handleCreateNewMemo() {
    const id = crypto.randomUUID();
    const content = "新規メモ";
    setNewMemo(id, content);
    setSelectedMemo({ id, content });
  }

  function setNewMemo(id, content) {
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
    <IsLoginProvider>
      <Header />
      <div className="app">
        <div>
          <MemoTable
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
    </IsLoginProvider>
  );
}

export default App;
