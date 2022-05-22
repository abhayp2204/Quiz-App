import React, { useState } from "react"
import "../../css/Option.css"

function Option(props) {
    const [select, setSelect] = useState(false)
    const bgcolor = select? "#06d6a0" : ""

    function handleSelect() {
        console.log(props.id === props.answer - 1? "correct" : "wrong")
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