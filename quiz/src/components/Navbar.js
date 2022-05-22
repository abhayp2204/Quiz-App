import React from "react"
import "../css/Navbar.css"
import { Link } from "react-router-dom"
import { auth, isAdmin } from "../firebase"

function Navbar(props) {
    if(!auth.currentUser) return
    const { uid } = auth.currentUser

    const navStyle = {
        color: "white",
        textDecoration: "none",
    }

    return (
        <nav>
            {props.loggedIn?
                <>
                    <Link style={navStyle} to="/">
                        <p>Home</p>
                    </Link>
                    <Link style={navStyle} to="/quizzes">
                        <p>Quizzes</p>
                    </Link>
                    
                    {isAdmin(uid) && (
                        <>
                            <Link style={navStyle} to="/createquiz">
                                <p>Create Quiz</p>
                            </Link>
                            <Link style={navStyle} to="/deletequiz">
                                <p>Delete Quiz</p>
                            </Link>
                        </>
                    )}
                    
                    <SignOut />
                </>
                :
                <>
                    <Link style={navStyle} to="/">
                        <p>Leaf Quiz</p>
                    </Link>
                </>
            }
            
        </nav>
    )
}

function SignOut() {
    return auth.currentUser && (
        <Link className="sign-out" onClick={() => auth.signOut()} to="/">
            Sign Out
        </Link>
    )
}

export default Navbar