// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var gutil = require('gulp-util');
var gzip = require("gulp-gzip");
var print = require('gulp-print');
var s3 = require("gulp-s3");

/**
 * Deploy to S3 using environment variables.
 */
gulp.task('deploy', [], function() {
  var config = {
    "key": gutil.env.aws_key,
    "secret": gutil.env.aws_secret,
    "bucket": gutil.env.aws_bucket,
    "region": gutil.env.aws_region
  };
  return gulp.src('./dist/**')
    .pipe(print())
    .pipe(gzip())
    .pipe(s3(config, { gzippedOnly: true }));
});

// Default build development
gulp.task('default', ['deploy']);