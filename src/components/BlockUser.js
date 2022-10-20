import React from "react"

const BlockUser = () => {
  return (
    <div className="group-list my-group">
      <h2> Block Users</h2>

      <div className="box">
        <div className="img">
          <img src="assets/images/group1.jpg" alt="" />
        </div>
        <div className="name">
          <h1>MERN</h1>

          <h4>Hi Guys, Wassup!</h4>
        </div>
        <div className="button">
          <div className="info">
            <p>10/102022</p>
            <br />
            <button>Unblock</button>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="img">
          <img src="assets/images/group1.jpg" alt="" />
        </div>
        <div className="name">
          <h1>MERN</h1>

          <h4>Hi Guys, Wassup!</h4>
        </div>
        <div className="button">
          <div className="info">
            <p>10/102022</p>
            <br />
            <button>Unblock</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockUser
