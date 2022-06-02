import React from "react"
import "../css/Sidebar.css"
import { Link, NavLink } from "react-router-dom"
import { auth, isAdmin } from "../firebase"

// Images
const Home = require("../images/home.jpg")
const Puzzle = require("../images/quiz.png")
const Add = require("../images/add.png")
const Trash = require("../images/trash.png")

function Sidebar(props) {
    if(!auth.currentUser) return
    const { uid } = auth.currentUser

    const navStyle = {
        display: "flex",
        alignItems: "center",
        color: "black",
        textDecoration: "none",
    }

    const widthStyle = {
        width: props.open? "50px" : "280px"
    }

    return (
        <nav>
            {props.loggedIn?
                <div className="link-container" style={widthStyle} >
                    <NavLink className="link" style={navStyle} to="/" activeClassName="active" >
                        <img className="sidebar-icon" src={Home} alt="home icon" />
                        <div className="link-name">Home</div>
                    </NavLink>
                    <NavLink className="link" style={navStyle} to="/quizzes">
                        <img className="sidebar-icon" src={Puzzle} alt="puzzle icon" />
                        <div className="link-name">Quizzes</div>
                    </NavLink>
                    
                    {isAdmin(uid) && (
                        <>
                            <NavLink className="link" style={navStyle} to="/createquiz">
                                <img className="sidebar-icon" src={Add} alt="add quiz" />
                                <div className="link-name">Create Quiz</div>
                            </NavLink>
                            <NavLink className="link" style={navStyle} to="/deletequiz">
                                <img className="sidebar-icon" src={Trash} alt="add quiz" />
                                <div className="link-name">Delete Quiz</div>
                            </NavLink>
                        </>
                    )}
                    
                    {/* <SignOut /> */}
                </div>
                :
                <>
                    <NavLink className="link" style={navStyle} to="/">
                        <div className="link-name">Leaf Quiz</div>
                    </NavLink>
                </>
            }
        </nav>
    )
}

function SignOut() {
    return auth.currentUser && (
        <NavLink className="sign-out" onClick={() => auth.signOut()} to="/">
            Sign Out
        </NavLink>
    )
}

export default Sidebar