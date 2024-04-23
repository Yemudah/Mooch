const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const port = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let contentType = getContentType(filePath) || 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
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

// Watch files for changes and restart server
fs.watch(path.join(__dirname, 'public'), { recursive: true }, (eventType, filename) => {
  console.log(`Changes detected in ${filename}. Restarting server...`);
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
});
