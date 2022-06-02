import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import "../css/Navbar.css"
import { auth } from "../firebase"
import Sidebar from "./Sidebar"
const Menu = require("../images/menu7.png")

function Navbar() {
    const [open, setOpen] = useState(false)
    const [user] = useAuthState(auth)

	return (
        <>
            <div className="navbar">
                <img className="icon" src={Menu} onClick={() => setOpen(!open)} />
            </div>
            <Sidebar loggedIn={true} open={open} />
            <Link to="profile">
                <img className="dp" src={auth.currentUser.photoURL} alt="dp" />
            </Link>
        </>
	)
}

export default Navbar
