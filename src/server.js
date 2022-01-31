const http = require('http'); // pull in the http server module
const url = require('url');

const htmlHandler = require('./htmlResponses.js');

const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': dataHandler.success,
  index: htmlHandler.getIndex,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  // const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
  } else {
    urlStruct.index(request, response, acceptedTypes);
  }
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
