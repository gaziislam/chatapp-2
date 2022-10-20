import React from "react"
import { Modal, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const GroupList = () => {
  const [open, setOpen] = React.useState(false)
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

  return (
    <div className="group-list">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Groups List</h2>
        <div className="button">
          <button onClick={handleOpen}>Create Group</button>
        </div>
      </div>

      <div className="box">
        <div className="img">
          <img src="assets/images/group1.jpg" alt="" />
        </div>
        <div className="name">
          <h1>Friends Reunion</h1>
          <h4>Hi Guys, Wassup!</h4>
        </div>
        <div className="button">
          <button>Join</button>
        </div>
      </div>
      <div className="box">
        <div className="img">
          <img src="assets/images/group1.jpg" alt="" />
        </div>
        <div className="name">
          <h1>Friends Reunion</h1>
          <h4>Hi Guys, Wassup!</h4>
        </div>
        <div className="button">
          <button>Join</button>
        </div>
      </div>
      <div className="box">
        <div className="img">
          <img src="assets/images/group1.jpg" alt="" />
        </div>
        <div className="name">
          <h1>Friends Reunion</h1>
          <h4>Hi Guys, Wassup!</h4>
        </div>
        <div className="button">
          <button>Join</button>
        </div>
      </div>
      <div className="box">
        <div className="img">
          <img src="assets/images/group1.jpg" alt="" />
        </div>
        <div className="name">
          <h1>Friends Reunion</h1>
          <h4>Hi Guys, Wassup!</h4>
        </div>
        <div className="button">
          <button>Join</button>
        </div>
      </div>
      <div className="box">
        <div className="img">
          <img src="assets/images/group1.jpg" alt="" />
        </div>
        <div className="name">
          <h1>Friends Reunion</h1>
          <h4>Hi Guys, Wassup!</h4>
        </div>
        <div className="button">
          <button>Join</button>
        </div>
      </div>
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
            />
            <TextField
              id="outlined-basic"
              label="Group Tag Line"
              variant="outlined"
              sx={inputstyle}
            />
            <div className="button">
              <button onClick={handleOpen}>Create Group</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default GroupList
