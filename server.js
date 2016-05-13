'use strict'

const http = require('http');
const port = process.env.PORT || 8080;

const server = http.createServer(function(req, res){
    res.end('Hello Node.js');
});

server.listen(port, function(){
    console.log('Server listens in port '+port);
});