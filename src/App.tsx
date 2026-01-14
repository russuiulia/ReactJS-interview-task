import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { RepoPage } from "./pages/RepoPage";
import './App.css'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/repo/:owner/:name" element={<RepoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
