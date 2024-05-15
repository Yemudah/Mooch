// config.js

/**
 * This config.js file is for configuring the application's port and request rate-limit.
 * It centralizes important configuration settings for easy management.
 */

// Exporting an object containing configuration properties
module.exports = {
  // The port on which the application will listen for incoming requests
  port: 3000,

  // The request rate-limit configuration, specifying the maximum number of requests allowed within a certain time frame
  // Here, it's set to allow 100 requests every 10 seconds
  requestLimit: 100 // 10 in request
};
