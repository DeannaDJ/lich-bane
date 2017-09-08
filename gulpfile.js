var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpack_config = require('./webpack.config');

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(webpack_config, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('build', ['webpack']);
