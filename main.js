const fileWatcher = require('./src/fileWatcher');

// Start the server
require('./src/server');

// Watch files for changes
fileWatcher.watchFiles();
