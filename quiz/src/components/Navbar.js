import React, { useState } from "react"
import "../css/Navbar.css"
import { Link } from "react-router-dom"
import { auth } from "../firebase"

function Navbar(props) {
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
                    <Link style={navStyle} to="/shop">
                        <p>Shop</p>
                    </Link>
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
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default Navbar