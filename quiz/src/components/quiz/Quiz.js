import React, { useState, useContext } from "react"
import { query, quizListContext } from "../App"
import { useParams } from "react-router-dom"
import "../../css/Question.css"

import "firebase/compat/firestore"
import "firebase/compat/auth"
import firebase from "firebase/compat/app"
import { firestore } from "../../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

function Quiz(props) {
    const quizList = useContext(quizListContext)
    const { id } = useParams()
    const [newQuestion, setNewQuestion] = useState("")
    var db = firebase.firestore()
    const quizzesRef = firestore.collection("quizzes")
    
    if(!quizList) return

    const handleAddQuestion = async(e) => {
        e.preventDefault()
        Q.questions.push(newQuestion)

        if(!newQuestion) {
            return
        }

        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(doc.data().id === id) {
                    doc.ref.delete()
                }
            })
        })

        await quizzesRef.add({
            name: Q.name,
            id: Q.id,
            createdAt: Q.createdAt,
            questions: Q.questions,
            uid: Q.uid, 
        })

        setNewQuestion("")
    }

    
    var Q = undefined
    quizList.map(quiz => {
        if(quiz.id === id) {
            Q = quiz
        }
    })

    // Array of questions
    var questionList = []
    Q.questions && Q.questions.map(question => {
        questionList.push(<p>{question}</p>)
    })

    return (
        <div className="question-container">
            <p className="quiz-title">{Q.name}</p>
            <p>{questionList}</p>
            <form onSubmit={handleAddQuestion}>
                <input
                    className="add-question-input pop"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Question"
                />
                <button className="add-question-submit pop" type="submit">Add</button>
            </form>
        </div>
    )
}

export default Quiz