const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

module.exports = {
  watchFiles() {
    fs.watch(path.join(__dirname, '../public'), { recursive: true }, (eventType, filename) => {
      console.log(`Changes detected in ${filename}. Restarting server...`);
      this.restartServer();
    });
  },

  restartServer() {
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
};
