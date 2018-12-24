import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import * as R from 'ramda';

const pagesWithFolders = fs.readdirSync(path.resolve(__dirname, 'src/templates/views'));
const pages = R.compose(
  R.map(R.replace('.pug', '')),
  R.filter(R.includes('.pug'))
)(pagesWithFolders);

exports.getPaths = ({
  sourceDir = 'src',
  buildDir = 'dist',
  staticDir = undefined,
  images = 'images',
  fonts = 'fonts',
  js = 'scripts',
  css = 'styles'
} = {}) => {
  const assets = { images, fonts, js, css };

  return Object.keys(assets).reduce((obj, assetName) => {
    const assetPath = assets[assetName];

    obj[assetName] = !staticDir ? assetPath : `${staticDir}/${assetPath}`;

    return obj;
  }, {
    src: path.join(__dirname, sourceDir),
    build: path.join(__dirname, buildDir),
    staticDir
  });
};

exports.loadPug = (options) => ({
  module: {
    rules: [
      {
        test: /\.pug$/,
        loaders: [{
          loader: 'apply-loader'
        }, {
          loader: 'pug-loader',
          options
        }]
      }
    ]
  },
  plugins: [
    ...pages.map(page => new HtmlWebpackPlugin({
      template: `./src/templates/views/${page}.pug`,
      filename: `${page}.html`
    }))
  ]
});

exports.loadJS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include,
        exclude,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        include,
        exclude,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ]
  }
});

exports.loadOptimization = (options = {}) => R.mergeDeepRight({
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}, options);
