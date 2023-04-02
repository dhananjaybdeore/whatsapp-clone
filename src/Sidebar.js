import {
  DonutLarge,
  Chat,
  MoreVert,
  SearchOutlined,
  Logout,
} from "@mui/icons-material";
import { Avatar, Icon, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Sidebar.scss";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("latestUpdate", "desc")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          {/* <IconButton>
            <Chat />
          </IconButton> */}
          {/* <IconButton>
            <MoreVert />
          </IconButton> */}
          <IconButton>
            <Logout
              onClick={() => {
                if (window.confirm("Are you sure you want to log out?"))
                  document.location.reload();
              }}
            />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <>
            <SidebarChat
              key={room.id}
              id={room.id}
              name={room.data.name}
              latest={room.data}
            />
          </>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
