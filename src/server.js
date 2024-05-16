const http = require('http');
const config = require('./config');
const requestHandler = require('./requestHandler');

const server = http.createServer((req, res) => requestHandler.handleRequest(req, res));

server.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
