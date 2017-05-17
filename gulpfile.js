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
  console.log('Request config', url);
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('FDMG Services Config:', body);
      const jsonBody = JSON.parse(body);
      for (let key in configObject) {
        console.log(key, "=", jsonBody.propertySources[0].source[key]);
        configObject[key] = jsonBody.propertySources[0].source[key];
      }
      console.log('Configuration:', configObject);
      cb(configObject);
    } else {
      console.log("Could not retrieve FDMG services config");
      return process.exit(2);
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
    .pipe(replace(/FDMG_PREVIEW_URL/g, data['fdmg.previewUrl']))
    .pipe(replace(/FDMG_BASE_DOMAIN_URL/g, data['fdmg.baseDomainUrl']))
    .pipe(replace(/FDMG_INSTRUCTIONS_MANUAL_URL/g, data['fdmg.instructionsManualUrl']))
    .pipe(replace(/CACHEBUSTER/g, gutil.env.ci_commit_sha || 'SNAPSHOT'))
    .pipe(replace(/FDMG_EMERGENCY_PHONE_NUMBER/g, data['fdmg.emergencyPhoneNumber']))
    .pipe(replace(/FDMG_GROUP_MAIL_BOX/g, data['fdmg.groupMailBox']))
    .pipe(rename(data['fdmg.fileName']))
    .pipe(gulp.dest(data['fdmg.destination']));
}

gulp.task('config-devbox-generate', function() {
  console.log('Creating config for devbox VM');
  writeConfig({
    'fdmg.source': 'writer-fd.json',
    'infoMaker.plugins.base': 'https://plugins.writer.infomaker.io/dev',
    'fdmg.webwriter.plugins.base': 'https://webwriter-devbox.fdmg.org/plugins',
    'fdmg.newsItem.template.id': '819',
    'fdmg.services.baseUrl': 'https://webwriter-devbox.fdmg.org/fdmgapi/private/fd',
    'fdmg.services.noProxyBaseUrl': 'https://api-devbox.fdmg.org/private/fd',
    'fdmg.services.token': 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ',
    'hollandseHoogte.token': '63401c89-63e9-35f9-9daa-a55ef26c3042',
    'fdmg.apiGatewayBaseUrl': 'https://apigateway-dev.fdmg.nl',
    'fdmg.previewUrl': 'https://preview-dev.fd.nl',
    'fdmg.fileName': 'writer.json',
    'fdmg.destination': '../NPWriter/dist/server/config/',
    'fdmg.baseDomainUrl': 'dev.fd.nl',
    'fdmg.instructionsManualUrl': 'http://static.fd.nl/webwriter-manual/fd-writer-manual.pdf',
    'fdmg.emergencyPhoneNumber' : '+31 020 592 8553',
    'fdmg.groupMailBox' : 'webwriter@fdmediagroep.nl'
  });
});

/* FD Environments */
gulp.task('local-config-fd-generate', function() {
  console.log('Creating "local" config for FD writer');
  writeConfig({
    'fdmg.source': 'writer-fd.json',
    'infoMaker.plugins.base': 'https://plugins.writer.infomaker.io/dev',
    'fdmg.webwriter.plugins.base': 'http://localhost:3000',
    'fdmg.newsItem.template.id': '1156201',
    'fdmg.services.baseUrl': 'https://webwriter-dev.fd.nl/fdmgapi/private/fd',
    'fdmg.services.noProxyBaseUrl': 'https://dev-api.fdmg.org/private/fd',
    'fdmg.services.token': 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjMiLCJzdWIiOiJzdmVuIiwicm9sZSI6InVzZXIifQ.omGBEdLl3e_bxNFq83bsTUZnO5HU_c0gltDuTFWM_KlLJWtlZzDo1F7jGD6zPD54XmimTAWmD5XKIlhMQVmChQ',
    'hollandseHoogte.token': '63401c89-63e9-35f9-9daa-a55ef26c3042',
    'fdmg.apiGatewayBaseUrl': 'https://apigateway-dev.fdmg.nl',
    'fdmg.previewUrl': 'https://preview-dev.fd.nl',
    'fdmg.fileName': 'writer-fd.json',
    'fdmg.destination': '../NPWriter/server/config/',
    'fdmg.baseDomainUrl': 'dev.fd.nl',
    'fdmg.instructionsManualUrl': 'http://static.fd.nl/webwriter-manual/fd-writer-manual.pdf',
    'fdmg.emergencyPhoneNumber' : '+31 020 592 8553',
    'fdmg.groupMailBox' : 'webwriter@fdmediagroep.nl'
  });
});

