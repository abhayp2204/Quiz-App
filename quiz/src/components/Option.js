import React, { useState } from "react"

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
            {props.title}
        </p>
    )
}

export default Option