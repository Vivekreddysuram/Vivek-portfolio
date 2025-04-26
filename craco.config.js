const path = require('path');

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        implementation: require('sass'),
        sassOptions: {
          logger: {
            warn: () => {}
          }
        }
      }
    }
  }
}; 