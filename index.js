const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer); // creating a new oblect of class Server


//for checking whether the server is working 
//we will send on every 2 sec interval a text to all clients

io.on('connection' , (socket) =>{
    console.log("a user connected" , socket.id)

    // setInterval(()=>{
    //     io.emit('from_server' , 'Hello from server');
    // },2000) // sending message every 2 seconds to all clients
 
    socket.on('from_client' ,(data)=>{
        console.log('Message received from client');
        io.emit('from_server' , data); // sending message to all clients except the sender
    })

    //---> for sending messaging to itself to the current user only we do socket.emit
    // for the same client
    // socket.on('from_client' ,(data)=>{
    //     console.log('Message received from client');
    //     socket.emit('from_server' , data); // sending message to all clients except the sender
    // })

    //---> if you want the message to be delivered to all except the one which is sneding 
    //we use socket.broadcast.emit()

    // socket.on('from_client' ,(data)=>{
    //     console.log('Message received from client');
    //     socket.broadcast.emit('from_server' , data); // sending message to all clients except the sender
    // })
})


app.use('/' , express.static(__dirname + '/public'));
//bcoz rn we are using the front end which is in the same directory but in folder public

// the http sever is running
httpServer.listen(3000 , ()=>{
    console.log("server started")
});