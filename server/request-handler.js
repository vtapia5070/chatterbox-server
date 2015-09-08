/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = [];
//{roomname: 4chan, messages: []},{}

var handleMessageAndRoom = function(response, request, statuscode){
  // if statuscode != 404
  //   if (url === '/classes/messages') {
  //     parse according to messages
  //       if statuscode == 2000
  //   }
  //   if (url === '/classes/room') {
  //     parse according to rooms
  //  }
  //var result = JSON.parse(ajaxOptions.data);
  if(statusCode === 200){
    if (request.url === '/classes/messages'){
      // blah blah
      // final response = stringified message
      response.end(JSON.stringify({results: messages}));
    }
    else if (request.url.substring(0, 13) === '/classes/room'){
      // blah blah
      var collection = [];
      var roomName = request.url.substring(13);
      for (var i = 0; i < messages.length; i++) {
        if (messages[i][roomname] === roomName) {
          collection.push(messages[i]);
        }
      }
      response.end(JSON.stringify({results: collection}));
    }
  } else if (statusCode === 201){
    if (request.url === '/classes/messages'){
      // blah blah
      // pushing to messages after parsing
    }
    else if(request.url.substring(0, 13) === '/classes/room'){
      // blah blah
    }
  }
};
//var result = JSON.parse(ajaxOptions.data);
var getStatusCode = function (url, method){
  if(url === '/classes/messages' || url === '/classes/room'){
    if (method === 'GET'){
      return 200;
    } else {
    // if (method === 'POST'){
      return 201;
    }
  } else {
    return 404;
  }
};
    

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  //var statusCode = 200;
  var statusCode = getStatusCode(request.url, request.method);
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  //headers['Content-Type'] : "text/plain"
  // requestUrls = function(){};

 //move above console.log
  //if(request.method === 'GET'){
    // response.writeHead(statusCode, {
    //   'Content-Type': "text/plain",
    //   ;
    // });
    //maybe log statusCode
    //console.log(statusCode);
  //}
  
  if(request.method === 'GET'){
    response.writeHead(statusCode, headers);
  }
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // response.writeHead(statusCode, headers);
  response.end("Hello, World!");
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
};

exports.requestHandler = requestHandler;
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
