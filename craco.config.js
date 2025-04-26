const path = require('path');

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                  webpackImporter: false,
                  sassOptions: {
                    fiber: false,
                    includePaths: ['./node_modules']
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  style: {
    sass: {
      loaderOptions: (sassLoaderOptions, { env }) => {
        return {
          ...sassLoaderOptions,
          implementation: require('sass'),
          sassOptions: {
            fiber: false,
          },
          sourceMap: true
        };
      },
    },
  },
}; 