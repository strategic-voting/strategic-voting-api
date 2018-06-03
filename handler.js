'use strict';

module.exports.hello = (event, context, callback) => {
  console.log(event); // Contains incoming request data (e.g., query params, headers and more)

  const response = {
    statusCode: 200,
    headers: {
      "x-custom-header" : "My Header Value",
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({ "message": "Hello World!" })
  };

  callback(null, response);
};
