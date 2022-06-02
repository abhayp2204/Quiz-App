import React, { useState, useContext, useEffect } from "react"
import "../../css/Register.css"
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore, generateUID } from "../../firebase"
import { userListContext, usersRef } from "../App"
import { taglist } from "../../data/tags"
import Tags from "./Tags"
import { Navigate } from "react-router-dom"

function Register() {
    const userList = useContext(userListContext)
    const [selectedTags, setSelectedTags] = useState([])
    const [error, setError] = useState(null)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    const registerUser = (e) => {
        e.preventDefault()

        if(!username.length) {
            setError("Username is a required field")
            return
        }

        if(!password.length) {
            setError("Password is a required field")
            return
        }

        if(!confirmPassword.length) {
            setError("Confirm Password is a required field")
            return
        }

        if(password.localeCompare(confirmPassword)) {
            setError("Passwords do not match")
            setConfirmPassword("")
            return
        }

        let exists = false
        userList.map(user => {
            if(user.email === auth.currentUser.email) {
                exists = true
                return
            }
        })
        if(exists) {
            setError("An account with this email already exists")
            return
        }

        usersRef.add({
            username: username,
            dp: auth.currentUser.photoURL,
            nickname: auth.currentUser.displayName,
            email: auth.currentUser.email,
            password: password,
            uid: generateUID(),
            grade: document.getElementById("grade-select").value,
            tags: selectedTags,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        
        setError(null)
    }

	return (
        <div className="register-container">
            <form className="form-container" onSubmit={(e) => registerUser(e)}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <select name="grade" id="grade-select">
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                    <option value="UG1">UG1</option>
                    <option value="UG2">UG2</option>
                    <option value="UG3">UG3</option>
                    <option value="UG4">UG4</option>
                    <option value="PG1">PG1</option>
                    <option value="PG2">PG2</option>
                </select>
                <button type="submit">Register</button>
            </form>

            {error && <div className="error">{ error }</div>}

            <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

            {selectedTags.map((tag, index) => {
                return <p key={index}>{tag}</p>
            })}
        </div>
	)
}

export default Register
