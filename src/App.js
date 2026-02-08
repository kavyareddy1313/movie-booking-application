
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Success from "./pages/Success";

import CinemaHalls from "./pages/CinemaHalls";



import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/cinemas/:id" element={<CinemaHalls />} />

        
        <Route path="/success" element={<Success />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
