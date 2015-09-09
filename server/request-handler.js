/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = [];
var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  statusCode = getStatusCode(request.url, request.method);
  var headers = defaultCorsHeaders;
  response.writeHead(statusCode, headers);
  
  if(request.method === 'OPTIONS'){
    response.writeHead(200, headers);
    response.end();
    return;
  }

  if(statusCode !== 404){
    handleMessageAndRoom(response, request, statusCode);
    return;
  }
  response.end();

};

function handleMessageAndRoom (response, request, statuscode){
  if(statusCode === 200){
    if (request.url === '/classes/messages'){
      response.end(JSON.stringify({results: messages}));
      return;
    }
    else if (request.url.substring(0, 13) === '/classes/room'){
      var collection = [];
      var roomName = request.url.substring(9);
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].roomname === roomName) {
          collection.push(messages[i]);
        }
      }
      response.end(JSON.stringify({results: collection}));
      return;
    }
  } else if (statusCode === 201){
    if (request.url === '/classes/messages'){
      request.on('data', function(data){
        // 'data' += data
        var msg = JSON.parse(data);
        msg.objectId = Math.floor(Math.random() * 99999);
        messages.push(msg);
      });
      response.end();
      return;
      // request.on('end', function(){
      // });
    }
    else if(request.url.substring(0, 13) === '/classes/room'){
      request.on('data', function(data){
        // 'data' += data
        var msg = JSON.parse(data);
        msg.objectId = Math.floor(Math.random() * 99999);
        msg.roomname = request.url.substring(9);
        messages.push(msg);
      });
      response.end();
    }
  }
}
//var result = JSON.parse(ajaxOptions.data);
function getStatusCode(url, method){
  if(url === '/classes/messages' || url.substring(0, 13) === '/classes/room'){
    if (method === 'GET'){
      return 200;
    } else {
    // if (method === 'POST'){
      return 201;
    }
  } else {
    return 404;
  }
}

exports.requestHandler = requestHandler;

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
