import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import "../css/Navbar.css"
import { auth } from "../firebase"
import Sidebar from "./Sidebar"
import { userListContext } from "./App"
const Menu = require("../images/menu7.png")

function Navbar() {
    const [open, setOpen] = useState(false)
    const [user] = useAuthState(auth)
    const userList = useContext(userListContext)  

    if(!userList) return
    
    let U = null
    userList.map(user => {
        if(user.email === auth.currentUser.email) {
            U = user
            return
        }
    })
    console.log(U)

	return (
        <>
            <div className="navbar">
                <img className="icon" src={Menu} onClick={() => setOpen(!open)} />
            </div>
            <Sidebar loggedIn={true} open={open} />
            <Link to="profile">
                <img className="dp" src={U.dp} alt="dp" />
            </Link>
        </>
	)
}

export default Navbar
