const dataRespond = (request, response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });

  if (type === 'application/json') {
    response.write(JSON.stringify(content));
  } else {
    response.write(content);
  }
  response.end();
};

const xmlCheck = (request, response, acceptedTypes, responseJSON, status, paramStatus) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    if (paramStatus === false) {
      let newResponse = '<response>';
      newResponse = `${newResponse}<message>${responseJSON.message}</message>`;
      newResponse = `${newResponse}<id>${responseJSON.id}</id>`;
      newResponse = `${newResponse}</response>`;
      return dataRespond(request, response, newResponse, status, 'text/xml');
    }

    return dataRespond(request, response, responseXML, status, 'text/xml');
  }

  return dataRespond(request, response, responseJSON, status, 'application/json');
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  return xmlCheck(request, response, acceptedTypes, responseJSON, 200);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  let valid = true;

  if (!params.valid || params.valid !== 'true') {
    valid = false;

    responseJSON.message = 'Missing valid query paramater set to true';
    responseJSON.id = 'badRequest';

    return xmlCheck(request, response, acceptedTypes, responseJSON, 400, valid);
  }

  return xmlCheck(request, response, acceptedTypes, responseJSON, 200, valid);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  let loggedIn = true;

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    loggedIn = false;

    responseJSON.message = 'Missing loggedIn query paramater set to yes';
    responseJSON.id = 'unauthorized';

    return xmlCheck(request, response, acceptedTypes, responseJSON, 401, loggedIn);
  }

  return xmlCheck(request, response, acceptedTypes, responseJSON, 200, loggedIn);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content',
  };

  return xmlCheck(request, response, acceptedTypes, responseJSON, 403);
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal server error. Something went wrong',
  };

  return xmlCheck(request, response, acceptedTypes, responseJSON, 500);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  return xmlCheck(request, response, acceptedTypes, responseJSON, 501);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  const notFoundParam = false;

  return xmlCheck(request, response, acceptedTypes, responseJSON, 404, notFoundParam);
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
