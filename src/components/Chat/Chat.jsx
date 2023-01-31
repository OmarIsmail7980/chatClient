import React,{useEffect,useState} from 'react';
import { useLocation,Link, Navigate,useNavigate} from 'react-router-dom';
import io from "socket.io-client";

import "./Chat.css";

let socket;
const Chat  = ()=>{
  let location = useLocation();
  let { name, room } = location.state || { name: null, room: null };
  const [message,setMessage] = useState("");
  const [allMessages,setAllMessages] = useState([]);
  // let Endpoint = "http://localhost:5000";
  let Endpoint = "chatserver-production-29d0.up.railway.app";

  useEffect(() => {
    if (!name || !room) return

    socket = io(Endpoint);

    socket.emit("join", { name, room }, (error) => {
        console.log(error);
        if(error){
            name=null;
            room=null;
            return;
        }
        
    });

    return () => {
      socket.disconnect();
      socket.off();

    };
  }, [Endpoint, location.state]);

  useEffect(()=>{
    socket.on("message",(message)=>{
        setAllMessages([...allMessages,message]);
    })
  },[allMessages]);

  console.log(allMessages)
 const sendMessage = (event)=>{
    event.preventDefault();
    let user = { name, room };
    if(message){
        socket.emit("sendMessage", { user, message }, () => {
          setMessage("");
        });
    }
 }

  return (
    <div className="chat__chat">
      {!name || !room ? (
        <>
          <Navigate to="/" />
        </>
      ) : null}
      <div className="chat__chat--content__container">
        <div className="chat__chat--content__container-messages">
          <Messages allMessages={allMessages} name={name} />
        </div>
        <div className="chat__chat--content__container-input">
          <input
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          />
          <button type="submit" onClick={(e) => sendMessage(e)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const Messages = ({ allMessages,name }) => {
  return (
    <>
      {allMessages
        ? allMessages.map((message) => (
            {name===message.user

            }
            <div key={message.user + message.text}>
              <p>{message.user}</p>
              <p>{message.text}</p>
            </div>
          ))
        : null}
    </>
  );
};
export default Chat;