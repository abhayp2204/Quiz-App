import React from "react"
import { useParams } from "react-router-dom"
import "../../css/Question.css"

import "firebase/compat/firestore"
import "firebase/compat/auth"

function Quiz(props) {
    const { id } = useParams()
    
    var Q = undefined
    props.quizList.map(quiz => {
        if(quiz.id === id) {
            console.log("access: quiz:", quiz)
            Q = quiz
        }
    })

    return (
        <div className="question-container">
            <h1>{Q.name}</h1>
        </div>
    )
}

export default Quiz