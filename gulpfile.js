// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var gutil = require('gulp-util');
var gzip = require("gulp-gzip");
var print = require('gulp-print');
var s3 = require("gulp-s3");

var rename = require('gulp-rename');
var replace = require('gulp-replace');
var del = require('del');
var request = require('request');

function getConfig(url, cb) {
  let configObject = initializeConfig();
  console.log('Request config',url);
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('FDMG Services Config:', body);
      const jsonBody = JSON.parse(body);
      for (let key in configObject) {
        console.log(key, "=", jsonBody.propertySources[0].source[key]);
        configObject[key] = jsonBody.propertySources[0].source[key];
      }
      console.log('Configuration:', configObject);
      cb(configObject);
    }
  });
  return configObject;
}

function writeConfig(data) {
  console.log('Written ' + data['fdmg.fileName'] + ' to: ' + data['fdmg.destination']);
  return gulp.src([data['fdmg.source']])
    .pipe(replace(/INFOMAKER_PLUGINS_BASE_URL/g, data['infoMaker.plugins.base']))
    .pipe(replace(/WEBWRITER_PLUGINS_BASE_URL/g, data['fdmg.webwriter.plugins.base']))
    .pipe(replace(/NEWS_ITEM_TEMPLATE_ID/g, data['fdmg.newsItem.template.id']))
    .pipe(replace(/FDMG_SERVICES_BASE_URL/g, data['fdmg.services.baseUrl']))
    .pipe(replace(/FDMG_SERVICES_NO_PROXY_BASE_URL/g, data['fdmg.services.noProxyBaseUrl']))
    .pipe(replace(/FDMG_SERVICES_TOKEN/g, data['fdmg.services.token']))
    .pipe(replace(/HOLLANDSE_HOOGTE_TOKEN/g, data['hollandseHoogte.token']))
    .pipe(replace(/API_GATEWAY_BASE_URL/g, data['fdmg.apiGatewayBaseUrl']))
    .pipe(rename(data['fdmg.fileName']))
    .pipe(gulp.dest(data['fdmg.destination']));
}

gulp.task('config-devbox-generate', function(){
  console.log('Creating config for devbox VM');
  config({
    source                      : 'writer-fd-dev.json',
    infoMakerPluginsBase        : 'https://s3-eu-west-1.amazonaws.com/writer-dev-plugins',
    webwriterPluginsBase        : 'http://devbox.fdmg.org:3000',
    newsItemTemplateId          : '819',
    fdmgServicesBaseUrl         : 'https://api-devbox.fdmg.org/private',
    fdmgServicesNoProxyBaseUrl  : 'https://api-devbix.fdmg.org/private',
    fdmgServicesToken           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ',
    hollandseHoogteToken        : '63401c89-63e9-35f9-9daa-a55ef26c3042',
    apiGatewayBaseUrl           : 'https://apigateway-dev.fdmg.nl',
    fileName                    : 'writer.json',
    destination                 : '../NPWriter/dist/server/config'
  });
});

/* FD Environments */
gulp.task('local-config-fd-generate', function(){
  console.log('Creating "local" config for FD writer');
  writeConfig({
    'fdmg.source'                   : 'writer-fd-dev.json',
    'infoMaker.plugins.base'        : 'https://s3-eu-west-1.amazonaws.com/writer-dev-plugins',
    'fdmg.webwriter.plugins.base'   : 'http://localhost:3000',
    'fdmg.newsItem.template.id'     : '30eae1c0-c640-4053-b114-05c64e28bbe7',
    'fdmg.services.baseUrl'         : 'https://webwriter-dev.fd.nl/fdmgapi/private/fd',
    'fdmg.services.noProxyBaseUrl'  : 'https://dev-api.fdmg.org/private/fd',
    'fdmg.services.token'           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ',
    'hollandseHoogte.token'         : '63401c89-63e9-35f9-9daa-a55ef26c3042',
    'fdmg.apiGatewayBaseUrl'        : 'https://apigateway-dev.fdmg.nl',
    'fdmg.fileName'                 : 'writer-fd-dev.json',
    'fdmg.destination'              : '../NPWriter/server/config/'
  });
});

gulp.task('dev-config-fd-generate', function(){
  console.log('Creating "development" config for FD writer');
  getConfig(gutil.env.fdmg_services_config_url + '-dev/fd', writeConfig);
});

gulp.task('acc-config-fd-generate', function(){
  console.log('Creating "acceptance" config for FD writer');
  getConfig(gutil.env.fdmg_services_config_url + '-acc/fd', writeConfig);
});

gulp.task('prod-config-fd-generate', function(){
  console.log('Creating "production" config for FD writer');
  getConfig(gutil.env.fdmg_services_config_url + '-prod/fd', writeConfig);
});

