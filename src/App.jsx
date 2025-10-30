import { useState } from 'react'
import PublishHtml from './editor/PublishHtml';
import AdminBlogPage from './pages/AdminBlogPage';
import PostPreview from './pages/PostPreview';
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import About from "./pages/About";
import Tags from "./pages/Tags";
import RequestAdmin from './pages/RequestAdmin';
import PublicBlogPage from "./pages/PublicBlogPage";
import AdminRoute from './components/AdminRoute';
import LatestBlogCard from './components/LatestBlogCard';

function App() {
  return (
    <Router basename="/vectorthoughts">
      <Routes>
        <Route path="/" element={<PublicBlogPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/article/:slug" element={<PostPreview />} />
        <Route path="/request-admin" element={<RequestAdmin />} />
        <Route path="/admin/publish/:postId" element={<AdminRoute><PublishHtml /></AdminRoute>}/>
        <Route path="/admin" element={<AdminRoute><AdminBlogPage /></AdminRoute>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}


export default App
