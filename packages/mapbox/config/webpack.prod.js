const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/mapbox/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mapbox',
      filename: 'remoteEntry.js',
      exposes: {
        './MapboxApp': './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
  ]
}

module.exports = merge(commonConfig, prodConfig)