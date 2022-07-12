import React, { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Alert, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Leftbar from "../components/Leftbar"

const Home = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [emailverify, setEmailVerify] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //! To check if the user is loged in, vedio 26(13:00min)

      if (user) {
        console.log(user)
        setEmailVerify(user.emailVerified)
      } else {
        navigate("/login")
      }
    })
  }, [])

  return (
    <>
      {emailverify ? (
        <Grid container>
          <Grid item xs={2}>
            <Leftbar active="home" />
          </Grid>
          <Grid item xs={4}>
            Middle
          </Grid>
          <Grid item xs={3}>
            middle right
          </Grid>
          <Grid item xs={3}>
            right
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Alert variant="filled" severity="info">
              This is an info alert — check it out! please Check Your Email For
              Verification
            </Alert>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      )}
    </>
  )
}

export default Home
