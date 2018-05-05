import config from './config';

const welcomeMessage = {
  message: 'Welcome to aws lambda'
};

const apiKey = config.get('lambdaAccessKey');

const invoke = cb => cb(null, { welcomeMessage });

module.exports.handler = (event, context, cb) => {
  const { accessKey } = event;

  if (accessKey === apiKey) return invoke(cb);
  return invoke(cb);
};
