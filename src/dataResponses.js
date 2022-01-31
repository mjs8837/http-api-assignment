// const fs = require('fs'); // pull in the file system module

const dataRespond = (request, response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const respondJSON = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${respondJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return dataRespond(request, response, responseXML, 200, 'text/xml');
  }

  const messageString = JSON.stringify(respondJSON);

  return dataRespond(request, response, messageString, 200, 'application/json');
};

module.exports = {
  success,
};
