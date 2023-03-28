import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./SidebarChat.scss";
import db from "./firebase";
function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState();
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const createChat = () => {
    const roomName = prompt("Enter the room name");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
      //do some database stuff
    }
  };
  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2> {name}</h2>
        <p>Last message ...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h1>Add a new Chat</h1>
    </div>
  );
}

export default SidebarChat;
