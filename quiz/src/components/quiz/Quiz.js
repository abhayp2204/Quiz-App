import React, { useState, useContext } from "react"
import { quizListContext } from "../App"
import { useParams } from "react-router-dom"
import "../../css/Question.css"

import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"
import "firebase/storage"
import Question from "./Question"


function Quiz() {
    const { id } = useParams()
    const quizList = useContext(quizListContext)
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
        <div className="quiz-container">
            <p className="quiz-title">{Q.name}</p>
            {questionList}
        </div>
    )
}

export default Quiz