'use strict';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import merge from 'webpack-merge';

import * as parts from './webpack.parts.babel';

const paths = parts.getPaths();

const commonConfig = merge([
  {
    optimization: parts.loadOptimization(),
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
      filename: '[name].[hash:20].js',
      path: paths.build
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.(scss|css|sass)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        allChunks: true,
        ignoreOrder: false
      }),
      new StyleLintPlugin({
        syntax: 'scss'
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          map: {
            inline: false
          },
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ]
  },
  parts.loadPug({ pretty: true }),
  parts.loadJS({
    include: paths.src,
    exclude: /node_modules/
  }),
  parts.copyImages()
]);

module.exports = commonConfig;
