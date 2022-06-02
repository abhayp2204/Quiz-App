import React, { useEffect, useState } from "react"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { firestore, storage } from "../firebase"
import { v4 } from "uuid"
import "../css/Profile.css"
import { query2, usersRef } from "./App"

function Profile() {
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [imageList, setImageList] = useState([])
    const imageListRef = ref(storage, "profile/")

    const uploadImage = (e) => {
        e.preventDefault()

        if(image === null) {
            alert("no image")
            return null
        }
        const imageRef = ref(storage, `profile/${image.name + v4()}`)
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                alert(url)
                setImageUrl(url)
                
                query2.get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        doc.ref.update({dp: url})
                    })
                })
            })
        })

        alert("Profile picture updated")
    }

	return (
		<div className="profile-container">
            <form>
                <input
                    type="file"
                    className="add-image"
                    onChange={(e) => {setImage(e.target.files[0])}}
                />
                <button onClick={(e) => uploadImage(e)}>Set</button>
            </form>
        </div>
	)
}

export default Profile
