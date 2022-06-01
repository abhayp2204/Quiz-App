import React, { useContext } from "react"
import { currentContext } from "./Quiz"
import "../../css/QuestionSelect.css"

function QuestionButton(props) {
    const [current, setCurrent] = useContext(currentContext)

    const handleQuestionSelect = (i) => {
        setCurrent(i)
    }

	return (
		<button className="qs-button" onClick={() => handleQuestionSelect(props.index)}>{props.index + 1}</button>
	)
}

export default QuestionButton
