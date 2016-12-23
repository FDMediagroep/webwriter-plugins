// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var gutil = require('gulp-util');
var gzip = require("gulp-gzip");
var print = require('gulp-print');
var s3 = require("gulp-s3");
var s3config = {
  "key": gutil.env.aws_key,
  "secret": gutil.env.aws_secret,
  "bucket": gutil.env.aws_bucket,
  "region": gutil.env.aws_region
};

var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('local-config-generate', function(){
  gulp.src(['writer-fd-dev.json'])
    .pipe(gulp.dest('../NPWriter/server/config'));
});

gulp.task('dev-config-generate', function(){
  /**
   * Replace newsItemTemplateId 30eae1c0-c640-4053-b114-05c64e28bbe7 with correct ID on dev.
   */
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/http\:\/\/localhost:3000/g, 'https://s3-eu-west-1.amazonaws.com/webwriter-dev-plugins'))
    .pipe(replace(/30eae1c0-c640-4053-b114-05c64e28bbe7/g, '1156201'))
    .pipe(rename('dev-writer-client.json'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('acc-config-generate', function(){
  /**
   * Replace newsItemTemplateId 30eae1c0-c640-4053-b114-05c64e28bbe7 with correct ID on dev.
   * TODO: probably need another ID on acc
   */
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/http\:\/\/localhost:3000/g, 'https://s3-eu-west-1.amazonaws.com/webwriter-acc-plugins'))
    .pipe(replace(/30eae1c0-c640-4053-b114-05c64e28bbe7/g, '1191302'))
    .pipe(rename('acc-writer-client.json'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('prod-config-generate', function(){
  /**
   * Replace newsItemTemplateId 30eae1c0-c640-4053-b114-05c64e28bbe7 with correct ID on dev.
   * TODO: probably need another ID on prod
   */
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/http\:\/\/localhost:3000/g, 'https://s3-eu-west-1.amazonaws.com/webwriter-plugins'))
    .pipe(replace(/30eae1c0-c640-4053-b114-05c64e28bbe7/g, '1171067'))
    .pipe(rename('prod-writer-client.json'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Deploy to S3 using environment variables.
 */
gulp.task('deploy', [], function() {
  return gulp.src('./dist/**')
    .pipe(print())
    .pipe(gzip())
    .pipe(s3(s3config, { gzippedOnly: true }));
});


function s3ConfigDeploy(configFile) {
  var options = { headers: {'x-amz-acl': 'bucket-owner-read'} };
  return gulp.src(configFile)
    .pipe(print())
    .pipe(s3(s3config, options));
}

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