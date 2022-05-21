// React
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Firebase
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { useCollectionData } from "react-firebase-hooks/firestore"

// Components
import Quiz from "./quiz/Quiz"
import Navbar from "./Navbar"
import Home from "./Home"
import CreateQuiz from "./quiz/CreateQuiz"
import DeleteQuiz from "./quiz/DeleteQuiz"
import QuizSelect from "./quiz/QuizSelect"
import SignIn from "./auth/SignIn"

// CSS
import "../css/App.css"
import "../css/Quiz.css"

export const quizzesRef = firestore.collection("quizzes")
export const query = quizzesRef.orderBy("id").limit(50)

export const quizListContext = React.createContext()

function App() {
    const [user] = useAuthState(auth)
    const [quizList] = useCollectionData(query, {idField: "id"})

    return (
        <quizListContext.Provider value={quizList}>
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
                                element={ <Quiz /> }
                                />
                            <Route path="/createquiz" element={ <CreateQuiz /> } />
                            <Route path="/deletequiz" element={ <DeleteQuiz quizList={quizList} /> } />
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
        </quizListContext.Provider>
    );
}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default App;