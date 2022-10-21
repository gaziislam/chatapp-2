import React, { useState, useEffect } from "react"
import { getDatabase, ref, set, push, onValue } from "firebase/database"
import { getAuth } from "firebase/auth"

const MyGroup = () => {
  const db = getDatabase()
  const auth = getAuth()

  const [grouplist, setGrouplist] = useState([])

  useEffect(() => {
    let groupArr = []
    const groupRef = ref(db, "groups")
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        groupArr.push(item.val())
      })
      setGrouplist(groupArr)
    })
  }, [])

  return (
    <div className="group-list my-group">
      <h2> My Groups</h2>

      {grouplist.map(
        (item) =>
          item.adminid === auth.currentUser.uid && (
            <div className="box">
              <div className="img">
                <img src="assets/images/group1.jpg" alt="" />
              </div>
              <div className="name">
                <h1>{item.groupname}</h1>
                <h4>{item.grouptagline}</h4>
                {/* <h4>Admin:{item.adminname}</h4> */}
              </div>
              <div className="button">
                <button>Join</button>
              </div>
            </div>
          )
      )}
    </div>
  )
}

export default MyGroup
