import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
  Mic,
  Send,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.scss";
import { useStateValue } from "./StateProvider";
import firebase from "firebase/compat/app";

import db from "./firebase";
function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          name: user.displayName,
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid: user.uid,
          photoURL: user.photoURL,
        });
    }
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last activity:{" "}
            {messages.length !== 0 ? (
              <>
                {new Date(
                  messages[messages.length - 1].timestamp?.toDate()
                ).toLocaleDateString()}
                &nbsp;
                {new Date(
                  messages[messages.length - 1].timestamp?.toDate()
                ).toLocaleTimeString()}
              </>
            ) : (
              <span>No activity in the Chat</span>
            )}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.uid === user.uid &&
              "chat__receiver"}`}
          >
            <span className="chat__name">
              <img src={message.photoURL} alt="user image" />
              {message.name}
            </span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleDateString()}
              &nbsp;
              {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <form action="">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            <IconButton>
              <Send />
            </IconButton>
            {/* Send a message */}
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
