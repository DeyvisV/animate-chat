'use strict'

const http = require('http');
const port = process.env.PORT || 8080;

const server = http.createServer(onRequest);

function onRequest (req, res){
    res.end('Hello Node.js');
}

function onListening(){
    console.log('Server listens in port '+port);
}

server.listen(port, onListening);