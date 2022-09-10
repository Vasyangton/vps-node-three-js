const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use('/build/', express.static(path.join(__dirname,'node_modules/three/build')));
app.use('/jsm/',express.static(path.join(__dirname,'node_modules/three/examples/jsm')));

var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);

app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});
server.listen(80);

