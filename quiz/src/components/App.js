// React
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Components
import Quiz from "./Quiz"
import Navbar from "./Navbar"
import Test from "./Test"
import Home from "./Home"
import About from "./About"
import Shop from "./Shop"

// Data
import { quizzes } from "../datasets/quizzes"

// CSS
import "../css/App.css"
import "../css/Quiz.css"

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/about" element={ <About /> } />
                    <Route path="/shop" element={ <Shop /> } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;