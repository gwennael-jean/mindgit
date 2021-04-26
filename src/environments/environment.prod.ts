const config = require('../../package.json');

export const AppConfig = {
  production: true,
  environment: 'PROD',
  version: config.version,
  author: config.author.name,
  appName: config.name
};
