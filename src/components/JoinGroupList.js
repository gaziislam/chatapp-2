import React from "react"
import { TbMessageCircle } from "react-icons/tb"

const JoinGroupList = () => {
  return (
    <div className="group-list">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Groups List</h2>
      </div>

      <div className="box">
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
      </div>
      <div className="box">
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
      </div>
      <div className="box">
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
      </div>
      <div className="box">
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
      </div>
    </div>
  )
}

export default JoinGroupList
