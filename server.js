var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  response.setHeader("Content-Type", "text/plain");

  if (parsedUrl.pathname ==  '/listings')
  {
    response.write(listingData);
    response.end();
  }

  else
  {
    response.statusCode = 404;
    response.end ("Bad gateway error");
  }
  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */

   listingData = data;

   if (err){
    throw err;
   }

   server = http.createServer(requestHandler);

   server.listen(port, function() {

   console.log('Server listening on: http://127.0.0.1:' + port);
});
});
