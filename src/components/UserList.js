import React from "react"
import { useEffect, useState } from "react"
import { getDatabase, set, ref, onValue, push } from "firebase/database"
import { getAuth } from "firebase/auth"

const UserList = () => {
  const auth = getAuth()
  const db = getDatabase()

  let [userlist, setUserlist] = useState([])

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

  // useEffect(() => {
  //   console.log("check the list")

  //   let userArr = []
  //   const userRef = ref(db, "users/")
  //   onValue(userRef, (snapshot) => {
  //     // console.log("abc", snapshot)
  //     snapshot.forEach((item) => {
  //       console.log("crrayhecka", item)
  //       userArr.push(
  //         item.val({
  //           username: item.val().username,
  //           email: item.val().email,
  //           id: item.key,
  //         })
  //       )
  //     })
  //     setUserlist(userArr)
  //   })
  // }, [])

  // let handleFriendRequest = (info) => {
  //   set(push(ref(db, "friendrequest/")), {
  //     name: info.username,
  //     reciverid: info.id,
  //     senderid: auth.currentUser.uid,
  //   })
  //   console.log("click", info)

  //   console.log("user name check", info.username)
  // }

  let handleFriendRequest = (info) => {
    // console.log(info)
    let friendReqRef = push(ref(db, "friendrequest/"))
    set(friendReqRef, {
      name: auth.currentUser.displayName,
      receiverid: info.userid,
      senderid: auth.currentUser.uid,
      email: info.email,
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
              <div className="button">
                <button onClick={() => handleFriendRequest(item)}>+</button>
              </div>
            </div>
          )
      )}
    </div>
  )
}

export default UserList
