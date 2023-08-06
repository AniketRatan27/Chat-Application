import {BsTypeBold,BsTypeStrikethrough,BsLink45Deg,BsTypeItalic,BsListUl,BsFillEmojiSmileFill} from "react-icons/bs";
import {AiOutlineOrderedList} from "react-icons/ai";
import {BiCodeBlock} from "react-icons/bi";
import {FaFileUpload} from "react-icons/fa";
import {GoMention} from "react-icons/go";

import React, { useEffect, useState } from 'react'

    const Chat = ({socket,uservalue,roomId}) => {   
    const [message,setMessage] = useState("");
    const [messageList,SetMessageList] = useState([]);
    
    const sendMessage = async ()=>{
        if(message!==""){
        const messageSend={
            whichRoom : roomId,
            sender:uservalue,
            messageSent:message,
            time:new Date(Date.now()).getHours() +":"+ new Date(Date.now()).getMinutes()
        };
        await socket.emit("message_sent",messageSend);
        SetMessageList((mesg)=>[...mesg , messageSend]);
      }
    };
 
    const textmodify=()=>{ 
         const newBoldtext = message.bold();
         setMessage(newBoldtext);  
    };
    const textItalic = ()=>{
      const newItalic = message.italics();
      setMessage(newItalic);
    }
    
    const textcancel=()=>{
      const CancelText = message;
      setMessage(CancelText);
      // console.log(CancelText);
    }

 useEffect(()=>{
  socket.on("message_received",(data)=>{
    SetMessageList((mesg)=>[...mesg , data])
  });   
 },[socket])


  return (
    <div>
      <div className="chat-start">
        {/* Here are the text feature's icons */}
        <div className='text-modification-column'>
         <BsTypeBold className="Bs" onClick={textmodify}  /><BsTypeItalic className="Bs" onClick={textItalic}/>
         <BsTypeStrikethrough className="Bs" onClick={textcancel} /><BsLink45Deg className="Bs" />
         <BsListUl className="Bs" /><AiOutlineOrderedList className="Bs" />
         <BiCodeBlock className="Bs" />
        </div>

        {/* This is the chat-body where chats are visible */}
        <div className='chat-body'>
          {messageList.map((showContent)=> <h3 key={showContent}>{showContent.messageSent}</h3> )}
        </div>

        {/* This is footter where user can type the message */}
        <div className="footter">
        <FaFileUpload className="Fa"/><BsFillEmojiSmileFill className="Fa"/><GoMention className="Fa"/>
            <input className="Enter-text" value={message} placeholder='Hey...'
             onChange={(event)=>setMessage(event.target.value)} 
             onKeyPress={(event)=>{event.key == "Enter"&& sendMessage()}} />
            <button className="btn2" onClick={sendMessage}>&#9658;</button>
        </div>
        </div>
    </div>
  )
}

export default Chat