import React, { Component } from "react"
import Option from "./Option"
import "../css/Question.css"

function Question(props) {
    return (
        <div className="question">
            <p className="title">{props.title}</p>
            <div className="options">
                {props.options.map((option, index) => {
                    return (
                            <Option
                                key={index}
                                id={index}
                                title={option}
                                answer={props.answer}
                            />
                    )
                })}
            </div>
        </div>
    )
}

export default Question