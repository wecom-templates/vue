const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'esm'),
    filename: 'component.js'
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
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  
  resolve: {
    extensions: ['.js', '.vue']
  },
  
  devtool: 'eval-source-map',

  plugins: [
    new VueLoaderPlugin()
  ]
}
