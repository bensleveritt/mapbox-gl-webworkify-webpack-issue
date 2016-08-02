const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC = resolve(__dirname, 'src');
const BUILD = resolve(__dirname, 'build');

module.exports = env => (
  {
    context: SRC,
    entry: {
      app: './index.js',
    },
    output: {
      path: BUILD,
      filename: '[name].js',
    },
    resolve: {
      alias: {
        'webworkify': 'webworkify-webpack',
      }
    },
    module: {
      loaders: [
        { test: /\.json$/, loader: 'json-loader' },
        {
          test: /\.js$/,
          include: resolve('node_modules/mapbox-gl-shaders/index.js'),
          loader: 'transform/cacheable?brfs',
        },
      ],
      postLoaders: [{
        include: /node_modules\/mapbox-gl-shaders/,
        loader: 'transform',
        query: 'brfs',
      }],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${SRC}/template.ejs`,
      }),
    ],
    devtool: 'cheap-source-map',
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      host: 'localhost',
      port: 3000,
    },
  }
);
