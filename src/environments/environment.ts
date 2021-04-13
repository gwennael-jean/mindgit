const config = require('../../package.json');

export const AppConfig = {
  production: false,
  environment: 'LOCAL',
  version: config.version,
  author: config.author.name
};
