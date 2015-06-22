import path from 'path';
import _ from 'lodash';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    publicPath: '/public/'
  }
}

if(process.argv[2] == 'build') {
  _.merge(config, {
    entry: './src/index.js',
    output: {
      library: 'LabelsInput',
      libraryTarget: 'umd'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel?stage=0',
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          loader: ExtractTextPlugin.extract('style', 'css', 'sass')
        }
      ]
    },
    externals: [
      {
        react: 'React',
        fuzzy: 'fuzzy'
      }
    ],
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('style.css')
    ]
  });
} else {
  _.merge(config, {
    entry: {
      main: [
        "webpack-dev-server/client?http://localhost:3000",
        'webpack/hot/only-dev-server',
        './example/main.js'
      ],
      vendor: ['react', 'fuzzy']
    },
    devtool: 'eval',
    module: {
      preLoaders: [],
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'react-hot!babel?stage=0',
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'style!css!sass'
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
  });
}

export default config;
