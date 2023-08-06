import "../src/App.css"

import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';

//Connecting to the server(3000)
const socket = io.connect("http://localhost:3000");

function App(){
  const [uservalue,setUservalue] = useState("");
  const [roomId,setRoomId] = useState("");
  const [chats,setChats] = useState(false);
   
  function JoinRoom(){
    if(uservalue!=="" && roomId!==""){
        socket.emit("join_room",roomId);
        setChats(true);
    }
  }
  

  return( 
   <div className="App">
    {!chats ?(
    <div className="join-container">
    <h2>Join Chat...</h2>
    <input type="text" className="userInput" placeholder="Enter Name" onChange={(event)=>{setUservalue(event.target.value)}}/>
    <input type="text" className="userInput" placeholder="Enter Room-ID" onChange={(event)=>{setRoomId(event.target.value)}}/>
    <button className="btn" onClick={JoinRoom} >Join Chat</button>
  </div>
    ):(
    <Chat socket={socket} uservalue={uservalue} roomId={roomId} />
)}
  </div>
   );
  }
export default App;