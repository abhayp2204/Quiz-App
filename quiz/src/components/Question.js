import React, { Component } from "react"
import Option from "./Option"
import "../css/Question.css"

function Question(props) {
    return (
        <div className="question">
            <p className="title">{props.title}</p>
            <div className="options">
                {props.options.map((option, index) => {
                    console.log(index + ": " + option)
                    return (
                            <Option title={option}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Question