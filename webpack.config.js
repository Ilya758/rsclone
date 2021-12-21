const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: path.join(__dirname, './src/assets'),
  outputJS: './js/',
  outputCSS: './css/',
};

module.exports = {
  context: PATHS.src,
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './ts/main.ts'],
  },
  output: {
    filename: `${PATHS.outputJS}[name].js`,
    path: PATHS.dist,
    assetModuleFilename: '[file][ext]',
  },
  resolve: {
    extensions: [
      '.js',
      '.png',
      '.svg',
      '.jpeg',
      '.jpg',
      '.json',
      '.html',
      '.css',
      '.scss',
      '.ts',
    ],
    alias: {
      '@styles': `${PATHS.src}/styles`,
    },
  },
  devServer: {
    port: 8081,
    static: PATHS.src,
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
      //logging: 'none'
    },
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      new HtmlMinimizerPlugin(),
      new CssMinimizerWebpackPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Webpack',
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.assets}/`,
          to: `${PATHS.dist}/assets/`,
        },
      ],
    }),
  ].concat(
    devMode
      ? [new ESLintPlugin(), new StylelintPlugin()]
      : [
          new MiniCssExtractPlugin({
            filename: `${PATHS.outputCSS}style.css`,
          }),
          new ImageMinimizerPlugin({
            minimizerOptions: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['mozjpeg', { quality: 100 }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
              ],
            },
          }),
        ]
  ),
  module: {
    rules: [
      {
        test: /\.s?(c|a)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 3 versions',
                      autoprefixer: { grid: true },
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /.(png|gif|jpe?g|ico|webp|svg|ttf|woff|woff2|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: './[path][name][ext]',
        },
      },
      {
        test: /\.m?(j|t)s$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript'],
        },
      },
    ],
  },
};
