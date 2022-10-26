import React, { useState, useEffect } from "react"
import {
  Grid,
  TextField,
  Button,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth"

const Login = () => {
  const location = useLocation()
  console.log(location.state)
  const auth = getAuth()

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(true)
  const nevigate = useNavigate()
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  // error message states

  let [emailerr, setEmailerr] = useState("")
  let [passworderr, setPassworderr] = useState("")
  let [passwordlengtherr, setPasswordlengtherr] = useState("")

  let [checkpassword, setCheckpassword] = useState(false)
  let [wrongemailerr, setWrongemailerr] = useState("")
  let [wrongpassworderr, setWrongpassworderr] = useState("")
  let [msg, setMsg] = useState("")

  const handleSubmit = () => {
    if (!email) {
      setEmailerr("Please enter An email")
    } else if (!password) {
      setPassworderr("Please enter A password")
      setEmailerr("")
    } else if (password.length < 8) {
      setPasswordlengtherr("Password must be greter than or equal to 8")
      setPassworderr("")
    } else {
      setPasswordlengtherr("")
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          nevigate("/home")
        })
        .catch((error) => {
          const errorCode = error.code
          console.log(errorCode)

          if (errorCode.includes("user")) {
            setWrongemailerr("Email not found, try again")
            setOpen(true)
          } else if (errorCode.includes("password")) {
            setWrongpassworderr("Wrong password")
            setOpen(true)
          }
        })
    }
  }

  let handleEye = () => {
    setCheckpassword(!checkpassword)
  }

  let handleGoogleSignin = () => {
    console.log("Google sign")
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        nevigate("/home")
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  let handleFbSignin = () => {
    console.log("FB Sign in")
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result)
        const accessToken = credential.accessToken

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error)
        console.log(errorCode)

        // ...
      })
  }

  // Password Reset function

  useEffect(() => {
    if (location.state !== null) {
      setMsg(location.state.msg)
      setOpen2(true)
    }
  }, [])

  return (
    <section className="registration-part login-part">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="box">
            <div className="left">
              <h2>Login to your account</h2>
              {location.state && (
                <Collapse in={open2}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen2(false)
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {msg}
                  </Alert>
                </Collapse>
              )}

              <div className="loginoption">
                <div onClick={handleGoogleSignin} className="option">
                  <img
                    style={{ width: "30px", height: "30px" }}
                    src="./assets/images/google.png"
                  />
                  Login with Google
                </div>
                <div onClick={handleFbSignin} className="option">
                  <img
                    style={{ width: "30px", height: "30px" }}
                    src="./assets/images/Facebook.png"
                  />
                  Login with Facebook
                </div>
              </div>

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
                      {msg}
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  jkhgfouljhgvlj
                </Alert>
              </Collapse>

              <TextField
                helperText={emailerr}
                id="demo-helper-text-misaligned"
                label="Enter Email"
                style={{ width: "355px", marginTop: "40px" }}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <div className="eye">
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
                  type={checkpassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {checkpassword ? (
                  <AiFillEye onClick={handleEye} className="eyeicon" />
                ) : (
                  <AiFillEyeInvisible onClick={handleEye} className="eyeicon" />
                )}
              </div>
              <br />

              <Button
                style={{
                  width: "355px",
                  padding: "25px 0",
                  borderRadius: "8px",
                  background: "#5F35F5",
                }}
                variant="contained"
                onClick={handleSubmit}
              >
                Login to continue
              </Button>

              <p className="msg">
                Dont have an account? <Link to="/">Sign Up</Link>
              </p>
              <p className="forgot">
                Forgot Password? <Link to="/reset"> Click here </Link>
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
            src="./assets/images/login.jpg"
            alt=""
          />
        </Grid>
      </Grid>
    </section>
  )
}

export default Login
