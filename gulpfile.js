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

/**
 * Replace placeholders in config file for FD and BNR
 * @param source - sourcefile
 * @param publication - the writer publiction (fd, bnr)
 * @param environment - the writer environment (-dev, -acc, leave blank for prod)
 * @param fdmgToken - FDMG token
 * @param articleId - Template article id for environment and publication
 */
function config(source, publication, environment, fdmgToken, articleId) {
  console.log('Replace placeholders in ./src/config/placeholder/AppConfig.ts');
  return gulp.src([source])
    .pipe(replace(/INFOMAKER_PLUGINS_BASE_URL/g, 'https://s3-eu-west-1.amazonaws.com/writer-production-plugins'))
    .pipe(replace(/WEBWRITER_PLUGINS_BASE_URL/g, `https://s3-eu-west-1.amazonaws.com/webwriter-${environment}-plugins`))
    .pipe(replace(/NEWS_ITEM_TEMPLATE_ID/g, articleId))
    .pipe(replace(/FDMG_SERVICES_BASE_URL/g, `https://webwriter${environment}.${publication}.nl/fdmgapi/private/${publication}`))
    .pipe(replace(/FDMG_SERVICES_NO_PROXY_BASE_URL/g, `https://${environment}-api.fdmg.org/private/${publication}`))
    .pipe(replace(/FDMG_SERVICES_TOKEN/g, fdmgToken))
    .pipe(replace(/HOLLANDSE_HOOGTE_TOKEN/g, 'f021be3b-a527-364a-a93e-03de82270efc'))
    .pipe(replace(/API_GATEWAY_BASE_URL/g, `https://apigateway-${environment}.fdmg.nl`))
}

/**
 * Webwriter FD configs
 */

 /* Local FD config */
gulp.task('local-config-fd-generate', function(){
  const fdmgToken = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ'
  const configFile = config('writer-fd-dev.json', 'fd', 'dev', fdmgToken, '30eae1c0-c640-4053-b114-05c64e28bbe7', '../NPWriter/server/config');

  configFile.pipe(replace(/https:\/\/s3-eu-west-1.amazonaws.com\/webwriter-dev-plugins/g, 'http://localhost:3000'))
  .pipe(rename(`dev-writer-client.json`))
  .pipe(gulp.dest('../NPWriter/server/config/'));
});

/* Development FD config */
gulp.task('dev-config-fd-generate', function(){
  const fdmgToken = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItMjgyODgyODMxNDU0ODY5MzIyIiwic3ViIjoiaW5mb21ha2VyIiwicm9sZSI6IlVTRVIifQ.8j3gRJplT9t0mUPEjWoGUxOO7kvJqbhwrIdneOY7Csyy8oyr8ff3XmdHfXpC4VCiWT8O06sSlP-9We63l60Gw'
  const configFile = config('writer-fd-dev.json', 'fd', 'dev', fdmgToken, '1156201');

  configFile.pipe(rename(`dev-writer-client.json`))
    .pipe(gulp.dest('./dist'));
});

/* Acceptance FD config */
gulp.task('acc-config-fd-generate', function(){
  const fdmgToken = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItNjYxODc1NjIyMjg3NzcxNTU1MiIsInN1YiI6ImluZm9tYWtlciIsInJvbGUiOiJVU0VSIn0.35SdM_LRat9AAfrZJo4EM2mlDtYzk6X3rARTW9I4XKWM4tvBCpb2gKzVewmWQq1DuqOhCskr3HNdSf7tK664Rw'
  const configFile = config('writer-fd-dev.json', 'fd', 'acc', fdmgToken, '1204619');

  configFile.pipe(rename(`acc-writer-client.json`))
    .pipe(gulp.dest('./dist'));
});

/* Production FD config */
gulp.task('prod-config-fd-generate', function(){
  const fdmgToken = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItMjgyODgyODMxNDU0ODY5MzIyIiwic3ViIjoiaW5mb21ha2VyIiwicm9sZSI6IlVTRVIifQ.8j3gRJplT9t0mUPEjWoGUxOO7kvJqbhwrIdneOY7Csyy8oyr8ff3XmdHfXpC4VCiWT8O06sSlP-9We63l60Gw'
  const configFile = config('writer-fd-dev.json', 'fd', '', fdmgToken, '1171067');

  configFile.pipe(replace(/webwriter--plugins/g, `webwriter-plugins`))
  .pipe(rename(`prod-writer-client.json`))
  .pipe(gulp.dest('./dist'));
});

/**
 * Webwriter ESB configs
 */

/* Local ESB config */
gulp.task('local-config-esb-generate', function(){
  const fdmgToken = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ'
  const configFile = config('writer-esb-dev.json', 'esb', 'dev', fdmgToken, '30eae1c0-c640-4053-b114-05c64e28bbe7', '../NPWriter/server/config');

  configFile.pipe(replace(/https:\/\/s3-eu-west-1.amazonaws.com\/webwriter-dev-plugins/g, 'http://localhost:3000'))
  .pipe(rename(`dev-writer-client.json`))
  .pipe(gulp.dest('../NPWriter/server/config/'));
});

/* Development ESB config */
gulp.task('dev-config-esb-generate', function(){
  const fdmgToken = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItMjgyODgyODMxNDU0ODY5MzIyIiwic3ViIjoiaW5mb21ha2VyIiwicm9sZSI6IlVTRVIifQ.8j3gRJplT9t0mUPEjWoGUxOO7kvJqbhwrIdneOY7Csyy8oyr8ff3XmdHfXpC4VCiWT8O06sSlP-9We63l60Gw'
  const configFile = config('writer-esb-dev.json', 'esb', 'dev', fdmgToken, '1156201');

  configFile.pipe(rename(`dev-writer-client.json`))
   .pipe(gulp.dest('./dist'));
});

/* Acceptance ESB config */
gulp.task('acc-config-esb-generate', function(){
  const fdmgToken = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItNjYxODc1NjIyMjg3NzcxNTU1MiIsInN1YiI6ImluZm9tYWtlciIsInJvbGUiOiJVU0VSIn0.35SdM_LRat9AAfrZJo4EM2mlDtYzk6X3rARTW9I4XKWM4tvBCpb2gKzVewmWQq1DuqOhCskr3HNdSf7tK664Rw'
  const configFile = config('writer-esb-dev.json', 'esb', 'acc', fdmgToken, '1204619');

  configFile.pipe(rename(`acc-writer-client.json`))
   .pipe(gulp.dest('./dist'));
});

/* Production ESB config */
gulp.task('prod-config-esb-generate', function(){
  const fdmgToken = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItMjgyODgyODMxNDU0ODY5MzIyIiwic3ViIjoiaW5mb21ha2VyIiwicm9sZSI6IlVTRVIifQ.8j3gRJplT9t0mUPEjWoGUxOO7kvJqbhwrIdneOY7Csyy8oyr8ff3XmdHfXpC4VCiWT8O06sSlP-9We63l60Gw'
  const configFile = config('writer-esb-dev.json', 'esb', '', fdmgToken, '1171067');

  configFile.pipe(replace(/webwriter--plugins/g, `webwriter-plugins`))
   .pipe(rename(`prod-writer-client.json`))
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
gulp.task('generate-config-fd', ['dev-config-fd-generate', 'acc-config-fd-generate', 'prod-config-fd-generate']);
gulp.task('generate-config-esb', ['dev-config-esb-generate', 'acc-config-esb-generate', 'prod-config-esb-generate']);
gulp.task('default', ['generate-config-fd']);
