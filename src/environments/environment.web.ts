const config = require('../../package.json');

export const AppConfig = {
  production: false,
  environment: 'WEB',
  version: config.version,
  author: config.author.name
};
