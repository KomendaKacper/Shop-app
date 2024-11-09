import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/home' element={<App/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
