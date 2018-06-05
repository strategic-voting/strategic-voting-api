'use strict';

module.exports.notford = (event, context, callback) => {
  let postalcodeRequest = event['pathParameters']['postalcode']
  console.log(`Recieved postalcode: ${postalcodeRequest}`)
  let postalcode = postalcodeRequest.toUpperCase().replace(/\s+/, '')
  if (postalcode.match(/[A-Z]\d[A-Z]\d[A-Z]\d/) == null) {
    const response = {
      statusCode: 422,
      headers: {
        "x-custom-header" : "My Header Value",
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      }
    };
    callback(null, response);
    return null;
  }

  const response = {
    statusCode: 200,
    headers: {
      "x-custom-header" : "My Header Value",
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({ "postalcode": postalcode })
  };

  callback(null, response);
};
