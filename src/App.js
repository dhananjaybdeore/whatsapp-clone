import react, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  window.onbeforeunload = function () {
    return "Data will be lost if you leave the page, are you sure?";
  };

  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path="/" element={<></>}></Route>
              <Route
                path="/rooms/:roomId"
                element={
                  <>
                    <Chat />
                  </>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
