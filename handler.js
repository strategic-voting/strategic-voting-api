'use strict';

let OpenNorthGateway = require('./open_north_gateway.js')
let NotFordSelector = require('./not_ford_selector.js')

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

  let gateway = new OpenNorthGateway();
  let not_ford_selector = new NotFordSelector();
  gateway.candidates_in_postalcode(postalcode, (candidates) => {
    let riding = candidates[0]['riding'];
    let who_to_vote = not_ford_selector.who_to_vote_for(riding)
    const response = {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ "candidates": candidates, "vote": who_to_vote })
    };

    callback(null, response);
  });
};
