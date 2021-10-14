const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + 'index.html');
// });

app.use(express.static( path.join(__dirname,'public')));

io.on('connection', (socket) => {

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    
    socket.on('escribiendo',(e)=>{
        io.emit('escribiendo',e)
    })

    socket.on('image',(img)=>{
        io.emit('image',img)
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});