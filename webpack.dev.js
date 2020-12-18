const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const setMpa = () => {
  let entry = {};

  const entryFilds = glob.sync(path.join(__dirname, '/src/*/index.js'));

  // console.log(entryFilds);

  const htmlWebpackPlugins = Object.keys(entryFilds).map((item) => {
    const entryFile = entryFilds[item];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;

    return new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    });
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMpa();

module.exports = {
  // entry: './src/index.js',
  entry,
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      // {
      //   test: /.(png|gif|jpg)$/,
      //   use: 'file-loader',
      // },
      {
        test: /.(png|gif|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  devtool: 'source-map',
  // watch: true
};
