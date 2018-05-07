import config from './config';
import {
  get,
  remove,
  put
} from './lib/db';

const apiKey = config.get('lambdaAccessKey');

const invoke = (event) => {
  const {
    action,
    resource,
    body = {}
  } = event;


  switch (resource) {
  case '/create':
    return put(JSON.parse(body));

  case '/get':
    return get(JSON.parse(body));

  case '/delete':
    return remove(JSON.parse(body));

  default:
    return Error('Invalid Request');
  }
};

module.exports.handler = (event, context, cb) => {
  const accessKey = event.headers['x-api-key'];

  if (accessKey === apiKey) {
    invoke(event).then((response) => {
      cb(null, response);
    }).catch((error) => {
      cb(null, { statusCode: 400, body: JSON.stringify(error) });
    });
  }
};
