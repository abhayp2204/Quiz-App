import React from "react"
import "../css/Navbar.css"
import { Link } from "react-router-dom"

function Navbar() {
    const navStyle = {
        color: "white",
        textDecoration: "none",
    }

    return (
        <nav>
            <Link style={navStyle} to="/"><p>Home</p></Link>
            <Link style={navStyle} to="/about"><p>About</p></Link>
            <Link style={navStyle} to="/shop"><p>Shop</p></Link>
        </nav>
    )
}

export default Navbar