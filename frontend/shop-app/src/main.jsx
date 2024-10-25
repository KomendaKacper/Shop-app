import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import './index.css'
//import './style_z_index_przedTailwind.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Login/> */}
    <Register/>
  </StrictMode>,
)
