import React, { useState, useEffect } from "react"
import { timeFormat } from "../../functions"
import "../../css/Timer.css"

function Timer(props) {
    const [time, setTime] = useState(props.totalTime)
    const [timerOn, setTimerOn] = useState(false)
    const timeInterval = 1000
    

    useEffect(() => {
        let interval = null
        
        if(timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime > 0? prevTime - 1 : 0)
            }, timeInterval)
        }
        else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [timerOn])


	return (
        time? 
            <div className="time">
                <div className="timer">{timeFormat(time)}</div>
                <button onClick={() => setTimerOn(true)}> Start </button>
                <button onClick={() => setTimerOn(false)}> Stop </button>
                <button onClick={() => setTime(0)}> Reset </button>
            </div>
            :
            <div className="time">Time Up!</div>
	)
}

export default Timer
