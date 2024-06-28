/**
 * Module dependencies.
 */
const path = require('path');

/**
 * Content type service module.
 * Provides functionality to determine the content type of files.
 */
module.exports = {
  /**
   * Get the content type based on the file extension.
   * @param {string} filePath - The path to the file.
   * @returns {string} - The content type of the file.
   */
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

