import React, { useState } from "react"
import {
  Grid,
  TextField,
  Button,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { Link, useNavigate } from "react-router-dom"
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth"

const Registration = () => {
  //Authentication (Class 25 part2)
  const auth = getAuth()
  const [open, setOpen] = React.useState(false)
  let navigate = useNavigate()
  // All the states

  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [confirmPassword, setConfirmPassword] = useState("")

  // error message

  let [nameerr, setNamerr] = useState("")
  let [emailerr, setEmailerr] = useState("")
  let [passworderr, setPassworderr] = useState("")
  let [confirmpassworderr, setConfirmpassworderr] = useState("")
  let [passwordlengtherr, setPasswordlengtherr] = useState("")
  let [matchPassword, setMatchPassword] = useState("")
  let [existsemailerr, setExistsemailerr] = useState("")

  const handleSubmit = () => {
    console.log("password", password.length)
    if (!name) {
      setNamerr("Please enter A name")
    } else if (!email) {
      setEmailerr("Please enter An email")
      setNamerr("")
    } else if (!password) {
      setPassworderr("Please enter A password")
      setEmailerr("")
    } else if (password.length < 8) {
      setPasswordlengtherr("Password must be greter than or equal to 8")
      setPassworderr("")
      setConfirmpassworderr("")
    } else if (!confirmPassword) {
      setConfirmpassworderr("Please confirm password")
      setPasswordlengtherr("")
    } else if (password !== confirmPassword) {
      setConfirmpassworderr("")
      setMatchPassword("Password dose not match")
    } else {
      setMatchPassword("")
      // class 25 part2 14:50 min
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: name,
            })
              .then(() => {
                console.log("User name updated successfully")
              })
              .catch((error) => {
                console.log(error)
              })
          })
          navigate("/login")
        })
        .catch((error) => {
          const errorCode = error.code

          if (errorCode.includes("email")) {
            setExistsemailerr(
              "Email already exists please try another email address"
            )
            setOpen(true)
          }
        })
    }
  }
  // After check password must be grter than 8 still shows
  return (
    <section className="registration-part">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="box">
            <div className="left">
              <h2>Get started with easy register</h2>
              <p style={{ marginBottom: "20px" }}>Free to register</p>

              <Collapse in={open}>
                <Alert
                  variant="filled"
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false)
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {existsemailerr}
                </Alert>
              </Collapse>

              <TextField
                helperText={nameerr}
                id="demo-helper-text-misaligned"
                label="Full Name"
                style={{ width: "355px", marginTop: "40px" }}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <TextField
                helperText={emailerr}
                id="demo-helper-text-misaligned"
                label="Enter Email"
                style={{ width: "355px", marginTop: "40px" }}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                helperText={
                  passworderr
                    ? passworderr
                    : passwordlengtherr
                    ? passwordlengtherr
                    : ""
                }
                id="demo-helper-text-misaligned"
                label="Password"
                style={{ width: "355px", marginTop: "40px" }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <TextField
                helperText={
                  confirmpassworderr
                    ? confirmpassworderr
                    : matchPassword
                    ? matchPassword
                    : ""
                }
                id="demo-helper-text-misaligned"
                label="Confirm Password"
                style={{ width: "355px", marginTop: "40px" }}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />
              <Button
                style={{
                  width: "355px",
                  padding: "10px 0",
                  borderRadius: "86px",
                  background: "#5F35F5",
                  marginTop: "40px",
                }}
                variant="contained"
                onClick={handleSubmit}
              >
                Sugn up
              </Button>

              <p className="msg">
                Alrady have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
            src="./assets/images/registration-bg.jpg"
            alt=""
          />
        </Grid>
      </Grid>
    </section>
  )
}

export default Registration
