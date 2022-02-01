// const fs = require('fs'); // pull in the file system module

const dataRespond = (request, response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });

  if (type === 'application/json') {
    response.write(JSON.stringify(content));
  } else {
    response.write(content);
  }
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return dataRespond(request, response, responseXML, 200, 'text/xml');
  }

  return dataRespond(request, response, responseJSON, 200, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query paramater set to true';
    responseJSON.id = 'badRequest';

    return dataRespond(request, response, responseJSON, 400, 'application/json');
  }

  return dataRespond(request, response, responseJSON, 200, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing valid query paramater set to yes';
    responseJSON.id = 'notLoggedIn';

    return dataRespond(request, response, responseJSON, 401, 'application/json');
  }

  return dataRespond(request, response, responseJSON, 200, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a forbidden request',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return dataRespond(request, response, responseXML, 403, 'text/xml');
  }

  return dataRespond(request, response, responseJSON, 403, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is an internal error',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return dataRespond(request, response, responseXML, 500, 'text/xml');
  }

  return dataRespond(request, response, responseJSON, 500, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is not implemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return dataRespond(request, response, responseXML, 501, 'text/xml');
  }

  return dataRespond(request, response, responseJSON, 501, 'application/json');
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  dataRespond(request, response, responseJSON, 404, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