/* ESB Environments */
gulp.task('local-config-esb-generate', function(){
  console.log('Creating "local" config for ESB writer');
  writeConfig({
    'fdmg.source'                   : 'writer-esb-dev.json',
    'infoMaker.plugins.base'        : 'https://s3-eu-west-1.amazonaws.com/writer-dev-plugins',
    'fdmg.webwriter.plugins.base'   : 'http://localhost:3000',
    'fdmg.newsItem.template.id'     : '20003109',
    'fdmg.services.baseUrl'         : 'https://webwriter-dev.esb.nu/fdmgapi/private/esb',
    'fdmg.services.noProxyBaseUrl'  : 'https://dev-api.fdmg.org/private/esb',
    'fdmg.services.token'           : 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI5MDA0Nzc2NDc3ODQyMDQ1ODAwIiwic3ViIjoiU2VydmljZXMiLCJyb2xlIjoiVVNFUiJ9.vRx7zG0lTInK6BCnoy25FRXNO6kGP8bi03eB1xviWjkM4xq-fQ6EoBR88yZPC4CAfdjpcNcQ_pxlJbvcISaAOw',
    'hollandseHoogte.token'         : '63401c89-63e9-35f9-9daa-a55ef26c3042',
    'fdmg.apiGatewayBaseUrl'        : 'https://apigateway-dev.fdmg.nl',
    'fdmg.fileName'                 : 'dev-writer-client.json',
    'fdmg.destination'              : '../NPWriter/server/config/'
  });
});

gulp.task('dev-config-esb-generate', function(){
  console.log('Creating "development" config for ESB writer');
  getConfig(gutil.env.fdmg_services_config_url + '-dev/esb', writeConfig);
});

gulp.task('acc-config-esb-generate', function(){
  console.log('Creating "acceptance" config for ESB writer');
  getConfig(gutil.env.fdmg_services_config_url + '-acc/esb', writeConfig);

});

gulp.task('prod-config-esb-generate', function(){
  console.log('Creating "production" config for ESB writer');
  getConfig(gutil.env.fdmg_services_config_url + '-prod/esb', writeConfig);
});

function initializeConfig() {
  return {
    'fdmg.source': '',
    'infoMaker.plugins.base': '',
    'fdmg.webwriter.plugins.base': '',
    'fdmg.newsItem.template.id': '',
    'fdmg.services.baseUrl': '',
    'fdmg.services.noProxyBaseUrl': '',
    'fdmg.services.token': '',
    'hollandseHoogte.token': '',
    'fdmg.apiGatewayBaseUrl': '',
    'fdmg.fileName': '',
    'fdmg.destination': ''
  };
}

/**
 * Deploy to S3.
 */
function deploy(configFile) {
  let writerClient = configFile['destination'] + '/' + configFile['fdmg.fileName'];
  s3ConfigFdmgDeploy(writerClient, getS3ConfigFdmg(configFile));
  return s3ConfigInfoMakerDeploy(writerClient, getS3ConfigInfoMaker(configFile));
}

function s3ConfigFdmgDeploy(configFile, s3Config) {
  return gulp.src(configFile)
    .pipe(print())
    .pipe(gzip())
    .pipe(s3(s3Config, { gzippedOnly: true }));
}

function s3ConfigInfoMakerDeploy(configFile, s3Config) {
  let options = {headers: {'x-amz-acl': 'bucket-owner-read'}};
  return gulp.src(configFile)
    .pipe(print())
    .pipe(s3(s3Config, options));
}

function getS3ConfigFdmg(configFile) {
  return {
    "key": configFile['fdmg.aws.key'],
    "secret": configFile['fdmg.aws.secret'],
    "bucket": configFile['fdmg.aws.bucket'],
    "region": configFile['fdmg.aws.region']
  };
}

function getS3ConfigInfoMaker(configFile) {
  return {
    "key": configFile['infoMaker.aws.key'],
    "secret": configFile['infoMaker.aws.secret'],
    "bucket": configFile['infoMaker.aws.bucket'],
    "region": configFile['infoMaker.aws.region']
  };
}

gulp.task('dev-fd-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-dev/fd', deploy);
});
gulp.task('acc-fd-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-acc/fd', deploy);
});
gulp.task('prod-fd-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-prod/fd', deploy);
});

gulp.task('dev-esb-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-dev/esb', deploy);
});
gulp.task('acc-esb-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-acc/esb', deploy);
});
gulp.task('prod-esb-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-prod/esb', deploy);
});

// Clean
gulp.task('clean', function() {
  return del([
    './dist/**'
  ]);
});

// Default build development
gulp.task('generate-config-fd', ['dev-config-fd-generate', 'acc-config-fd-generate', 'prod-config-fd-generate']);
gulp.task('generate-config-esb', ['dev-config-esb-generate', 'acc-config-esb-generate', 'prod-config-esb-generate']);
gulp.task('default', ['clean', 'local-config-fd-generate']);
