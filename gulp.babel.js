import gulp from 'gulp';
import path from 'path';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config';

gulp.task('dev', function(cb) {
  var bundler = webpack(webpackConfig);

  new WebpackDevServer(bundler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: { colors: true }
  }).listen(3000, 'localhost', function(err, result){
    cb();
  });
});

gulp.task('build', (cb)=> {
  webpack(webpackConfig).run(cb);
});
