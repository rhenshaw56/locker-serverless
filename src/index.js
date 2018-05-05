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
    return db.put(body);

  case 'get':
    return db.get(body);

  case 'delete':
    return db.remove(body);

  default:
    return Promise.reject(Error('Invalid request'));
  }
};

module.exports.handler = (event, context, cb) => {
  console.log({ event });
  const { accessKey } = event;

  if (accessKey === apiKey) return invoke(event).then(response => cb(null, response));
};
