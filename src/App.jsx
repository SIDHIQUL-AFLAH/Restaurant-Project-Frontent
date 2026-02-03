import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Home'
import About from './About'
import MenuPDF from './Menu'
import Reservation from './Reservation' 
import Admin from './Admin'
import AdminLogin from './AdminLogin' 
import './Style.css'

// --- THE GATEKEEPER ---
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
  
  console.log("Check Access:", isAuthenticated); // This will tell us if it's "true" or null

  if (isAuthenticated === "true") {
    return children;
  } else {
    return <Navigate to="/admin-login" replace />;
  }
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/menu' element={<MenuPDF/>} />
      <Route path='/reservation' element={<Reservation/>} />
      
      {/* Login must be outside the protection */}
      <Route path='/admin-login' element={<AdminLogin />} />

      {/* Admin must be INSIDE the protection */}
      <Route 
        path='/admin' 
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App