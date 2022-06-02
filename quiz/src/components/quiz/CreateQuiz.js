import React, { useState, useEffect, createRef } from "react"
import "../../css/quiz/CreateQuiz.css"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore, generateUID } from "../../firebase"

function CreateQuiz() {
    const quizzesRef = firestore.collection("quizzes")
    const inputRef = createRef()
    const [quizName, setQuizName] = useState("")

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleCreateQuiz = async(e) => {
        e.preventDefault()
        const { uid } = auth.currentUser

        if(!quizName.length) {
            alert("Quiz Name is a required field")
        }

        await quizzesRef.add({
            name: quizName,
            id: generateUID(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            questions: [],
            uid, 
        })

        alert(`${quizName} quiz has been created!`)
        setQuizName("")
    }

    return (
        <form className="create-quiz-form" onSubmit={handleCreateQuiz}>
            <input
                className="create-quiz-name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Quiz Name"
                ref={inputRef}
            />
            <button className="create-quiz-submit" type="submit">Create</button>
        </form>
    )
}

export default CreateQuiz