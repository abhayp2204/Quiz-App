import React from "react"
import "../../css/quiz/QuestionSelect.css"
import QuestionButton from "./QuestionButton"

function QuestionSelect(props) {
    const Q = props.quiz
    if(!Q.questions) return

    const questionButtons = []
    Q.questions.map((question, index) => {
        questionButtons.push(<QuestionButton index={index} />)
    })

	return (
		<div className="qs-container">
            {questionButtons}
        </div>
	)
}

export default QuestionSelect
