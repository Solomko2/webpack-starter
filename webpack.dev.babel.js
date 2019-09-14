import merge from 'webpack-merge';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import * as parts from './webpack.parts.babel';

const paths = parts.getPaths();

const commonConfig = merge([
  {
    optimization: parts.loadOptimization(),
    devtool: 'eval-cheap-module-source-map',
    entry: `${paths.src}/index.js`,
    devServer: {
      port: 9001,
      contentBase: paths.build,
      compress: true,
      inline: true,
      watchContentBase: true,
      watchOptions: {
        ignored: /node_modules/
      }
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
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
      new StyleLintPlugin({
        syntax: 'scss'
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
