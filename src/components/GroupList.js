import React, { useState, useEffect } from "react"
import { Modal, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { getDatabase, ref, set, push, onValue } from "firebase/database"
import { getAuth } from "firebase/auth"

const GroupList = () => {
  const db = getDatabase()
  const auth = getAuth()

  const [open, setOpen] = useState(false)
  const [groupname, setGroupName] = useState("")
  const [grouptagline, setGroupTagline] = useState("")
  const [grouplist, setGrouplist] = useState([])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // Modal Style staet
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }
  const inputstyle = {
    width: "100%",
    margin: "10px 0",
  }
  // Modal Style end

  // onClicks Start

  let handleCreateGroup = () => {
    set(push(ref(db, "groups")), {
      groupname: groupname,
      grouptagline: grouptagline,
      adminid: auth.currentUser.uid,
      adminname: auth.currentUser.displayName,
    }).then(() => {
      setOpen(false)
    })
  }

  let handleGroupJoin = (id, gid) => {
    set(push(ref(db, "groupjoinrequest")), {
      adminid: id,
      groupid: gid,
      userid: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      userprofile: auth.currentUser.photoURL,
    })
  }

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

  return (
    <div className="group-list">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Groups List</h2>
        <div className="button">
          <button onClick={handleOpen}>Create Group</button>
        </div>
      </div>

      {grouplist.map(
        (item) =>
          item.adminid !== auth.currentUser.uid && (
            <div className="box">
              <div className="img">
                <img src="assets/images/group1.jpg" alt="" />
              </div>
              <div className="name">
                <h1>{item.groupname}</h1>
                <h4>{item.grouptagline}</h4>
                {/* <h4>Admin:{item.key}</h4> */}
              </div>
              <div className="button">
                <button onClick={() => handleGroupJoin(item.adminid, item.key)}>
                  Join
                </button>
              </div>
            </div>
          )
      )}

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Fill the field with proper info
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="Group Name"
              variant="outlined"
              sx={inputstyle}
              onChange={(e) => {
                setGroupName(e.target.value)
              }}
            />
            <TextField
              id="outlined-basic"
              label="Group Tag Line"
              variant="outlined"
              sx={inputstyle}
              onChange={(e) => {
                setGroupTagline(e.target.value)
              }}
            />
            <div className="group-button">
              <button onClick={handleCreateGroup}>Create Group</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default GroupList
