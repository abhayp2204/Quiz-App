import React, { useContext, useState } from "react"
import "../../css/Option.css"
import { quizListContext } from "../App"

function Option(props) {
    const [quizList] = useContext(quizListContext)
    const [select, setSelect] = useState(false)

    const correctColor = "#69DC9E"
    const wrongColor = "#F44708"
    const optionColor = (props.correct? correctColor : wrongColor)
    const bgcolor = select? optionColor : "white"

    function handleSelect() {
        setSelect(!select)
    }

    return (
        <p
            className="option"
            style={{ backgroundColor: bgcolor }}
            onClick={() => handleSelect()}
        >
            {props.option}
        </p>
    )
}

export default Option