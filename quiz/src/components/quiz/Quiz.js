import React, { useState, useContext, useEffect, createContext } from "react"
import { quizListContext } from "../App"
import { useParams } from "react-router-dom"
import "../../css/Question.css"

import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"
import "firebase/storage"
import Question from "./Question"
import Timer from "./Timer"

export const marksContext = createContext()

function Quiz() {
    const { id } = useParams()
    const quizList = useContext(quizListContext)
    const [marks, setMarks] = useState(0)
    
    
    
    if(!quizList) return
    
    
    var Q = undefined
    quizList.map(quiz => {
        if(quiz.id === id) {
            Q = quiz
        }
    })
    if(!Q) return

    // Array of questions
    var questionList = []
    Q.questions && Q.questions.map((question) => {
        questionList.push(
            <Question question={question} key={question.uid} />
        )
    })

    return (
        <marksContext.Provider value={[marks, setMarks]}>
            <div className="quiz-container">
                <p className="quiz-title">{Q.name}</p>
                <Timer totalTime={4} />
                {marks}
                {questionList}
            </div>
        </marksContext.Provider>
    )
}

export default Quiz