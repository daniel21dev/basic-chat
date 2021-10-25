const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static( path.join(__dirname,'public')));

io.on('connection', (socket) => {

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    
    socket.on('escribiendo',(e)=>{
        io.emit('escribiendo',e)
    })

    socket.on('image',({img, type})=>{
        if( type.includes('image') ){
            return io.emit('image',img)
        }else{
            const url = '/files/' + Date.now() + '.' + type.split('/')[1];
            require("fs").writeFile( path.join(__dirname,'/public/'+url), img, 'base64', function(err) {
                if(!err)
                    io.emit('file', 'http://localhost:3000' + url ) 
            });
        }
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});