import React, { useEffect, useState } from "react"

import { AiOutlineHome } from "react-icons/ai"
import { TbMessageCircle } from "react-icons/tb"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FiSettings } from "react-icons/fi"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { Modal, Box, Typography } from "@mui/material"

const Leftbar = (props) => {
  const nevigate = useNavigate()

  const auth = getAuth()

  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)

  let handleClose = () => {
    setOpen(false)
  }
  let handleModelOpen = () => {
    setOpen(true)
  }

  let handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful")
        nevigate("/login")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //! To check if the user is loged in, vedio 26(13:00min)
      setName(user.displayName)

      if (user) {
        // console.log(user)
      }
    })
  }, [])
  return (
    <div className="leftbar">
      <img className="profilepic" src="assets/images/profile1.jpg" alt="" />
      <h5 onClick={handleModelOpen}> {name} </h5>

      <div className="icons">
        <ul>
          <li className={props.active == "home" && "active"}>
            <AiOutlineHome className="icon" />
          </li>

          <li className={props.active == "msg" && "active"}>
            <TbMessageCircle className="icon" />
          </li>
          <li className={props.active == "notification" && "active"}>
            <IoMdNotificationsOutline className="icon" />
          </li>
          <li className={props.active == "settings" && "active"}>
            <FiSettings className="icon" />
          </li>
          <li className="logout" onClick={handleSignout}>
            <RiLogoutBoxRLine className="icon" />
          </li>
        </ul>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="leftbar-modal"
      >
        <Box className="leftbarbox">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Leftbar
