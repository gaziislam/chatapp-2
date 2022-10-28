import React from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { Alert } from "@mui/material"
import { TbMessageCircle } from "react-icons/tb"

const Friends = (props) => {
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

  return (
    <div className="group-list friend-list">
      <h2>Friends ({friends.length}) </h2>

      {friends.length == 0 && (
        <Alert style={{ marginTop: "50px" }} severity="info">
          You have no friends
        </Alert>
      )}

      {friends.map((item) => (
        <div className="box">
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
          </div>
        </div>
      ))}
    </div>
  )
}
export default Friends
