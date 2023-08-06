const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
app.use(cors());

const serverhost = http.createServer(app); 

//Imported the class called {Server} from socket.io; 
const { Server } = require('socket.io');
/*creating an object called {io} from Server;
and setting-up connection between react and socket.io*/ 

const io = new Server(serverhost,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
   console.log(`Connected:${socket.id}`);

   socket.on("join_room",(data)=>{
      socket.join(data);
    console.log(`User with ID is:${socket.id} joined the room:${data}`);
   });

   socket.on("message_sent",(data)=>{
    socket.to(data.whichRoom).emit("message_received",data);    
   })

   socket.on("disconnect",()=>{
    console.log(`Disconnected:${socket.id}`);
   });
});













serverhost.listen(3000,()=>{
    console.log("listening to the port on 3000");
});