import React, { useState } from "react"
import "../css/Navbar.css"
import { Link } from "react-router-dom"
import { auth } from "../firebase"

function Navbar() {
    const navStyle = {
        color: "white",
        textDecoration: "none",
    }

    return (
        <nav>
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
        </nav>
    )
}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default Navbar