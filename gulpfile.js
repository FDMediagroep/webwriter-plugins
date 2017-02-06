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

function config(data) {
  console.log('Replace placeholders in ./src/config/placeholder/AppConfig.ts');
  return gulp.src([data.source])
    .pipe(replace(/INFOMAKER_PLUGINS_BASE_URL/g, data.infoMakerPluginsBase))
    .pipe(replace(/WEBWRITER_PLUGINS_BASE_URL/g, data.webwriterPluginsBase))
    .pipe(replace(/NEWS_ITEM_TEMPLATE_ID/g, data.newsItemTemplateId))
    .pipe(replace(/FDMG_SERVICES_BASE_URL/g, data.fdmgServicesBaseUrl))
    .pipe(replace(/FDMG_SERVICES_NO_PROXY_BASE_URL/g, data.fdmgServicesNoProxyBaseUrl))
    .pipe(replace(/FDMG_SERVICES_TOKEN/g, data.fdmgServicesToken))
    .pipe(replace(/HOLLANDSE_HOOGTE_TOKEN/g, data.hollandseHoogteToken))
    .pipe(replace(/API_GATEWAY_BASE_URL/g, data.apiGatewayBaseUrl))
    .pipe(rename(data.fileName))
    .pipe(gulp.dest(data.destination));
}

/* FD Environments */
gulp.task('local-config-fd-generate', function(){
  console.log('Creating "local" config for FD writer');
  config({
    source                      : 'writer-fd-dev.json',
    infoMakerPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/webwriter-dev-plugins',
    webwriterPluginsBase        : 'http://localhost:3000',
    newsItemTemplateId          : '30eae1c0-c640-4053-b114-05c64e28bbe7',
    fdmgServicesBaseUrl         : 'https://webwriter-dev.fd.nl/fdmgapi/private/fd',
    fdmgServicesNoProxyBaseUrl  : 'https://dev-api.fdmg.org/private/fd',
    fdmgServicesToken           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ',
    hollandseHoogteToken        : '63401c89-63e9-35f9-9daa-a55ef26c3042',
    apiGatewayBaseUrl           : 'https://apigateway-dev.fdmg.nl',
    fileName                    : 'writer-fd-dev.json',
    destination                 : '../NPWriter/server/config/'
  });
});

gulp.task('dev-config-fd-generate', function(){
  console.log('Creating "development" config for FD writer');
  config({
    source                      : 'writer-fd-dev.json',
    infoMakerPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/writer-dev-plugins',
    webwriterPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/webwriter-dev-plugins',
    newsItemTemplateId          : '1156201',
    fdmgServicesBaseUrl         : 'https://webwriter-dev.fd.nl/fdmgapi/private/fd',
    fdmgServicesNoProxyBaseUrl  : 'https://dev-api.fdmg.org/private/fd',
    fdmgServicesToken           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ',
    hollandseHoogteToken        : '63401c89-63e9-35f9-9daa-a55ef26c3042',
    apiGatewayBaseUrl           : 'https://apigateway-dev.fdmg.nl',
    fileName                    : 'dev-writer-client.json',
    destination                 : './dist'
  });
});

gulp.task('acc-config-fd-generate', function(){
  console.log('Creating "acceptance" config for FD writer');
  config({
    source                      : 'writer-fd-dev.json',
    infoMakerPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/writer-production-plugins',
    webwriterPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/webwriter-acc-plugins',
    newsItemTemplateId          : '1204619',
    fdmgServicesBaseUrl         : 'https://webwriter-acc.fd.nl/fdmgapi/private/fd',
    fdmgServicesNoProxyBaseUrl  : 'https://acc-api.fdmg.org/private/fd',
    fdmgServicesToken           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItNjYxODc1NjIyMjg3NzcxNTU1MiIsInN1YiI6ImluZm9tYWtlciIsInJvbGUiOiJVU0VSIn0.35SdM_LRat9AAfrZJo4EM2mlDtYzk6X3rARTW9I4XKWM4tvBCpb2gKzVewmWQq1DuqOhCskr3HNdSf7tK664Rw',
    hollandseHoogteToken        : 'f021be3b-a527-364a-a93e-03de82270efc',
    apiGatewayBaseUrl           : 'https://apigateway-acc.fdmg.nl',
    fileName                    : 'acc-writer-client.json',
    destination                 : './dist'
  });
});

gulp.task('prod-config-fd-generate', function(){
  console.log('Creating "production" config for FD writer');
  config({
    source                      : 'writer-fd-dev.json',
    infoMakerPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/writer-production-plugins',
    webwriterPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/webwriter-plugins',
    newsItemTemplateId          : '1171067',
    fdmgServicesBaseUrl         : 'https://webwriter.fd.nl/fdmgapi/private/fd',
    fdmgServicesNoProxyBaseUrl  : 'https://api.fdmg.org/private/fd',
    fdmgServicesToken           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItMjgyODgyODMxNDU0ODY5MzIyIiwic3ViIjoiaW5mb21ha2VyIiwicm9sZSI6IlVTRVIifQ.8j3gRJplT9t0mUPEjWoGUxOO7kvJqbhwrIdneOY7Csyy8oyr8ff3XmdHfXpC4VCiWT8O06sSlP-9We63l60Gw',
    hollandseHoogteToken        : '77bd7434-7ffa-34b8-bafe-a1b6f24be599',
    apiGatewayBaseUrl           : 'https://apigateway.fdmg.nl',
    fileName                    : 'prod-writer-client.json',
    destination                 : './dist'
  });
});

