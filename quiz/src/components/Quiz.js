import React from "react"
import { useParams } from "react-router-dom"
import { quizzes } from "../datasets/quizzes"
import Question from "./Question"
// import { quizQuestions } from "../datasets/quizQuestions"

function Quiz() {
    const { id } = useParams()
    const index = Number(id) - 1

    return (
        <>
            {quizzes[index].questions && quizzes[index].questions.map((question) => {
                return (
                    <Question 
                        key={question.id}
                        title={question.title}
                        options={question.options}
                        answer={question.answer}
                    />
                )
            })}
        </>
    )
}

export default Quiz