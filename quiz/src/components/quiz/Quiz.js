import React, { useState, useContext } from "react"
import { quizListContext } from "../App"
import { useParams } from "react-router-dom"
import "../../css/Question.css"

import "firebase/compat/firestore"
import "firebase/compat/auth"
import { firestore } from "../../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

function Quiz(props) {
    const quizList = useContext(quizListContext)
    const { id } = useParams()
    const [newQuestion, setNewQuestion] = useState("")
    
    if(!quizList) return

    const handleAddQuestion = async(e) => {
        e.preventDefault()
        Q.questions.push(newQuestion)

        if(!newQuestion) {
            return
        }

        console.log(Q.questions)
        setNewQuestion("")
    }

    
    var Q = undefined
    quizList.map(quiz => {
        if(quiz.id === id) {
            Q = quiz
        }
    })


    return (
        <div className="question-container">
            <p className="quiz-title">{Q.name}</p>
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