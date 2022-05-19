import React from "react"
import Question from "./Question"
import { quizQuestions } from "../datasets/quizQuestions"

function Quiz() {

    return (
        <>
            {quizQuestions.map((question) => {
                return <Question key={question.id} title={question.title} options={question.options}/>
            })}
            {/* <Question title="When did World War I start?" />
            <Question title="What is 7 + 5?"/>
            <Question title="What is the formula of Methane?"/> */}
        </>
    )
}

export default Quiz