import React, { useEffect, useState } from "react"

import { AiOutlineHome, AiOutlineCloudUpload } from "react-icons/ai"
import { TbMessageCircle } from "react-icons/tb"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FiSettings } from "react-icons/fi"
import { RiLogoutBoxRLine } from "react-icons/ri"
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage"
import { Link, useNavigate } from "react-router-dom"
import { Modal, Box, Typography } from "@mui/material"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"

const Leftbar = (props) => {
  const nevigate = useNavigate()

  const auth = getAuth()
  const storage = getStorage()

  const [image, setImage] = useState(" ")
  const [cropData, setCropData] = useState("#")
  const [cropper, setCropper] = useState()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [createTime, setCreateTime] = useState(false)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [check, setCheck] = useState(false)

  let handleClose = () => {
    setOpen(false)
  }
  let handleModelOpen = () => {
    setOpen(true)
  }
  let handleClose2 = () => {
    setOpen2(false)
  }
  let handleModelOpen2 = () => {
    setOpen2(true)
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

      if (user) {
        setName(user.displayName)
        setEmail(user.email)
        setId(user.uid)
        setCreateTime(user.metadata.creationTime)
      }
    })
  }, [check])

  let handleProfileUplod = (e) => {
    // console.log(e.target.files[0])
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const getCropData = () => {
    setLoading(true)
    if (typeof cropper !== "undefined") {
      const storageRef = ref(storage, auth.currentUser.uid)
      const message4 = cropper.getCroppedCanvas().toDataURL()
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          setLoading(false)
          setOpen2(false)
          setImage("")
          updateProfile(auth.currentUser, {
            photoURL: url,
          })
            .then(() => {
              setCheck(!check)
            })
            .catch((error) => {
              console.log(error)
            })
        })
      })
    }
  }

  return (
    <div className="leftbar">
      <div className="profilepicbox">
        {!auth.currentUser.photoURL ? (
          <img className="profilepic" src="assets/images/avatar.svg" alt="" />
        ) : (
          <img className="profilepic" src={auth.currentUser.photoURL} />
        )}
        <div className="overlay" onClick={handleModelOpen2}>
          <AiOutlineCloudUpload />
        </div>
      </div>
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
            Account Information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul className="userinfo">
              <li>
                <span>Your ID:</span> {id}
              </li>
              <li>
                <span>Your Email:</span> {email}
              </li>
              <li>
                <span>Account Create Time:</span> {createTime}
              </li>
            </ul>
          </Typography>
        </Box>
      </Modal>

      {/* modal 2  open2 */}

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="leftbar-modal"
      >
        <Box className="leftbarbox">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change profile picture
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="profilepicbox">
              {!auth.currentUser.photoURL ? (
                image ? (
                  <div className="img-preview"></div>
                ) : (
                  <img className="profilepic" src="assets/images/avatar.svg" />
                )
              ) : image ? (
                <div className="img-preview"></div>
              ) : (
                // <img className="profilepic" src="assets/images/avatar.svg" />

                <img className="profilepic" src={auth.currentUser.photoURL} />
              )}
            </div>

            <input type="file" onChange={handleProfileUplod} />

            <Cropper
              style={{ height: 200, width: "50%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance)
              }}
              guides={true}
            />

            {image ? (
              loading ? (
                <button>Uploading...</button>
              ) : (
                <button onClick={getCropData}>Upload profile picture</button>
              )
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Leftbar
