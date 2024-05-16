const path = require('path');

module.exports = {
  getContentType(filePath) {
    const extname = path.extname(filePath);
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
};
