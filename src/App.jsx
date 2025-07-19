// src/App.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import './App.css'
import Ask from "./pages/Ask";
import Qa from "./pages/Qa";
import Admin from "./pages/Admin"; // 👈 new
import Nav from "./pages/Nav";
import Home from "./pages/Home";

 function App() {
  return (
    <div>
     <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/qa" element={<Qa />} />
        <Route path="/admin" element={<Admin />} /> {/* new */}
        <Route path="/home" element={<Home />}/>
      </Routes>
    </div>

   
  );
}
export default App