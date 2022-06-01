import React, { useState, useContext } from "react"
import "../../css/Option.css"
import { correctAnswerContext } from "./Question"
import { selectedOptionContext } from "./Question"

function Option(props) {
    const bgcolor = props.selected? "#AAEEDD" : "white"

    const [correctAnswer, setCorrectAnswer] = useContext(correctAnswerContext)
    const [selectedOption, setSelectedOption] = useContext(selectedOptionContext)

    const handleSelectOption = (e) => {
        setCorrectAnswer(props.correct)
        setSelectedOption(props.letter)
        alert(props.letter)
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