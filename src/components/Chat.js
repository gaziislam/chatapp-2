import React, { useState } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { IoIosSend } from "react-icons/io"
import { AiOutlineCamera } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { getDatabase, ref, set, push } from "firebase/database"

import { getAuth } from "firebase/auth"

const Chat = () => {
  const auth = getAuth()
  const db = getDatabase()
  const user = useSelector((state) => state.activeChat.active)

  let [msg, setMsg] = useState("")

  let handleMsg = (e) => {
    setMsg(e.target.value)
  }

  let handleMsgSend = () => {
    if (msg != "") {
      if (user.status == "group") {
        console.log("This is group msg")
      } else {
        set(push(ref(db, "singlemsg")), {
          whosendid: auth.currentUser.uid,
          whosendname: auth.currentUser.displayName,
          whoreceivedname: user.name,
          whoreceive: user.id,
          msg: msg,
        })
      }
    }
  }

  return (
    <>
      <div className="chat">
        <div className="top-area">
          <div className="info">
            <div className="img">
              <img src="assets/images/profile2.jpg" alt="" />
              <div className="round"></div>
            </div>
            <div className="identity">
              {user && <h3>{user.name}</h3>}
              <p>Online</p>
            </div>
          </div>
          <div className="dots">
            <BiDotsVerticalRounded />
          </div>
        </div>
        <div className="chat-area">
          <div className="msg" style={alignLeft}>
            <p style={msgRecive}>Hey there</p>
            <p className="date" style={dateRicive}>
              Today, 2:30pm
            </p>
          </div>
          <div className="msg" style={alignRight}>
            <div style={msgSend} className="chat-img">
              <img src="assets/images/profile3.jpg" alt="" />
            </div>
            <p className="date" style={dateSend}>
              Today, 2:40pm
            </p>
          </div>
          <div className="msg" style={alignLeft}>
            <div style={msgRecive} className="chat-img">
              <img src="assets/images/profile3.jpg" alt="" />
            </div>
            <p className="date" style={dateRicive}>
              Today, 2:30pm
            </p>
          </div>
        </div>
        <div className="msg-box">
          <div className="msg-write">
            <input onChange={handleMsg} type="text" placeholder="Message" />
            <AiOutlineCamera className="camera" />
            <button onClick={handleMsgSend}>
              <IoIosSend />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

let msgRecive = {
  background: "#F1F1F1",
}

let msgSend = {
  background: "#5F35F5",
  color: "#FFF",
}

let alignLeft = {
  justifyContent: "flex-start",
}

let alignRight = {
  justifyContent: "flex-end",
}

let dateRicive = {
  left: "-48px",
}

let dateSend = {
  right: "-48px",
}

export default Chat