gulp.task('dev-config-fd-generate', function() {
  console.log('Creating "development" config for FD writer');
  getConfig(gutil.env.fdmg_services_config_url + '-dev/fd', writeConfig);
});

gulp.task('acc-config-fd-generate', function() {
  console.log('Creating "acceptance" config for FD writer');
  getConfig(gutil.env.fdmg_services_config_url + '-acc/fd', writeConfig);
});

gulp.task('prod-config-fd-generate', function() {
  console.log('Creating "production" config for FD writer');
  getConfig(gutil.env.fdmg_services_config_url + '-prod/fd', writeConfig);
});

/* BNR Environments */
gulp.task('local-config-bnr-generate', function() {
  console.log('Creating "local" config for BNR writer');
  writeConfig({
    'fdmg.source': 'writer-bnr.json',
    'infoMaker.plugins.base': 'https://plugins.writer.infomaker.io/dev',
    'fdmg.webwriter.plugins.base': 'http://localhost:3000',
    'fdmg.newsItem.template.id': '10018543',
    'fdmg.services.baseUrl': 'https://webwriter-dev.bnr.nl/fdmgapi/private/bnr',
    'fdmg.services.noProxyBaseUrl': 'https://dev-api.fdmg.org/private/bnr',
    'fdmg.services.token': 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI3OTgwNjk3MjIyOTI1MzUwNzYzIiwic3ViIjoiYm5yLWZkbWctc2VydmljZXMiLCJyb2xlIjoiUk9MRV9BTEwifQ.mcA6ZJWBBx88zNbHSclhNxqGZhnKcGvJ9_DA7xWBRJQL9YtFSxEtZtwJ7dXmCSkNlq2fUEb9-0mtoXj18nIiuw',
    'hollandseHoogte.token': '63401c89-63e9-35f9-9daa-a55ef26c3042',
    'fdmg.apiGatewayBaseUrl': 'https://apigateway-dev.fdmg.nl',
    'fdmg.previewUrl': 'https://preview-dev.bnr.nl',
    'fdmg.fileName': 'writer-bnr.json',
    'fdmg.destination': '../NPWriter/server/config/',
    'fdmg.baseDomainUrl': 'dev.bnr.nl',
    'fdmg.instructionsManualUrl': 'http://static.fd.nl/webwriter-manual/fd-writer-manual.pdf',
    'fdmg.emergencyPhoneNumber' : '+31 020 592 8553',
    'fdmg.groupMailBox' : 'webwriter@fdmediagroep.nl'
  });
});

gulp.task('dev-config-bnr-generate', function() {
  console.log('Creating "development" config for BNR writer');
  getConfig(gutil.env.fdmg_services_config_url + '-dev/bnr', writeConfig);
});

gulp.task('acc-config-bnr-generate', function() {
  console.log('Creating "acceptance" config for BNR writer');
  getConfig(gutil.env.fdmg_services_config_url + '-acc/bnr', writeConfig);
});

gulp.task('prod-config-bnr-generate', function() {
  console.log('Creating "production" config for BNR writer');
  getConfig(gutil.env.fdmg_services_config_url + '-prod/bnr', writeConfig);
});

