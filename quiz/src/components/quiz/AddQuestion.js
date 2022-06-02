import { useParams } from "react-router-dom"
import React, { useState, useContext, useEffect } from "react"
import { query, quizListContext } from "../App"
import "../../css/quiz/AddQuestion.css"
import { firestore, generateUID, storage } from "../../firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import { isValidFileType } from "../../functions"

function AddQuestion() {
    const { id } = useParams()
    const quizList = useContext(quizListContext)
    const quizzesRef = firestore.collection("quizzes")
    const imageListRef = ref(storage, "images/")

    
    const [newQuestion, setNewQuestion] = useState("")
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [imageList, setImageList] = useState([])
    const [optionA, setOptionA] = useState("")
    const [optionB, setOptionB] = useState("")
    const [optionC, setOptionC] = useState("")
    const [optionD, setOptionD] = useState("")
    const [correctOptions, setCorrectOptions] = useState([])

    useEffect(() => {
        listAll(imageListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url])
                })
            })
        })
    }, [])

    const uploadImage = (e) => {
        e.preventDefault()
        if(image === null) return

        const imageRef = ref(storage, `images/${image.name + v4()}`)

        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url])
                setImageUrl(url)
            })
        })
    }
    
    const handleAddQuestion = async(e) => {
        e.preventDefault()

        if(!newQuestion) return
        if(!optionA) return
        if(!optionB) return
        if(!optionC) return
        if(!optionD) return
        if(!correctOptions) return

        Q.questions.push({
            name: newQuestion,
            uid: generateUID(),
            url: imageUrl,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            correctOptions: correctOptions,
        })
        
        
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(doc.data().id === id) {
                    doc.ref.update({questions: Q.questions})
                }
            })
        })
        
        // quizzesRef.add({
        //     name: Q.name,
        //     id: Q.id,
        //     createdAt: Q.createdAt,
        //     questions: Q.questions,
        //     uid: Q.uid, 
        // })

        setNewQuestion("")
        setImageUrl(null)
        setOptionA("")
        setOptionB("")
        setOptionC("")
        setOptionD("")
        setCorrectOptions([])
    }

    const handleCheckBox = (letter) => {
        const cb = document.getElementById(`option-${letter}`)
        if(!cb.checked) return
        correctOptions.push(letter)
    }

    if(!quizList) return

    var Q = undefined
    quizList.map(quiz => {
        if(quiz.id === id) {
            Q = quiz
        }
    })

	return (
		<form className="add-question-form" onSubmit={handleAddQuestion}>
            <input
                className="add-question-input"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Question"
                />

            <input
                className="add-image"
                type="file"
                onChange={(e) => {setImage(e.target.files[0])}}
            />
            <button onClick={uploadImage}>Upload</button>
            {image && <div className="image-output">{image.name}</div>}

            <div className="form-option">
                <input
                    className="add-option"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    placeholder="A"
                    />
                <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => handleCheckBox("A")}
                    value="A"
                    id="option-A"
                    />
            </div>

            <div className="form-option">
                <input
                    className="add-option"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    placeholder="B"
                    />
                <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => handleCheckBox("B")}
                    value="B"
                    id="option-B"
                    />
            </div>

            <div className="form-option">
                <input
                    className="add-option"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    placeholder="C"
                    />
                <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => handleCheckBox("C")}
                    value="C"
                    id="option-C"
                    />
            </div>

            <div className="form-option">
                <input
                    className="add-option"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    placeholder="D"
                    />
                <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => handleCheckBox("D")}
                    value="D"
                    id="option-D"
                    />
            </div>

            <button className="add-question-submit" type="submit">Add</button>
        </form>
	)
}

export default AddQuestion
