var path = require('path');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: {
    // 'webpack/hot/dev-server',
    // 'webpack-dev-server/client?http://localhost:8080',
    bundle1: "./src/show.js",
    bundle2: "./src/manage.js"
    // path.resolve(__dirname, 'src/show.js')
  },
  output: {
    path: path.join(__dirname, 'build/js'),
    filename: "[name].js",
    publicPath: "/js/"
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
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './build',
    port: 8080
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
}
