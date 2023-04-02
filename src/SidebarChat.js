import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.scss";
import db from "./firebase";
import firebase from "firebase/compat/app";

import { InsertComment } from "@mui/icons-material";
function SidebarChat({ id, name, addNewChat, latest }) {
  const [seed, setSeed] = useState();
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const createChat = () => {
    // some database stuff
    const roomName = prompt("Enter the Title of the group");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        latestUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        // latestUpdate:
      });
    }
  };
  return !addNewChat ? (
    <Link to={`rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2> {name}</h2>
          {/* <p>{latestUpdate}</p> */}
          <span>
            {/* {new Date(latestUpdate).toLocaleDateString()} */}
            {new Date(latest.latestUpdate?.toDate()).toLocaleTimeString()}
            {/* <br /> */}
            {/* {new Date(latest.latestUpdate?.toDate()).toLocaleDateString()} */}

          </span>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h1>
        <InsertComment /> Create a new Group Chat
      </h1>
    </div>
  );
}

export default SidebarChat;
