import React, { useState, createContext, useContext } from "react"
import Option from "./Option"
import { marksContext, currentContext } from "./Quiz"

export const correctAnswerContext = createContext()
export const selectedOptionContext = createContext()

function Question(props) {
    const {question} = props
    const [marks, setMarks] = useContext(marksContext)
    const [current, setCurrent] = useContext(currentContext)
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")

    const correctColor = "#69DC9E"
    const wrongColor = "#F44708"
    const optionColor = (props.correct? correctColor : wrongColor)
    // const bgcolor = select? optionColor : "white"

    const submitQuestion = () => {
        setMarks(m => m + correctAnswer)
        setCurrent(i => i + 1)
    }

	return (
        <>
		<div
            className="question-container"
            key={question.uid}
            style={{visibility: "visible"}}
        >
            <p className="question">
                {question.name}
            </p>

            <correctAnswerContext.Provider value={[correctAnswer, setCorrectAnswer]} >
            <selectedOptionContext.Provider value={[selectedOption, setSelectedOption]} >
            <Option
                option={question.optionA}
                correct={question.correctOptions.includes("A")}
                letter="A"
                selected={"A" === selectedOption}
            />
            <Option
                option={question.optionB}
                correct={question.correctOptions.includes("B")}
                letter="B"
                selected={"B" === selectedOption}
            />
            <Option
                option={question.optionC}
                correct={question.correctOptions.includes("C")}
                letter="C"
                selected={"C" === selectedOption}
            />
            <Option
                option={question.optionD}
                correct={question.correctOptions.includes("D")}
                letter="D"
                selected={"D" === selectedOption}
            />
            </selectedOptionContext.Provider>
            </correctAnswerContext.Provider>
            {question.url && <img
                className="question-image"
                src={question.url}
                alt="not found"
            />}
        </div>
        <button
            className="submit-ans"
            onClick={() => submitQuestion()}
        >
            Next Question
        </button>
        </>
	)
}

export default Question
