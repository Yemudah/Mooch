/**
 * Module dependencies.
 */
const fs = require('fs');
const path = require('path');

/**
 * Error service module.
 * Provides functionality to serve error pages.
 */
module.exports = {
  /**
   * Serve an error page.
   * @param {ServerResponse} res - The response object to send data to the client.
   * @param {number} statusCode - The HTTP status code to send.
   * @param {string} filename - The path to the error page file to be served.
   */
  serveErrorPage(res, statusCode, filename) {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/javascript' });
        res.end('// Error 404: Page not found', 'utf8');
      } else {
        res.writeHead(statusCode, { 'Content-Type': 'text/javascript' });
        res.end(content, 'utf8');
      }
    });
  }
};

