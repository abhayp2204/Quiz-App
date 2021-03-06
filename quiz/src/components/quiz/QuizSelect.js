import React from "react"
import "../../css/quiz/Quiz.css"
import { Link } from "react-router-dom"
import { firestore } from "../../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

const navStyle = {
    color: "white",
    textDecoration: "none",
    cursor: "default"
}

function QuizSelect() {
    const quizzesRef = firestore.collection("quizzes")
    const query = quizzesRef.orderBy("id").limit(50)
    const [quizList] = useCollectionData(query, {idField: "id"})

    const listComp = []
    quizList && quizList.map(quiz => {
        listComp.push(
            <Link
                key={quiz.id}
                style={navStyle}
                to={String(quiz.id)}
            >
                <div>{quiz.name}</div>
            </Link>
        )
    })
    
    return (
        <div className="quiz-list pop">
            {listComp}
        </div>
    )
}

export default QuizSelect