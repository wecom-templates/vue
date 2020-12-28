const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'esm'),
    filename: 'component.[contenthash].js'
  },

  module: {
    rules: [
      {
        test: /\.(vue|Vue)$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      }
    ]
  },
  
  resolve: {
    extensions: ['.js', '.vue']
  },
  
  // devtool: 'eval-source-map',

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css'
    })
  ]
}