/**
 * Module dependencies.
 */
const fs = require('fs');
const path = require('path');

/**
 * File service module.
 * Provides functionality to read files.
 */
module.exports = {
  /**
   * Read a file from the file system.
   * @param {string} filePath - The path to the file to be read.
   * @returns {Promise<Buffer>} - A promise that resolves with the file content or rejects with an error.
   */
  readFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }
};

