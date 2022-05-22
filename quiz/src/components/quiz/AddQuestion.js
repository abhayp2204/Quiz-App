import React, { useState, useContext } from "react"
import { firestore } from "../../firebase"
import { useParams } from "react-router-dom"
import { query, quizListContext } from "../App"
import "../../css/AddQuestion.css"

function AddQuestion() {

    const { id } = useParams()
    const quizList = useContext(quizListContext)
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
        const cb = document.getElementById(`option-${letter}`)
        if(!cb.checked) return
        correctOptions.push(letter)
    }

    var Q = undefined
    quizList.map(quiz => {
        if(quiz.id === id) {
            Q = quiz
        }
    })

	return (
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
                    id="option-A"
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
                    id="option-B"
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
                    id="option-C"
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
                    id="option-D"
                />
            </div>

            <button className="add-question-submit" type="submit">Add</button>
        </form>
	)
}

export default AddQuestion
