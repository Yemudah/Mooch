/**
 * Configuration module.
 * Provides configuration settings for the application.
 */
module.exports = {
  /**
   * The port number on which the server will listen.
   * @type {number}
   */
  port: 3000,

  /**
   * The maximum number of requests allowed before rate limiting.
   * @type {number}
   */
  requestLimit: 100
};

