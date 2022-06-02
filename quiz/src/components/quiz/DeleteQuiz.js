import React from "react"
import "../../css/quiz/DeleteQuiz.css"

import "firebase/compat/firestore"
import "firebase/compat/auth"
import { query } from "../App"
import { auth, firestore } from "../../firebase"

function DeleteQuiz(props) {
    const { quizList } = props

    const handleDeleteQuiz = async(e, id) => {
        e.preventDefault()

        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(doc.data().id === id) {
                    doc.ref.delete()
                }
            })
        })

        alert("Deleted Quiz!")
    }

    // * Create the list
    const deleteQuizList = []
    {quizList && quizList.map(quiz => {
        deleteQuizList.push(
            <p
                key={quiz.id}
                className="delete-quiz-name"
                onClick={(e) => handleDeleteQuiz(e, quiz.id)}
            >
                {quiz.name}
            </p>
        )
    })}

    return (
        <div className="delete-quiz pop">
            {deleteQuizList}
        </div>
    )
}

export default DeleteQuiz