const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const config = require('./config');

let requestCount = 0;
let isRateLimited = false;

const server = http.createServer((req, res) => {
  if (isRateLimited) {
    // Serve the "Too Many Requests" HTML page
    serveErrorPage(res, 429, './public/errors/_rate_limit.js');
    return;
  }

  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let contentType = getContentType(filePath) || 'text/html' || 'text/javascript';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found (404)
        serveErrorPage(res, 404, './public/errors/_404.js');
      } else {
        // Server error (500)
        serveErrorPage(res, 500, './public/errors/_500.js');
        console.error(`Server Error: ${err.message}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
      // Increment request count only for successful responses
      requestCount++;
      if (requestCount >= config.requestLimit) {
        isRateLimited = true;
        setTimeout(() => {
          isRateLimited = false;
          requestCount = 0; // Reset request count after the downtime
        }, 10000); // 5 seconds downtime
      }
    }
  });
});

server.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});

function getContentType(filePath) {
  let extname = path.extname(filePath);
  switch (extname) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpg';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'text/html';
  }
}

function serveErrorPage(res, statusCode, filename) {
  let errorPage = filename;
  if (statusCode === 404) {
    errorPage = './public/errors/_404.js';
  } else if (statusCode === 500) {
    errorPage = './public/errors/_500.js';
  } else if (statusCode === 429) {
    errorPage = './public/errors/_rate_limit.js';
  }

  fs.readFile(path.join(__dirname, 'public', errorPage), (err, content) => {
    if (err) {
      res.writeHead(statusCode, { 'Content-Type': 'text/javascript' });
      serveErrorPage(res, 404, './public/errors/_404.js')
    } else {
      res.writeHead(statusCode, { 'Content-Type': 'text/html' });
      res.end(content, 'utf8');
    }
  });
}


// Watch files for changes and restart server
fs.watch(path.join(__dirname, 'public'), { recursive: true }, (eventType, filename) => {
  console.log(`Changes detected in ${filename}. Restarting server...`);
  restartServer();
});

function restartServer() {
  exec('node main.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error restarting server: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error restarting server: ${stderr}`);
      return;
    }
    console.log(`Server restarted successfully: ${stdout}`);
  });
}
