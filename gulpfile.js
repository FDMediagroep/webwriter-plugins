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
  /**
   * Replace placeholders.
   */
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/WEBWRITER_PLUGINS_BASE_URL/g, 'http://localhost:3000'))
    .pipe(replace(/NEWS_ITEM_TEMPLATE_ID/g, '30eae1c0-c640-4053-b114-05c64e28bbe7'))
    .pipe(replace(/FDMG_SERVICES_BASE_URL/g, 'https://webwriter-dev.fd.nl'))
    .pipe(replace(/FDMG_SERVICES_TOKEN/g, 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ'))
    .pipe(replace(/HOLLANDSE_HOOGTE_TOKEN/g, '63401c89-63e9-35f9-9daa-a55ef26c3042'))
    .pipe(replace(/API_GATEWAY_BASE_URL/g, 'https://apigateway-dev.fdmg.nl'))
    .pipe(gulp.dest('../NPWriter/server/config'));
});

gulp.task('dev-config-generate', function(){
  /**
   * Replace placeholders.
   */
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/WEBWRITER_PLUGINS_BASE_URL/g, 'https://s3-eu-west-1.amazonaws.com/webwriter-dev-plugins'))
    .pipe(replace(/NEWS_ITEM_TEMPLATE_ID/g, '1156201'))
    .pipe(replace(/FDMG_SERVICES_BASE_URL/g, 'https://webwriter-dev.fd.nl'))
    .pipe(replace(/FDMG_SERVICES_TOKEN/g, 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ'))
    .pipe(replace(/HOLLANDSE_HOOGTE_TOKEN/g, '63401c89-63e9-35f9-9daa-a55ef26c3042'))
    .pipe(replace(/API_GATEWAY_BASE_URL/g, 'https://apigateway-dev.fdmg.nl'))
    .pipe(rename('dev-writer-client.json'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('acc-config-generate', function(){
  /**
   * Replace placeholders.
   */
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/WEBWRITER_PLUGINS_BASE_URL/g, 'https://s3-eu-west-1.amazonaws.com/webwriter-acc-plugins'))
    .pipe(replace(/NEWS_ITEM_TEMPLATE_ID/g, '1204619'))
    .pipe(replace(/FDMG_SERVICES_BASE_URL/g, 'https://webwriter-acc.fd.nl'))
    .pipe(replace(/FDMG_SERVICES_TOKEN/g, 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItNjYxODc1NjIyMjg3NzcxNTU1MiIsInN1YiI6ImluZm9tYWtlciIsInJvbGUiOiJVU0VSIn0.35SdM_LRat9AAfrZJo4EM2mlDtYzk6X3rARTW9I4XKWM4tvBCpb2gKzVewmWQq1DuqOhCskr3HNdSf7tK664Rw'))
    .pipe(replace(/HOLLANDSE_HOOGTE_TOKEN/g, '63401c89-63e9-35f9-9daa-a55ef26c3042'))
    .pipe(replace(/API_GATEWAY_BASE_URL/g, 'https://apigateway-dev.fdmg.nl'))
    .pipe(rename('acc-writer-client.json'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('prod-config-generate', function(){
  /**
   * Replace placeholders.
   */
  gulp.src(['writer-fd-dev.json'])
    .pipe(replace(/WEBWRITER_PLUGINS_BASE_URL/g, 'https://s3-eu-west-1.amazonaws.com/webwriter-plugins'))
    .pipe(replace(/NEWS_ITEM_TEMPLATE_ID/g, '1171067'))
    .pipe(replace(/FDMG_SERVICES_BASE_URL/g, 'https://webwriter.fd.nl'))
    .pipe(replace(/FDMG_SERVICES_TOKEN/g, 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI3NTQ5ODQzMzcxNzQxNjc2NTA4Iiwic3ViIjoiZmV3ZmV3Zndmd2VmZXdjZXdjZXdjZXdkcXdkIiwicm9sZSI6IlVTRVIifQ.RCn3YIFB7LmVzJrf9B-F_xyDAtZ4Zpod_CwOFHEWbJISDu_EaYh0-eseWACxrBS2BP3XT9DH-tBJTIyzj3lZ3A'))
    .pipe(replace(/HOLLANDSE_HOOGTE_TOKEN/g, '63401c89-63e9-35f9-9daa-a55ef26c3042'))
    .pipe(replace(/API_GATEWAY_BASE_URL/g, 'https://apigateway-dev.fdmg.nl'))
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
