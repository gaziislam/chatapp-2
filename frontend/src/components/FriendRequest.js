import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { getAuth } from "firebase/auth"
import { Alert } from "@mui/material"

const FriendRequest = () => {
  //
  const db = getDatabase()
  const auth = getAuth()
  // let [friendRequest, setFriendRequest] = useState([]) //([]) state becomes an arrey
  const [friendReq, setFriendReq] = useState([])
  const [errMsg, setErrmsg] = useState("")

  // console.log(friendReq)

  // console.log(friendRequest)

  // useEffect(() => {
  //   let friendRequestArr = []
  //   // console.log("my array", friendRequestArr)
  //   const friendRequestRef = ref(db, "friendrequest/")
  //   onValue(friendRequestRef, (snapshot) => {
  //     const data = snapshot.val() // check this
  //     snapshot.forEach((item) => {
  //       // console.log("item.reciverid", item.reciverid)
  //       // console.log("auth.currentUser.uid", auth.currentUser.uid)
  //       //
  //       if (item.val().reciverid == auth.currentUser.uid) {
  //         friendRequestArr.push({
  //           name: item.val().name,
  //           receiverid: item.val().receiverid,
  //           senderid: item.val().senderid,
  //         })
  //       }
  //     })
  //     setFriendRequest(friendRequestArr)
  //   })
  // }, [])

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/")
    onValue(starCountRef, (snapshot) => {
      const userArr = []

      snapshot.forEach((item) => {
        if (item.val().receiverid == auth.currentUser.uid) {
          userArr.push({
            name: item.val().name,
            receiverid: item.val.receiverid,
            senderid: item.val().senderid,
          })
        } else {
          setErrmsg("No Friend Request")
        }
      })
      setFriendReq(userArr)
    })
  }, [])

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
                  <h1> {item.name} </h1>
                  <h4> {item.email} </h4>
                </div>
                <div className="button">
                  <button>Accept</button>
                </div>
              </div>
            )
        )}
        {friendReq.length == 0 && (
          <Alert style={{ marginTop: "50px" }} severity="info">
            {errMsg}
          </Alert>
        )}
      </div>
    </div>
  )
}

export default FriendRequest
