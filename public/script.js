var socket = io();

let btn = document.getElementById("sendBtn");
let messageTxt = document.getElementById("msgInput");

btn.onclick = function exec() {
    socket.emit('from_client', {
        msg: messageTxt.value
    });
    // to all the clients of the server including itself
    
    //making its value again empty string
    // document.getElementById("msgInput").value = '';

    //printing it for the developer
    // console.log('Message sent to server: ' + messageTxt);

};

// send to yourself is done by socket.emit on the server side 

socket.on('from_server' , (data)=>
    {
        // console.log('Message received from server');
        const listMsgs = document.createElement('li');
        listMsgs.innerText = data.msg;
        console.log(listMsgs);
        let listOnFrontEnd = document.getElementById('msgList');
        listOnFrontEnd.appendChild(listMsgs);
    })

socket.emit('to_server', 'Hello from client');