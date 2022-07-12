import React from "react"
import { Routes, Route } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App
