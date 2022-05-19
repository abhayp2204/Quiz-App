import React from "react"
import "../css/Quiz.css"
import { Link } from "react-router-dom"
import "../css/Quiz.css"
import { quizzes } from "../datasets/quizzes"

function QuizSelect() {
    const navStyle = {
        color: "white",
        textDecoration: "none",
        cursor: "default"
    }

    const listComp = []

    {quizzes && quizzes.map((quiz) => {
        listComp.push(
            <Link key={quiz.id} style={navStyle} to={String(quiz.id)}>
                <div>{quiz.name}</div>
            </Link>
        )
    })}


    return (
        <div className="quiz-list">
            {listComp}
        </div>
    )
}

export default QuizSelect