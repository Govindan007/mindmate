import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Ask from "./pages/Ask";
import Qa from "./pages/Qa";
import Admin from "./pages/Admin"; // 👈 new

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/qa" element={<Qa />} />
        <Route path="/admin" element={<Admin />} /> {/* new */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
