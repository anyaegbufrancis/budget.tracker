const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: {
    app: './public/assets/js/index.js',
    database: './public/assets/js/database.js',
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      inject: false,
      name: 'Budget Tracker',
      short_name: 'Budget Tracker',
      description: 'Budget Tracker application to allow for offline access and functionality.',
      background_color: '#01579b',
      theme_color:  '#ffffff',
      start_url: "/",
      icons: [{
        src: path.resolve("public/assets/icons/icon-192x192.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ], 
};

module.exports = config;
