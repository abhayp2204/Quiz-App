import React, { useState, useContext } from "react"
import { query, quizListContext } from "../App"
import { useParams } from "react-router-dom"
import "../../css/Question.css"
import "../../css/AddQuestion.css"

import "firebase/compat/firestore"
import "firebase/compat/auth"
import { firestore } from "../../firebase"
import Option from "./Option"

function Quiz() {
    const quizList = useContext(quizListContext)
    const { id } = useParams()
    const quizzesRef = firestore.collection("quizzes")


    const [newQuestion, setNewQuestion] = useState("")
    const [optionA, setOptionA] = useState("")
    const [optionB, setOptionB] = useState("")
    const [optionC, setOptionC] = useState("")
    const [optionD, setOptionD] = useState("")
    const [correctOptions, setCorrectOptions] = useState([])

    if(!quizList) return

    const handleAddQuestion = async(e) => {
        e.preventDefault()
        Q.questions.push({
            name: newQuestion,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            correctOptions: correctOptions,
        })

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
        setOptionA("")
        setOptionB("")
        setOptionC("")
        setOptionD("")
        setCorrectOptions([])
    }

    const handleCheckBox = (letter) => {
        correctOptions.push(letter)
    }

    
    var Q = undefined
    quizList.map(quiz => {
        if(quiz.id === id) {
            Q = quiz
        }
    })

    // Array of questions
    var questionList = []
    Q.questions && Q.questions.map((question, index) => {
        console.log("Questionnnn = ", question.correctOptions)
        questionList.push(
            <div className="question-container">

                <p className="question" key={index}>
                    {question.name}
                </p>

                <Option option={question.optionA} correct={question.correctOptions.includes("A")} />
                <Option option={question.optionB} correct={question.correctOptions.includes("B")} />
                <Option option={question.optionC} correct={question.correctOptions.includes("C")} />
                <Option option={question.optionD} correct={question.correctOptions.includes("D")} />
            </div>
        )
    })

    return (
        <div className="quiz-container">
            <p className="quiz-title">{Q.name}</p>
            {questionList}

            <form className="add-question-form" onSubmit={handleAddQuestion}>
                <input
                    className="add-question-input"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Question"
                />

                <div className="form-option">
                    <input
                        className="add-option"
                        value={optionA}
                        onChange={(e) => setOptionA(e.target.value)}
                        placeholder="A"
                    />
                    <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleCheckBox("A")}
                        value="A"
                        />
                </div>

                <div className="form-option">
                    <input
                        className="add-option"
                        value={optionB}
                        onChange={(e) => setOptionB(e.target.value)}
                        placeholder="B"
                        />
                    <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleCheckBox("B")}
                        value="B"
                        />
                </div>

                <div className="form-option">
                    <input
                        className="add-option"
                        value={optionC}
                        onChange={(e) => setOptionC(e.target.value)}
                        placeholder="C"
                        />
                    <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleCheckBox("C")}
                        value="C"
                        />
                </div>

                <div className="form-option">
                    <input
                        className="add-option"
                        value={optionD}
                        onChange={(e) => setOptionD(e.target.value)}
                        placeholder="D"
                        />
                    <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleCheckBox("D")}
                        value="D"
                        />
                </div>

                <button className="add-question-submit" type="submit">Add</button>
            </form>
        </div>
    )
}

export default Quiz