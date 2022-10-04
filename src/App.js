import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { BsToggleOff, BsToggleOn } from "react-icons/bs"

function App() {
  let [dl, setDl] = useState(true)

  let handleDarkLight = () => {
    setDl(!dl)
  }

  return (
    <>
      <div className={dl ? "dark" : "light"}>
        <div className="dlmode" onClick={handleDarkLight}>
          {dl ? (
            <span className="off">
              <BsToggleOff />
            </span>
          ) : (
            <span className="on">
              <BsToggleOn />
            </span>
          )}
        </div>

        <Routes>
          <Route path="/" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
