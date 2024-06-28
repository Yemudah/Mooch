/**
 * Module dependencies.
 */
const http = require('http');
const config = require('./config');
const requestHandler = require('./requestHandler');

/**
 * Create an HTTP server.
 * The requestHandler handles incoming requests and sends responses.
 */
const server = http.createServer((req, res) => requestHandler.handleRequest(req, res));

/**
 * Start the server.
 * The server listens on the port specified in the configuration file.
 */
server.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});

