import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { getAuth } from "firebase/auth"
import { Alert } from "@mui/material"

const FriendRequest = () => {
  //
  const db = getDatabase()
  const auth = getAuth()
  let [friendRequest, setFriendRequest] = useState([]) //([]) state becomes an arrey

  console.log(friendRequest)

  useEffect(() => {
    let friendRequestArr = []
    // console.log("my array", friendRequestArr)
    const friendRequestRef = ref(db, "friendrequest/")
    onValue(friendRequestRef, (snapshot) => {
      const data = snapshot.val() // check this
      snapshot.forEach((item) => {
        // console.log("item.reciverid", item.reciverid)
        // console.log("auth.currentUser.uid", auth.currentUser.uid)
        //
        if (item.val().reciverid == auth.currentUser.uid) {
          friendRequestArr.push({
            name: item.val().name,
            reciverid: item.val().reciverid,
            senderid: item.val().senderid,
          })
        }
      })
      setFriendRequest(friendRequestArr)
    })
  }, [])

  return (
    <div>
      {" "}
      <div className="group-list">
        <h2>Friend Request</h2>
        {friendRequest.map((item) => (
          <div className="box">
            <div className="img">
              <img src="assets/images/friend-request.jpg" alt="" />
            </div>
            <div className="name">
              <h1> {item.name} </h1>
              <h4>Hi Guys, Wassup!</h4>
            </div>
            <div className="button">
              <button>Accept</button>
            </div>
          </div>
        ))}
        {friendRequest.length == 0 && (
          <Alert style={{ marginTop: "50px" }} severity="info">
            No Friend Request
          </Alert>
        )}
      </div>
    </div>
  )
}

export default FriendRequest
