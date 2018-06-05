'use strict';

let OpenNorthGateway = require('./open_north_gateway.js')

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
};
module.exports.notford = (event, context, callback) => {
  let postalcodeRequest = event['pathParameters']['postalcode']
  console.log(`Recieved postalcode: ${postalcodeRequest}`)
  let postalcode = postalcodeRequest.toUpperCase().replace(/\s+/, '')
  if (postalcode.match(/[A-Z]\d[A-Z]\d[A-Z]\d/) == null) {
    const response = {
      statusCode: 422,
      headers: CORS_HEADERS
    };
    callback(null, response);
    return null;
  }


  let gateway = new OpenNorthGateway()
  gateway.candidates_in_postalcode(postalcode, (candidates) => {
    const response = {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ "candidates": candidates })
    };

    callback(null, response);
  });
};
