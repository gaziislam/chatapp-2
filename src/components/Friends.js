import React, { useEffect, useState } from "react"
import { getDatabase, set, ref, onValue, push } from "firebase/database"

import { getAuth } from "firebase/auth"
import { Alert } from "@mui/material"
import { TbMessageCircle } from "react-icons/tb"
import { useSelector, useDispatch } from "react-redux"
import { activeChat } from "../slice/activeChatSlice"

const Friends = (props) => {
  const dispatch = useDispatch()

  const db = getDatabase()
  const auth = getAuth()

  const [friends, setfriends] = useState([])

  useEffect(() => {
    let friendsArray = []

    const friendsRef = ref(db, "friends")
    onValue(friendsRef, (snapshot) => {
      // const data = snapshot.val()

      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().receiverid ||
          auth.currentUser.uid == item.val().senderid
        ) {
          friendsArray.push(item.val())
        }
      })

      // console.log(data)

      setfriends(friendsArray)
    })
  }, [])

  let handleActiveChat = (item) => {
    let userInfo = {}

    if (item.receiverid == auth.currentUser.uid) {
      userInfo.status = "single"
      userInfo.id = item.senderid
      userInfo.name = item.sendername
    } else {
      userInfo.status = "single"
      userInfo.id = item.receiverid
      userInfo.name = item.receivername
    }
    dispatch(activeChat(userInfo))
  }

  let handleBlock = (item) => {
    auth.currentUser.uid == item.senderid
      ? set(ref(db, "block"), {
          block: item.receivername,
          blockid: item.receiverid,
          blockby: item.sendername,
          blockbyid: item.senderid,
        })
      : set(ref(db, "block"), {
          block: item.sendername,
          blockid: item.senderid,
          blockby: item.receivername,
          blockbyid: item.receiverid,
        })
  }

  return (
    <div className="group-list friend-list">
      <h2>Friends ({friends.length}) </h2>

      {friends.length == 0 && (
        <Alert style={{ marginTop: "50px" }} severity="info">
          You have no friends
        </Alert>
      )}

      {friends.map((item) => (
        <div className="box" onClick={() => handleActiveChat(item)}>
          <div className="img">
            <img src="assets/images/group1.jpg" alt="" />
          </div>
          <div className="name">
            {auth.currentUser.uid == item.senderid ? (
              <h1>{item.receivername}</h1>
            ) : (
              <h1>{item.sendername}</h1>
            )}
            <h4>Hi Guys, Wassup!</h4>
          </div>
          <div className="button">
            {props.item == "date" ? (
              <p>{item.date}</p>
            ) : (
              <button style={{ fontSize: "20px" }}>
                <TbMessageCircle />
              </button>
            )}

            <button
              onClick={() => handleBlock(item)}
              style={{ marginLeft: "10px" }}
            >
              Block
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Friends
