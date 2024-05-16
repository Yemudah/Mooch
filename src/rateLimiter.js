const config = require('./config');

let requestCount = 0;
let isRateLimited = false;

module.exports = {
  isRateLimited() {
    return isRateLimited;
  },

  incrementRequestCount() {
    requestCount++;
    if (requestCount >= config.requestLimit) {
      isRateLimited = true;
      setTimeout(() => {
        isRateLimited = false;
        requestCount = 0; // Reset request count after the downtime
      }, 10000); // 10 seconds downtime
    }
  }
};