/* ESB Environments */
gulp.task('local-config-esb-generate', function(){
  console.log('Creating "local" config for ESB writer');
  config({
    source                      : 'writer-esb-dev.json',
    infoMakerPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/writer-dev-plugins',
    webwriterPluginsBase        : 'http://localhost:3000',
    newsItemTemplateId          : '20003109',
    fdmgServicesBaseUrl         : 'https://webwriter-dev.esb.nu/fdmgapi/private/esb',
    fdmgServicesNoProxyBaseUrl  : 'https://dev-api.fdmg.org/private/esb',
    fdmgServicesToken           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI5MDA0Nzc2NDc3ODQyMDQ1ODAwIiwic3ViIjoiU2VydmljZXMiLCJyb2xlIjoiVVNFUiJ9.vRx7zG0lTInK6BCnoy25FRXNO6kGP8bi03eB1xviWjkM4xq-fQ6EoBR88yZPC4CAfdjpcNcQ_pxlJbvcISaAOw',
    hollandseHoogteToken        : '63401c89-63e9-35f9-9daa-a55ef26c3042',
    apiGatewayBaseUrl           : 'https://apigateway-dev.fdmg.nl',
    fileName                    : 'dev-writer-client.json',
    destination                 : '../NPWriter/server/config/'
  });
});

gulp.task('dev-config-esb-generate', function(){
  console.log('Creating "development" config for ESB writer');
  config({
    source                      : 'writer-esb-dev.json',
    infoMakerPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/writer-dev-plugins',
    webwriterPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/webwriter-dev-plugins',
    newsItemTemplateId          : '20003109',
    fdmgServicesBaseUrl         : 'https://webwriter-dev.esb.nu/fdmgapi/private/esb',
    fdmgServicesNoProxyBaseUrl  : 'https://dev-api.fdmg.org/private/esb',
    fdmgServicesToken           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI5MDA0Nzc2NDc3ODQyMDQ1ODAwIiwic3ViIjoiU2VydmljZXMiLCJyb2xlIjoiVVNFUiJ9.vRx7zG0lTInK6BCnoy25FRXNO6kGP8bi03eB1xviWjkM4xq-fQ6EoBR88yZPC4CAfdjpcNcQ_pxlJbvcISaAOw',
    hollandseHoogteToken        : '63401c89-63e9-35f9-9daa-a55ef26c3042',
    apiGatewayBaseUrl           : 'https://apigateway-dev.fdmg.nl',
    fileName                    : 'esb-dev-writer-client.json',
    destination                 : './dist'
  });
});

gulp.task('acc-config-esb-generate', function(){
  console.log('Creating "acceptance" config for ESB writer');
  config({
    source                      : 'writer-fd-dev.json',
    infoMakerPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/writer-production-plugins',
    webwriterPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/webwriter-acc-plugins',
    newsItemTemplateId          : '20003109',
    fdmgServicesBaseUrl         : 'https://webwriter-acc.esb.nu/fdmgapi/private/esb',
    fdmgServicesNoProxyBaseUrl  : 'https://acc-api.fdmg.org/private/esb',
    fdmgServicesToken           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItODQ4NjA0OTc4NTk4NTYxODE5NSIsInN1YiI6ImZkbWdfc2VydmljZXMiLCJyb2xlIjoiVVNFUiJ9.VVES6D2RCrF90XvZLS8BWu0FoEGdCOlkfCtE7hvrVHp3Zw_ZxtqD8Es5KG4fQKBWZtWCKHJEQU2yUnHVYPqsCQ',
    hollandseHoogteToken        : 'f021be3b-a527-364a-a93e-03de82270efc',
    apiGatewayBaseUrl           : 'https://apigateway-acc.fdmg.nl',
    fileName                    : 'acc-writer-client.json',
    destination                 : './dist'
  });
});

gulp.task('prod-config-esb-generate', function(){
  console.log('Creating "production" config for ESB writer');
  config({
    source                      : 'writer-fd-dev.json',
    infoMakerPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/writer-production-plugins',
    webwriterPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/webwriter-plugins',
    newsItemTemplateId          : '20003109',
    fdmgServicesBaseUrl         : 'https://webwriter.esb.nu/fdmgapi/private/esb',
    fdmgServicesNoProxyBaseUrl  : 'https://acc.fdmg.org/private/esb',
    fdmgServicesToken           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItNjY2MjU2NzgyNTk5OTIwMDM3NyIsInN1YiI6ImZkbWdfc2VydmljZXMiLCJyb2xlIjoiVVNFUiJ9.7a3I4CJbMM8BSf4sT3mbcEoMB9ttmbr9znXND0Y024b_OO9AEwCkOzkaHEkjrjglYJfyJCO59wzfzE0ZK_Fjbg',
    hollandseHoogteToken        : '77bd7434-7ffa-34b8-bafe-a1b6f24be599',
    apiGatewayBaseUrl           : 'https://apigateway.fdmg.nl',
    fileName                    : 'prod-writer-client.json',
    destination                 : './dist'
  });
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
