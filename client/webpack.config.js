const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Adjust if your entry file is different
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Adjust if your HTML file is located elsewhere
      filename: 'index.html',
    }),
    new WebpackPwaManifest({
      name: 'Just Another Text Editor',
      short_name: 'JATE',
      description: 'A simple text editor that works offline.',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      start_url: '/',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'), // Ensure this path is correct
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src-sw.js', // Ensure this path is correct
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
