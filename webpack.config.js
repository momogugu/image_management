var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    // 'webpack/hot/dev-server',
    // 'webpack-dev-server/client?http://localhost:8080',
    './src/show.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: "js/bundle.js",
    publicPath: "build/"
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: path.join(__dirname, "node_modules")
  },
  resolveLoader: { 
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        loader: 'babel',
        query: {
              presets: ['es2015', 'react']
          }
      }
    ]
  }
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ]
}