/* ESB Environments */
gulp.task('local-config-esb-generate', function() {
  console.log('Creating "local" config for ESB writer');
  writeConfig({
    'fdmg.source': 'writer-esb.json',
    'infoMaker.plugins.base': 'https://plugins.writer.infomaker.io/dev',
    'fdmg.webwriter.plugins.base': 'http://localhost:3000',
    'fdmg.newsItem.template.id': '30eae1c0-c640-4053-b114-05c64e28bbe7',
    'fdmg.services.baseUrl': 'https://webwriter-dev.esb.nu/fdmgapi/private/esb',
    'fdmg.services.noProxyBaseUrl': 'https://dev-api.fdmg.org/private/esb',
    'fdmg.services.token': 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI5MDA0Nzc2NDc3ODQyMDQ1ODAwIiwic3ViIjoiU2VydmljZXMiLCJyb2xlIjoiVVNFUiJ9.vRx7zG0lTInK6BCnoy25FRXNO6kGP8bi03eB1xviWjkM4xq-fQ6EoBR88yZPC4CAfdjpcNcQ_pxlJbvcISaAOw',
    'hollandseHoogte.token': '63401c89-63e9-35f9-9daa-a55ef26c3042',
    'fdmg.apiGatewayBaseUrl': 'https://apigateway-dev.fdmg.nl',
    'fdmg.fileName': 'writer-fd.json',
    'fdmg.previewUrl': 'https://preview-dev.esb.nu',
    'fdmg.destination': '../NPWriter/server/config/',
    'fdmg.baseDomainUrl': 'dev.esb.nu',
    'fdmg.instructionsManualUrl': 'http://static.fd.nl/webwriter-manual/fd-writer-manual.pdf',
    'fdmg.emergencyPhoneNumber' : '+31 020 592 8553',
    'fdmg.groupMailBox' : 'webwriter@fdmediagroep.nl'
  });
});

gulp.task('dev-config-esb-generate', function() {
  console.log('Creating "development" config for ESB writer');
  getConfig(gutil.env.fdmg_services_config_url + '-dev/esb', writeConfig);
});

gulp.task('acc-config-esb-generate', function() {
  console.log('Creating "acceptance" config for ESB writer');
  getConfig(gutil.env.fdmg_services_config_url + '-acc/esb', writeConfig);

});

gulp.task('prod-config-esb-generate', function() {
  console.log('Creating "production" config for ESB writer');
  getConfig(gutil.env.fdmg_services_config_url + '-prod/esb', writeConfig);
});

/* PensioenPro Environments */
gulp.task('local-config-pensioenpro-generate', function() {
  console.log('Creating "local" config for PensioenPro writer');
  writeConfig({
    'fdmg.source': 'writer-pensioenpro.json',
    'infoMaker.plugins.base': 'https://plugins.writer.infomaker.io/dev',
    'fdmg.webwriter.plugins.base': 'http://localhost:3000',
    'fdmg.newsItem.template.id': '30eae1c0-c640-4053-b114-05c64e28bbe7',
    'fdmg.services.baseUrl': 'https://webwriter-dev.pensioenpro.nl/fdmgapi/private/pensioenpro',
    'fdmg.services.noProxyBaseUrl': 'https://dev-api.fdmg.org/private/pensioenpro',
    'fdmg.services.token': 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiItNDI2MzAzODcwMDAxODgyOTMzOCIsInN1YiI6IlNlcnZpY2VzIiwicm9sZSI6IlJPTEVfVVNFUiJ9.DTK154YTSJ6Hkf6bt2K-YsYnJPpQ30ci5Qa0aQZFkhwrpnpuHGXzeXDbWjbFK2B5diPYRruVtHl5oC8OV066qQ',
    'hollandseHoogte.token': '63401c89-63e9-35f9-9daa-a55ef26c3042',
    'fdmg.apiGatewayBaseUrl': 'https://apigateway-dev.fdmg.nl',
    'fdmg.fileName': 'writer-fd.json',
    'fdmg.previewUrl': 'https://preview-dev.pensioenpro.nl',
    'fdmg.destination': '../NPWriter/server/config/',
    'fdmg.baseDomainUrl': 'dev.pensioenpro.nl',
    'fdmg.instructionsManualUrl': 'http://static.fd.nl/webwriter-manual/fd-writer-manual.pdf',
    'fdmg.emergencyPhoneNumber' : '+31 020 592 8553',
    'fdmg.groupMailBox' : 'webwriter@fdmediagroep.nl'
  });
});

