const path = require('path');
const fileService = require('./fileService');
const errorService = require('./errorService');
const contentTypeService = require('./contentTypeService');
const rateLimiter = require('./rateLimiter');

module.exports = {
  handleRequest(req, res) {
    if (rateLimiter.isRateLimited()) {
      errorService.serveErrorPage(res, 429, './public/errors/_rate_limit.js');
      return;
    }

    const filePath = path.join(__dirname, '../public', req.url === '/' ? 'index.html' : req.url);
    const contentType = contentTypeService.getContentType(filePath);

    fileService.readFile(filePath)
      .then(content => {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf8');
        rateLimiter.incrementRequestCount();
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          errorService.serveErrorPage(res, 404, './public/errors/_404.js');
        } else {
          errorService.serveErrorPage(res, 500, './public/errors/_500.js');
          console.error(`Server Error: ${err.message}`);
        }
      });
  }
};
