import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Weather from "./pages/Weather/Weather";
import BlogDetailPg from "./pages/BlogDetailPg/BlogDetailPg";
import Header from "./Layout/Header/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/blog/:id" element={<BlogDetailPg />} />
      </Routes>
    </div>
  );
}

export default App;
