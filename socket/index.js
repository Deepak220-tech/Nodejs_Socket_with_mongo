const express = require("express");
const app = express();

const server = app.listen(
  4000,
  console.log('Server running on PORT 4000...')
);
//

//Socket code 
var users = [];
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});
var users = [];
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (user_id) => {
    //var user = [user_id]
    users.push(user_id);
    socket.join(user_id);
    socket.emit("connected",users);	
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
