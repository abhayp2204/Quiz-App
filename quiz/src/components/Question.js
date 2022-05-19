import React from "react"
import "../css/Question.css"

function Question(props) {
    return (
        <div className="question">
            <p className="title">{props.title}</p>
            <div className="options">
                {props.options.map(option => {
                    return (
                        <p className="option">
                            {option}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default Question