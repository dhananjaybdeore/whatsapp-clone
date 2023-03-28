import react from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { BrowsrRouter as  Route } from "express";
function App() {
  return (
    // BEM naming convention
    <div className="app">
      {/* <h1>Deee</h1> */}
      <div className="app__body">
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<></>}></Route>
            <Route
              path="/rooms/:roodId"
              element={
                <>
                  <Chat />
                </>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
