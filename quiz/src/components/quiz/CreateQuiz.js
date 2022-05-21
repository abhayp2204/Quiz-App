import React, { useState } from "react"
import "../../css/CreateQuiz.css"

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore, generateUID } from "../../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

function CreateQuiz() {
    const quizzesRef = firestore.collection("quizzes")
    const query = quizzesRef.orderBy("name").limit(50)
    const [quizList] = useCollectionData(query, {idField: "id"})

    const [quizName, setQuizName] = useState("")

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
            />
            <button className="create-quiz-submit" type="submit">Create</button>
        </form>
    )
}

export default CreateQuiz