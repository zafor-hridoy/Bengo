import React from 'react'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path="/" element ={<ChatPage/>} />
      <Route path="/login" element ={<LoginPage/>} />
      <Route path="/signup" element ={<SignUpPage/>} />
    </Routes>
  );
}

export default App