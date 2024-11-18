let http = require('http');
let fs = require('fs');

http.createServer(function (request, response) {
  console.log(request.url);
  if ((request.url == "/index") || (request.url == "/index.html")) {
		sendFileContent(response, "html/index.html", "text/html");
	}
	// The test() method tests for a match in a string.
	else if (/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())) {
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}else
	if (/^\/[a-zA-Z0-9\/]*.png$/.test(request.url.toString())) {
		sendFileContent(response, request.url.toString().substring(1), "image/png");
	}else
	if (/^\/[a-zA-Z0-9\/]*.svg$/.test(request.url.toString())) {
		sendFileContent(response, request.url.toString().substring(1), "image/svg+xml");
	}else
	if (/^\/[a-zA-Z0-9\/]*.ttf$/.test(request.url.toString())) {
		console.log("Serving font TTF:", request.url);
		sendFileContent(response, request.url.toString().substring(1), "font/ttf");
	}
	else if (/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if (/^\/[a-zA-Z0-9\/]*.otf$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "font/otf");
	}
	else if (/^\/[a-zA-Z0-9\/]*.woff$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "font/woff");
	}
	else {
		response.writeHead(200, {'Content-Type': "text/html"});
		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
		response.end();
	}
}).listen(3008);

  console.log('Server running at http://localhost:3008/');

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType, 'Access-Control-Allow-Origin': '*'});
			response.write(data);
		}
		response.end();
	});
}
