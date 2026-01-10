import React, { useEffect } from 'react'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { useChatStore } from './store/useChatStore'
import { useThemeStore } from './store/useThemeStore'
import { Toaster } from 'react-hot-toast';


function App() {
  const { checkAuth, isCheckingAuth, authUser, socket } = useAuthStore();
  const { subscribeToMessages } = useChatStore();
  const { initTheme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    initTheme(); 
  }, [checkAuth, initTheme]);

  useEffect(() => {
    if (authUser && socket) {
      subscribeToMessages();
    }
  }, [authUser, socket, subscribeToMessages]);

  if (isCheckingAuth) return <div>Loading...</div>;



  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: authUser ? `rgb(var(--base-100))` : '#0f172a' }} // Default slate-900 if not logged in
    >
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div
        className="absolute top-0 -left-4 size-96 opacity-20 blur-[100px]"
        style={{ backgroundColor: authUser ? `rgb(var(--primary))` : '#ec4899' }} // Pink if not logged in
      />
      <div
        className="absolute bottom-0 -right-4 size-96 opacity-20 blur-[100px]"
        style={{ backgroundColor: authUser ? `rgb(var(--secondary))` : '#06b6d4' }} // Cyan if not logged in
      />


      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

