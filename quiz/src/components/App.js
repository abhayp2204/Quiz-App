// React
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Firebase
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"

// Components
import Quiz from "./Quiz"
import Navbar from "./Navbar"
import Home from "./Home"
import Shop from "./Shop"
import QuizSelect from "./QuizSelect"
import SignIn from "./auth/SignIn"

// Data
import { quizzes } from "../datasets/quizzes"

// CSS
import "../css/App.css"
import "../css/Quiz.css"

function App() {
    const [user] = useAuthState(auth)

    return (
        <Router>
            <div className="app">
                {user?
                    <>
                        <Navbar loggedIn={true} />
                        <Routes>
                            <Route path="/" element={ <Home /> } />
                            <Route path="/quizzes" element={ <QuizSelect /> } />
                            <Route
                                path="/quizzes/:id"
                                element={ <Quiz/> }
                                />
                            <Route path="/shop" element={ <Shop /> } />
                        </Routes>
                    </>
                    :
                    <>
                        <Navbar loggedIn={false} />
                        <div className="sign-in-container">
                            <SignIn />
                        </div>
                    </>
                }
            </div>
        </Router>
    );
}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default App;