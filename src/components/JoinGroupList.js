import React, { useEffect, useState } from "react"
import { TbMessageCircle } from "react-icons/tb"
import { getDatabase, ref, set, push, onValue } from "firebase/database"
import { getAuth } from "firebase/auth"
import { useSelector, useDispatch } from "react-redux"
import { activeChat } from "../slice/activeChatSlice"

const JoinGroupList = () => {
  const dispatch = useDispatch()
  const db = getDatabase()
  const auth = getAuth()

  const [grouplist, setGrouplist] = useState([])

  useEffect(() => {
    let groupArr = []
    const groupRef = ref(db, "groups")
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        let groupinfo = {
          adminid: item.val().adminid,
          adminname: item.val().adminname,
          groupname: item.val().groupname,
          grouptagline: item.val().grouptagline,
          key: item.key,
        }
        groupArr.push(groupinfo)
      })
      setGrouplist(groupArr)
    })
  }, [])

  let handleActiveChat = (item) => {
    let userInfo = {
      name: item.groupname,
      groupid: item.key,
      groupadmin: item.adminid,
    }

    dispatch(activeChat(userInfo))
  }

  return (
    <div className="group-list">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Groups List</h2>
      </div>

      {grouplist.map((item) => (
        <div className="box" onClick={() => handleActiveChat(item)}>
          <div className="img">
            <img src="assets/images/group1.jpg" alt="" />
          </div>
          <div className="name">
            <h1>{item.groupname}</h1>
            <h4>
              {item.grouptagline}{" "}
              {item.adminid !== auth.currentUser.uid ? "" : "(Admin)"}
            </h4>
            {/* <h4>Admin:{item.key}</h4> */}
          </div>
          <div className="button">
            <button style={{ fontSize: "20px" }}>
              <TbMessageCircle />
            </button>
          </div>
        </div>
      ))}

      {/* box */}
      {/* <div className="box">
        <div className="img">
          <img src="assets/images/group1.jpg" alt="" />
        </div>
        <div className="name">
          <h1>MERN</h1>
          <h4>Be a Devoloper</h4>
        </div>
        <div className="button">
          <button style={{ fontSize: "20px" }}>
            <TbMessageCircle />
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default JoinGroupList
