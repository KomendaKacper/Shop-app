import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import './style_z_index_przedTailwind.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/home' element={<App/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>

    {/* <App /> */}
    {/* <Login/> */}
    {/* <Register/> */}
  </StrictMode>,
)
