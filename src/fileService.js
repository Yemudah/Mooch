const fs = require('fs');
const path = require('path');

module.exports = {
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
