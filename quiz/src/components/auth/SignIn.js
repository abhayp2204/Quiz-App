import React, { useEffect } from "react"
import { auth } from "../../firebase"
import firebase from "firebase/compat/app"
import "../../css/Auth.css"
import { useAuthState } from "react-firebase-hooks/auth"

function SignIn() {
    const [user] = useAuthState(auth)

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

    return (
        <button className="google-sign-in" onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}

export default SignIn