const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  // Entry point for your application
  entry: './src/index.js',
  // Output configuration for Webpack
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    // Generates a manifest file for your PWA
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', // Can be null, use-credentials or anonymous
      inject: true,
      fingerprints: false,
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    // Workbox plugin to generate a service worker
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'service-worker.js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile ES6+ to ES5
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // CSS files
        use: ['style-loader', 'css-loader'], // Inject CSS into the DOM
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Image files
        type: 'asset/resource',
      },
    ],
  },
  // Development server configuration
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
