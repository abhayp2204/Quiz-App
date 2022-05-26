import React, { useState, useContext } from "react"
import { quizListContext } from "../App"
import { useParams } from "react-router-dom"
import "../../css/Question.css"

import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"
import "firebase/storage"
import Option from "./Option"


function Quiz(props) {
    const { id } = useParams()
    const quizList = useContext(quizListContext)
    const [allImages, setAllImages] = useState([])

    if(!quizList) return

    var Q = undefined
    quizList.map(quiz => {
        if(quiz.id === id) {
            Q = quiz
        }
    })

    // Array of questions
    var questionList = []
    Q.questions && Q.questions.map((question, index) => {
        questionList.push(
            <div className="question-container" key={index}>

                <p className="question" key={index}>
                    {question.name}
                </p>

                <Option
                    key={`${index}A`}
                    option={question.optionA}
                    correct={question.correctOptions.includes("A")}
                />
                <Option
                    key={`${index}B`}
                    option={question.optionB}
                    correct={question.correctOptions.includes("B")}
                />
                <Option
                    key={`${index}c`}
                    option={question.optionC}
                    correct={question.correctOptions.includes("C")}
                />
                <Option
                    key={`${index}D`}
                    option={question.optionD}
                    correct={question.correctOptions.includes("D")}
                />
                {question.url && <img
                    className="question-image"
                    src={question.url}
                    alt="not found"
                />}
            </div>
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