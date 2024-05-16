const fs = require('fs');
const path = require('path');

module.exports = {
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
