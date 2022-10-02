import React, { useEffect, useState } from "react"
import { getDatabase, set, ref, onValue, push, remove } from "firebase/database"
import { getAuth } from "firebase/auth"
import { Alert } from "@mui/material"

const FriendRequest = () => {
  //
  const db = getDatabase()
  const auth = getAuth()
  //([]) state becomes an arrey
  const [friendReq, setFriendReq] = useState([])
  const [dlt, setDlt] = useState(true)

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/")
    onValue(starCountRef, (snapshot) => {
      const userArr = []

      snapshot.forEach((item) => {
        if (item.val().receiverid == auth.currentUser.uid) {
          userArr.push({
            id: item.key,
            receivername: item.val().receivername,
            receiverid: item.val().receiverid,
            senderid: item.val().senderid,
            sendername: item.val().sendername,
          })
        }
      })
      setFriendReq(userArr)
    })
  }, [dlt])

  let handleAcceptFriend = (friend) => {
    set(push(ref(db, "friends")), {
      id: friend.id,
      receivername: friend.receivername,
      receiverid: friend.receiverid,
      senderid: friend.senderid,
      sendername: friend.sendername,
      date: `${
        new Date().getMonth() + 1
      }/${new Date().getDate()}/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendrequest/" + friend.id)).then(() => {
        setDlt(!dlt)
      })
    })
  }

  return (
    <div>
      <div className="group-list">
        <h2>Friend Request</h2>

        {friendReq.map(
          (item, index) =>
            auth.currentUser.uid !== item.senderid && (
              <div className="box" key={index}>
                <div className="img">
                  <img src="assets/images/friend-request.jpg" alt="" />
                </div>
                <div className="name">
                  <h1> {item.sendername} </h1>
                  <h4> {item.email} </h4>
                </div>
                <div className="button">
                  <button onClick={() => handleAcceptFriend(item)}>
                    Accept
                  </button>
                </div>
              </div>
            )
        )}
        {friendReq.length == 0 && (
          <Alert style={{ marginTop: "50px" }} severity="info">
            No Friend Request
          </Alert>
        )}
      </div>
    </div>
  )
}

export default FriendRequest
