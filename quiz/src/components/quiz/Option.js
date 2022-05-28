import React, { useState, useContext } from "react"
import "../../css/Option.css"
import { correctAnswerContext } from "./Question"
import { selectedOptionContext } from "./Question"

function Option(props) {
    const [select, setSelect] = useState(false)
    const correctColor = "#69DC9E"
    const wrongColor = "#F44708"
    const optionColor = (props.correct? correctColor : wrongColor)
    // const bgcolor = select? optionColor : "white"
    const bgcolor = props.selected? "#AAEEDD" : "white"

    const [correctAnswer, setCorrectAnswer] = useContext(correctAnswerContext)
    const [selectedOption, setSelectedOption] = useContext(selectedOptionContext)

    const handleSelectOption = (e) => {
        setCorrectAnswer(props.correct)
        setSelectedOption(props.letter)
        setSelect(!select)
    }

    return (
        <p
            className="option"
            style={{ backgroundColor: bgcolor }}
            onClick={() => handleSelectOption()}
        >
            {props.option}
        </p>
    )
}

export default Option