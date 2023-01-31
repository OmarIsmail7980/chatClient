import React from "react";
import {NavLink} from 'react-router-dom';

import "./Join.css";

const Join = () => {
    const [name,setName] = React.useState("");
    const [room,setRoom] = React.useState("");
    return (
      <div className="chat__join">
        <div className="chat__join-container">
          <h1>Join</h1>
          <form className="chat__join-container-form">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <NavLink 
            onClick={(e)=>(!name||!room)?e.preventDefault():null}
            to={"/chat"} 
            state={{ name, room }}>
              <button className="chat__join-container-submit" type="submit">
                Join
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    );
};
export default Join;
