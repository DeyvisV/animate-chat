'use strict'

const http = require('http');
const fs = require('fs');
const router = require('./router');
const realtime = require('./realtime');

const port = process.env.PORT || 8080;

const server = http.createServer();

realtime(server);
server.on('request', router);
server.on('listening', onListening);

server.listen(port);

function onListening(){
    // ` para concatenar varables string `
    console.log(`Server listens in port ${port}`);
}


