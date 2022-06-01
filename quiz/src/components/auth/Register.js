import React, { useState, useContext } from "react"
import "../../css/Register.css"
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore, generateUID } from "../../firebase"
import { userListContext, usersRef } from "../App"
import { tags } from "../../data/tags"
import { random } from "../../functions"

function Register() {
    const userList = useContext(userListContext)
    const [username, setUsername] = useState("")

    const colors = [
        "#ED254E",
        "#F4FFFD",
        "#1EFFBC",
        "#C2E812",
        "#F17105",
        "#6610F2",
        "#7B1E7A",
    ]

    const registerUser = (e) => {
        alert("added")

        usersRef.add({
            username: username,
            uid: generateUID(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })

    }

	return (
		<div className="register-container">
            <form onSubmit={() => registerUser()}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            <div className="tag-container">
                {tags.map((tag, index) => {
                    return (
                        <div
                            className="tag"
                            key={index}
                            style={{backgroundColor: colors[random(colors.length)]}}
                        >
                            {tag}
                        </div>
                    )
                })}
            </div>
        </div>
	)
}

export default Register
