import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Project from "./pages/Project";

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/project" element={<Project />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App;
