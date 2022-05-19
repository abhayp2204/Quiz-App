import React, { useState } from "react"

function Option(props) {
    const [bgcolor, setBgcolor] = useState("")

    return (
        <p
            className="option"
            style={{ backgroundColor: bgcolor }}
            onClick={() => setBgcolor("lime")}
        >
            {props.title}
        </p>
    )
}

export default Option