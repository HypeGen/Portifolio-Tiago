import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./pages/AdminPanel";
import { initErrorTracking } from "./monitoring";

// Main Portfolio Page
const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  useEffect(() => {
    initErrorTracking();
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || "/"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-tsg-2024" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
