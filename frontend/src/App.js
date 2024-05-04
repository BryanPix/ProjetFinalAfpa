import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
// import React, { useState, useRef } from "react";

// Pages et components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import Navbar from "./components/Navbar";
import "./index.css";


function App() {
  const { user } = useAuthContext();

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar /> 
      <Routes>
        <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" /> }
        />
        <Route 
        path="/login"
        // la route navigate avec un slash permet de naviguer vers le Home, qui est la page principale et la premiere route referencée
        element={!user ? <Login /> : <Navigate to="/" /> }
        />
        <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" /> }
        />
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
