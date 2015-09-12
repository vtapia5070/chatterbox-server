/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var utils = require('./utility.js');
var fs = require('fs');
var path = require('path');

var messages = [{text: "hello", username: "victoria"}];

headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

exports.requestHandler = function(request, response) {
  actions(request, response);
  console.log(path.join(__dirname, "../client/index.html"));
};

var actions = function(req, res){
  if (req.method === "GET") {
    if (req.url.slice(0, 17) === "/classes/messages"){
      res.writeHead(200, headers);
      res.end(JSON.stringify({results: messages}));
    }
    var url = req.url;
    var content;
    console.log(req.url);
    if (req.url === '/') {
      url = '/index.html';
      content = {"Content-Type": "text/html"};
    }
    else if (req.url === '/app.js') {
      content = {"Content- Type": "application/js"};
    }
    else if (req.url === '/styles.css') {
     content = {"Content-Type": "text/css"};
    }
    else if (req.url === '/underscore.js') {
      content = {"Content-Type": "application/js"};
    }
    var pathName = path.join(__dirname, '../client' + url);
    console.log(pathName, content);
    fs.readFile(pathName, function(err, data) {
        res.writeHead(200, content);
        console.log("data is:", data);
        res.end(data);
    });
  }
  else if (req.method === "POST") {
    var body = '';
    req.on('data', function(chunk){
      body += chunk;
    });
    req.on('end', function(data){
      var msg = JSON.parse(data);
      messages.push(data);
      console.log("this is post data", data);
    });
    res.writeHead(200, headers);
    res.end(JSON.stringify({results:messages}));
  }
};