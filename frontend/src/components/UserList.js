import React from "react"
import { useEffect, useState } from "react"
import { getDatabase, set, ref, onValue, push } from "firebase/database"
import { getAuth } from "firebase/auth"

const UserList = () => {
  const auth = getAuth()
  const db = getDatabase()
  // console.log(auth.currentUser)

  let [userlist, setUserlist] = useState([])

  useEffect(() => {
    console.log("check the list")
    let userArr = []
    const userRef = ref(db, "users/")
    console.log(useArr)

    onValue(userRef, (snapshot) => {
      console.log("abc", snapshot)
      // User list not updating

      userArr.push(
        item.val({
          username: item.val().username,
          email: item.val().email,
          id: item.key,
        })
      )
      // snapshot.forEach((item) => {
      //   userArr.push(
      //     item.val({
      //       username: item.val().username,
      //       email: item.val().email,
      //       id: item.key,
      //     })
      //   )
      // })
      setUserlist(userArr)
    })
  }, [])

  let handleFriendRequest = (info) => {
    set(push(ref(db, "friendrequest/")), {
      name: info.username,
      reciverid: info.id,
      senderid: auth.currentUser.uid,
    })
    console.log("click", info)

    console.log("user name check", info.username)
  }

  return (
    <div className="group-list friend-list user-list">
      <h2>User List</h2>

      {userlist.map(
        (item) =>
          auth.currentUser.uid !== item.id && (
            <div className="box">
              <div className="img">
                <img src="assets/images/group1.jpg" alt="" />
              </div>
              <div className="name">
                <h1>{item.username}</h1>
                <h4>{item.email}</h4>
                <h4>{item.id}</h4>
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