gulp.task('dev-config-pensioenpro-generate', function() {
  console.log('Creating "development" config for ESB writer');
  getConfig(gutil.env.fdmg_services_config_url + '-dev/pensioenpro', writeConfig);
});

gulp.task('acc-config-pensioenpro-generate', function() {
  console.log('Creating "acceptance" config for ESB writer');
  getConfig(gutil.env.fdmg_services_config_url + '-acc/pensioenpro', writeConfig);

});

gulp.task('prod-config-pensioenpro-generate', function() {
  console.log('Creating "production" config for ESB writer');
  getConfig(gutil.env.fdmg_services_config_url + '-prod/pensioenpro', writeConfig);
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
    'fdmg.destination': '',
    'fdmg.aws.bucket': '',
    'fdmg.aws.key': '',
    'fdmg.aws.region': '',
    'fdmg.aws.secret': '',
    'infoMaker.aws.key': '',
    'infoMaker.aws.secret': '',
    'infoMaker.aws.bucket': '',
    'infoMaker.aws.region': '',
    'fdmg.previewUrl': '',
    'fdmg.baseDomainUrl': '',
    'fdmg.instructionsManualUrl': '',
    'fdmg.emergencyPhoneNumber' : '',
    'fdmg.groupMailBox' : ''
  };
}

/**
 * Deploy to S3.
 */
function deploy(configFile) {
  let distFolder = configFile['fdmg.destination'] + '/';
  let writerClient = distFolder + configFile['fdmg.fileName'];
  let files = [writerClient, distFolder + 'index.js', distFolder + 'style.css'];
  s3ConfigFdmgDeploy(files, getS3ConfigFdmg(configFile));
  return s3ConfigInfoMakerDeploy(writerClient, getS3ConfigInfoMaker(configFile));
}

function s3ConfigFdmgDeploy(configFile, s3Config) {
  return gulp.src(configFile)
    .pipe(print())
    .pipe(gzip())
    .pipe(s3(s3Config, { gzippedOnly: true }));
}

function s3ConfigInfoMakerDeploy(configFile, s3Config) {
  let options = { headers: { 'x-amz-acl': 'bucket-owner-read' } };
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

gulp.task('dev-bnr-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-dev/bnr', deploy);
});
gulp.task('acc-bnr-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-acc/bnr', deploy);
});
gulp.task('prod-bnr-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-prod/bnr', deploy);
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

gulp.task('dev-pensioenpro-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-dev/pensioenpro', deploy);
});
gulp.task('acc-pensioenpro-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-acc/pensioenpro', deploy);
});
gulp.task('prod-pensioenpro-deploy-webwriter-config', [], function() {
  getConfig(gutil.env.fdmg_services_config_url + '-prod/pensioenpro', deploy);
});

// Clean
gulp.task('clean', function() {
  return del([
    './dist/**'
  ]);
});

// Default build development
gulp.task('generate-config-fd', ['dev-config-fd-generate', 'acc-config-fd-generate', 'prod-config-fd-generate']);
gulp.task('generate-config-bnr', ['dev-config-bnr-generate', 'acc-config-bnr-generate', 'prod-config-bnr-generate']);
gulp.task('generate-config-esb', ['dev-config-esb-generate', 'acc-config-esb-generate', 'prod-config-esb-generate']);
gulp.task('generate-config-pensioenpro', ['dev-config-pensioenpro-generate', 'acc-config-pensioenpro-generate', 'prod-config-pensioenpro-generate']);
gulp.task('default', ['clean', 'local-config-fd-generate']);
