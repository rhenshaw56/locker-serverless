import config from './config';
import * as db from './lib/db';

const welcomeMessage = {
  message: 'Welcome to aws lambda'
};

const apiKey = config.get('lambdaAccessKey');

const invoke = (event, cb) => {
  const {
    action,
    resource,
    body = {}
  } = event;

  switch (action || resource) {

  case 'create':
    return {};

  default:
    return Promise.reject(Error('Invalid request'));
  }
};

module.exports.handler = (event, context, cb) => {
  const { accessKey } = event;

  if (accessKey === apiKey) return invoke(cb, event);
  return invoke(event).then(response => cb(null, response));
};
