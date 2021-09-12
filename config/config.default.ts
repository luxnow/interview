import { EggAppConfig } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

export default (appInfo: EggAppConfig) => {
  const config: any = {};

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  config.view = {
    cache: false
  };

  config.vuessr = {
    layout: path.resolve(appInfo.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      basedir: path.join(appInfo.baseDir, 'app/view'),
    },
  };

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(appInfo.baseDir, 'logs')
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'public')
  };

  config.keys = '123456';

  config.middleware = [
    'access',
    'global'
  ];

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'xxl_job',
    username: 'root',
    password: 'Q1w2e3r4'
  };

  exports.jwt = {
    secret: 'web_site_jwt',
    enable: true, // default is false
    match: '/jwt', // optional
  };

  exports.bcrypt = {
    saltRounds: 10 // default 10
  };

  config.security = {
    csrf: {
      enable: false,
    },
    xframe: {
      enable: false,
    },
  };
  return config;
};
