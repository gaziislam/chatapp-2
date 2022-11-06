import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Search from "./components/Search"
import { BsToggleOff, BsToggleOn } from "react-icons/bs"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import ResetPassword from "./pages/ResetPassword"
import Message from "./pages/Message"

function App() {
  const auth = getAuth()
  let [dl, setDl] = useState(false)
  let [show, setShow] = useState(false)

  let handleDarkLight = () => {
    setDl(!dl)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
  }, [])

  return (
    <>
      <div className={dl ? "dark" : "light"}>
        {show && (
          <div className="dlmode" onClick={handleDarkLight}>
            {dl ? (
              <>
                <span className="off">
                  <BsToggleOff />
                </span>
                <span className="text">Switch to light</span>
              </>
            ) : (
              <>
                <span className="on">
                  <BsToggleOn />
                </span>
                <span className="text">Switch to dark</span>
              </>
            )}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/reset" element={<ResetPassword />}></Route>
          <Route path="/message" element={<Message />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
