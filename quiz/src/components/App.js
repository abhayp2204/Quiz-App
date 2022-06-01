// React
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Firebase
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore, isAdmin } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"

// Components
import Quiz from "./quiz/Quiz"
import AddQuestion from "./quiz/AddQuestion"
import Navbar from "./Navbar"
import Home from "./Home"
import CreateQuiz from "./quiz/CreateQuiz"
import DeleteQuiz from "./quiz/DeleteQuiz"
import QuizSelect from "./quiz/QuizSelect"
import Register from "./auth/Register"
import SignIn from "./auth/SignIn"

// CSS
import "../css/App.css"

// Global
export const quizzesRef = firestore.collection("quizzes")
export const query = quizzesRef.orderBy("id").limit(50)
export const quizListContext = React.createContext()

export const usersRef = firestore.collection("users")
export const query2 = usersRef.orderBy("id").limit(50)
export const userListContext = React.createContext()

function App() {
    const [user] = useAuthState(auth)
    const [quizList] = useCollectionData(query, {idField: "id"})
    const [userList] = useCollectionData(query, {idField: "id"})

    // Log in
    if(!user) {
        return (
            <>
                <Navbar loggedIn={false} />
                <div className="sign-in-container">
                    <SignIn />
                </div>
            </>
        )
    }

    const { uid } = auth.currentUser

    return (
        <quizListContext.Provider value={quizList}>
        <userListContext.Provider value={userList}>
            <Router>
                {user?
                    // TODO: User is logged in
                    <>
                    <Navbar loggedIn={true} />
                    <Register />
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/quizzes" element={ <QuizSelect /> } />
                        <Route
                            path="/quizzes/:id"
                            element={ 
                                <>
                                    <Quiz />
                                    {isAdmin(uid) && (
                                        <AddQuestion />
                                    )}
                                </>
                            }
                        />
                        {isAdmin(uid) && (
                            <>
                                <Route path="/createquiz" element={ <CreateQuiz /> } />
                                <Route path="/deletequiz" element={ <DeleteQuiz quizList={quizList} /> } />
                            </>
                        )}
                    </Routes>
                    </>
                    :
                    // TODO: User is not logged in
                    <>
                        <Navbar loggedIn={false} />
                        <div className="sign-in-container">
                            <SignIn />
                        </div>
                    </>
                }
            </Router>
        </userListContext.Provider>
        </quizListContext.Provider>
    );
}

export default App;