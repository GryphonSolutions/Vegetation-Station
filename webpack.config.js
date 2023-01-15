const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, './client');

const babelLoaderConfiguration = {
  test: /\.(js|jsx)$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [
        'module:metro-react-native-babel-preset',
        '@babel/preset-env',
        '@babel/preset-react',
      ],
      plugins: [
        'react-native-web',
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpeg|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

module.exports = {
  entry: [path.join(appDirectory, '/src/index.jsx')],
  output: {
    filename: 'bundle.js',
    path: path.join(appDirectory, '/public/bundle.js'),
  },
  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration],
  },
  mode: 'development',
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.jsx'],
  },
};
