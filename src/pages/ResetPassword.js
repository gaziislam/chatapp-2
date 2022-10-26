import React from "react"
import {
  getAuth,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
} from "firebase/auth"
import { TextField, Button } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {
  const auth = getAuth()
  const nevigate = useNavigate()

  let [email, setEmail] = useState("")

  // Password Reset function

  let handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        nevigate("/login", {
          state: { msg: "Check your email or reset password" },
        })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error)
      })
  }

  return (
    <div className="forgotpassword">
      <div className="box">
        <h2 style={{ marginBottom: "20px" }}>Reset Password</h2>
        <div className="forgot">
          <h2>Forgot Password </h2>
          <p>To Reset your password, enter your email address below</p>
          <TextField
            id="outlined-basic"
            label="Enrer Email"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            style={{
              width: "100%",
              padding: "15px 0",
              borderRadius: "8px",
              background: "#5F35F5",
              marginTop: "20px",
            }}
            variant="contained"
            onClick={handlePasswordReset}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
