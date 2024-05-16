# Simple HTTP Server with Rate Limiting and File Watching

This repository contains a simple HTTP server built with Node.js. The server serves static files from the `public` directory, implements basic rate limiting, and watches for file changes to restart the server automatically.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [File Watching](#file-watching)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository.
2. Install dependencies (if any) using `npm install`.
3. Ensure you have Node.js installed.

## Usage

Start the server by running:

```bash
node main.js
```

The server will run at `http://localhost:<config.port>`, where `config.port` is specified in the `config.js` file.

## Configuration

The server uses a configuration file (`config.js`) to set various parameters. An example configuration might look like this:

```javascript
module.exports = {
  port: 3000,
  requestLimit: 100 // Maximum number of requests before rate limiting
};
```

## Rate Limiting

The server limits the number of requests to prevent overloading. If the request count exceeds the specified limit (`config.requestLimit`), the server responds with a 429 status code and serves a custom JavaScript error file.

## Error Handling

Custom error pages are served for different error conditions:

- `404 Not Found`: When the requested file does not exist.
- `500 Internal Server Error`: For server-related errors.
- `429 Too Many Requests`: When rate limiting is triggered.

## File Watching

The server watches for changes in the `public` directory. When a change is detected, the server restarts automatically. This ensures that the latest changes are always served without manual intervention.

## API

### `http.createServer((req, res) => {})`

Creates an HTTP server to handle incoming requests.

#### Parameters

- `req` (IncomingMessage): The request object.
- `res` (ServerResponse): The response object.

### `getContentType(filePath)`

Determines the content type based on the file extension.

#### Parameters

- `filePath` (String): The path of the file.

#### Returns

- `String`: The content type (e.g., 'text/html').

### `serveErrorPage(res, statusCode, filename)`

Serves a custom error page.

#### Parameters

- `res` (ServerResponse): The response object.
- `statusCode` (Number): The HTTP status code to send.
- `filename` (String): The path to the custom error file.

### `restartServer()`

Restarts the server by executing a new Node.js process.

## Example

Start the server and navigate to `http://localhost:3000` (or the port specified in `config.js`). The server will serve the `index.html` file by default and other files based on the URL path.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Code

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const config = require('./config');

let requestCount = 0;
let isRateLimited = false;

const server = http.createServer((req, res) => {
  if (isRateLimited) {
    // Serve the "Too Many Requests" JS file
    serveErrorPage(res, 429, './public/errors/_rate_limit.js');
    return;
  }

  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let contentType = getContentType(filePath);

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
        }, 10000); // 10 seconds downtime
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
  fs.readFile(path.join(__dirname, filename), (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/javascript' });
      res.end('// Error 404: Page not found', 'utf8');
    } else {
      res.writeHead(statusCode, { 'Content-Type': 'text/javascript' });
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
```