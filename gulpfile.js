// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var gutil = require('gulp-util');
var gzip = require("gulp-gzip");
var print = require('gulp-print');
var s3 = require("gulp-s3");
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('dev-config-generate', function(){
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/localhost:3000/g, 's3-eu-west-1.amazonaws.com/webwriter-dev-plugins'))
    .pipe(rename('dev-writer-client.json'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('acc-config-generate', function(){
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/localhost:3000/g, 's3-eu-west-1.amazonaws.com/webwriter-acc-plugins'))
    .pipe(rename('acc-writer-client.json'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('prod-config-generate', function(){
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/localhost:3000/g, 's3-eu-west-1.amazonaws.com/webwriter-plugins'))
    .pipe(rename('prod-writer-client.json'))
    .pipe(gulp.dest('./dist'));
});

function s3ConfigDeploy(configFile) {
  var config = {
    "key": gutil.env.aws_key,
    "secret": gutil.env.aws_secret,
    "bucket": gutil.env.aws_bucket,
    "region": gutil.env.aws_region
  };
  var options = { headers: {'x-amz-acl': 'bucket-owner-read'} };
  return gulp.src(configFile)
    .pipe(print())
    .pipe(s3(config, options));
}

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

/**
 * Deploy webwriter configuration to InfoMaker S3 bucket using environment variables.
 */
gulp.task('dev-deploy-webwriter-config', [], function() {
  return s3ConfigDeploy('./dist/dev-writer-client.json');
});
gulp.task('acc-deploy-webwriter-config', [], function() {
  return s3ConfigDeploy('./dist/acc-writer-client.json');
});
gulp.task('prod-deploy-webwriter-config', [], function() {
  return s3ConfigDeploy('./dist/prod-writer-client.json');
});

// Default build development
gulp.task('default', ['dev-config-generate', 'acc-config-generate', 'prod-config-generate']);