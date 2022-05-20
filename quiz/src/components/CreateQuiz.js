import React, { useState } from "react"
import "../css/CreateQuiz.css"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore } from "../firebase"

function CreateQuiz() {
    const quizzesRef = firestore.collection("quizzes")

    const [quizName, setQuizName] = useState("")
    const [question1, setQuestion1] = useState("")
    const [question2, setQuestion2] = useState("")

    const handleCreateQuiz = async(e) => {
        e.preventDefault()
        const { uid } = auth.currentUser

        if(!quizName.length) {
            alert("Quiz Name is a required field")
        }

        if(!question1.length) {
            alert("Question 1 is a required field")
        }

        if(!question2.length) {
            alert("Question 2 is a required field")
        }

        await quizzesRef.add({
            name: quizName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            question1: question1,
            question2: question2,
            uid, 
        })

        alert(`${quizName} quiz has been created!`)

        setQuizName("")
        setQuestion1("")
        setQuestion2("")
    }

    return (
        <form className="create-quiz-form" onSubmit={handleCreateQuiz}>
            <input
                className="create-quiz-name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Quiz Name"
            />
            <input
                className="create-quiz-name"
                value={question1}
                onChange={(e) => setQuestion1(e.target.value)}
                placeholder="Question 1"
            />
            <input
                className="create-quiz-name"
                value={question2}
                onChange={(e) => setQuestion2(e.target.value)}
                placeholder="Question 2"
            />
            <button className="create-quiz-submit" type="submit">Create</button>
        </form>
    )
}

export default CreateQuiz