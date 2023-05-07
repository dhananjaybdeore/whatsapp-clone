import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.scss";
import db from "./firebase";
import firebase from "firebase/compat/app";

import { Chat } from "@mui/icons-material";
function SidebarChat({ id, name, addNewChat, latest, url }) {
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
    // database stuff
    const roomName = prompt("Enter the Title of the group");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        seed: Math.floor(Math.random() * 5000),
        latestUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };
  return !addNewChat ? (
    <Link to={`rooms/${id}`}>
      <div className="sidebarChat">
        {console.log(url)}
        <Avatar src={url} />
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
        <Chat /> Create a new Group Chat
      </h1>
    </div>
  );
}

export default SidebarChat;
