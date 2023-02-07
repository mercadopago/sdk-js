const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    library:{
        name: 'MercadoPagoSDKJS',
        type: 'umd',
    },
    filename: 'index-webpack.js',
    path: path.resolve(__dirname, '../../dist'),
  },
};