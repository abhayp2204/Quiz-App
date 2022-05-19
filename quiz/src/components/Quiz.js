import React from "react"
import Question from "./Question"
// import { quizQuestions } from "../datasets/quizQuestions"

function Quiz(props) {

    return (
        <>
            {props.questions && props.questions.map((question) => {
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