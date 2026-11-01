// import { useState } from 'react'
import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow";
import {MyContext} from "./MyContext.jsx";

function App() {
  const providerValues = {}; // Passing Down Values

  return (
    <div className="app">
      <MyContext.Provider values= {providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default App
