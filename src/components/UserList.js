import React from "react"
import { useEffect, useState } from "react"
import { getDatabase, set, ref, onValue, push } from "firebase/database"
import { getAuth } from "firebase/auth"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import AddCommentIcon from "@mui/icons-material/AddComment"

const UserList = () => {
  const auth = getAuth()
  const db = getDatabase()

  let [userlist, setUserlist] = useState([])
  const [friendReq, setFriendReq] = useState([])
  const [friendReqSecond, setFriendReqSecond] = useState([])

  useEffect(() => {
    const userlistRef = ref(db, "users/")
    onValue(userlistRef, (snapshot) => {
      let userArr = []
      snapshot.forEach((item) => {
        userArr.push({
          name: item.val().username,
          email: item.val().email,
          userid: item.key,
        })
      })
      setUserlist(userArr)
    })
  }, [])

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/")
    onValue(starCountRef, (snapshot) => {
      const userArr = []
      // const userArrSecond = []

      snapshot.forEach((item) => {
        userArr.push(item.val().receiverid + item.val().senderid)
      })
      setFriendReq(userArr)
      // setFriendReqSecond(userArrSecond)
    })
  }, [])

  let handleFriendRequest = (info) => {
    console.log(info)
    let friendReqRef = push(ref(db, "friendrequest/"))
    set(friendReqRef, {
      receivername: info.name,
      receiverid: info.userid,
      senderid: auth.currentUser.uid,
      sendername: auth.currentUser.displayName,
    })
  }

  return (
    <div className="group-list friend-list user-list">
      <h2>User List</h2>

      {userlist.map(
        (item) =>
          auth.currentUser.uid !== item.userid && (
            <div className="box">
              <div className="img">
                <img src="assets/images/group1.jpg" alt="" />
              </div>
              <div className="name">
                <h1>{item.name}</h1>
                <h4>{item.email}</h4>
              </div>

              {friendReq.includes(item.userid + auth.currentUser.uid) ||
              friendReq.includes(auth.currentUser.uid + item.userid) ? (
                <div className="button">
                  <button>
                    <DoneAllIcon />
                  </button>
                </div>
              ) : (
                <div className="button">
                  <button onClick={() => handleFriendRequest(item)}>
                    <AddCommentIcon />
                  </button>
                </div>
              )}
            </div>
          )
      )}
    </div>
  )
}

export default UserList
