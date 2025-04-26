import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainBody from "./components/home/MainBody";
import AboutMe from "./components/home/AboutMe";
import Project from "./components/home/Project";
import Skills from "./components/home/Skills";
import GetInTouch from "./components/home/GetInTouch";
import Experience from "./components/home/Experience";

function App() {
  return (
    <Router basename="/Vivek">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <MainBody />
              <AboutMe />
              <Project />
              <Skills />
              <Experience />
              <GetInTouch />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
