const config = require('../../package.json');

export const AppConfig = {
  production: false,
  environment: 'DEV',
  version: config.version,
  author: config.author.name,
  appName: config.name
};
