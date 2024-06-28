/**
 * Module dependencies.
 */
const path = require('path');
const fileService = require('./fileService');
const errorService = require('./errorService');
const contentTypeService = require('./contentTypeService');
const rateLimiter = require('./rateLimiter');

/**
 * Exported request handler module.
 */
module.exports = {
  /**
   * Handle incoming HTTP requests.
   * @param {IncomingMessage} req - The incoming request object.
   * @param {ServerResponse} res - The response object to send data to the client.
   */
  handleRequest(req, res) {
    // Check if the request is rate-limited.
    if (rateLimiter.isRateLimited()) {
      // Serve rate limit error page if the request is rate-limited.
      errorService.serveErrorPage(res, 429, './public/errors/_rate_limit.js');
      return;
    }

    // Determine the file path to serve based on the request URL.
    const filePath = path.join(__dirname, '../public', req.url === '/' ? 'index.html' : req.url);
    const contentType = contentTypeService.getContentType(filePath);

    // Read the requested file from the file system.
    fileService.readFile(filePath)
      .then(content => {
        // Send the file content with a 200 status code and appropriate content type.
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf8');
        // Increment the request count in the rate limiter.
        rateLimiter.incrementRequestCount();
      })
      .catch(err => {
        // Handle file not found error.
        if (err.code === 'ENOENT') {
          errorService.serveErrorPage(res, 404, './public/errors/_404.js');
        } else {
          // Handle other server errors.
          errorService.serveErrorPage(res, 500, './public/errors/_500.js');
          console.error(`Server Error: ${err.message}`);
        }
      });
  }
};

