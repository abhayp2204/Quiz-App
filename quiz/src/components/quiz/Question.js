import React from "react"
import Option from "./Option"

function Question(props) {
    const {question} = props

	return (
		<div className="question-container" key={question.uid}>
            <p className="question">
                {question.name}
            </p>

            <Option
                option={question.optionA}
                correct={question.correctOptions.includes("A")}
            />
            <Option
                option={question.optionB}
                correct={question.correctOptions.includes("B")}
            />
            <Option
                option={question.optionC}
                correct={question.correctOptions.includes("C")}
            />
            <Option
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
}

export default Question
