
const welcomeMessage = {
  "message": "Welcome to aws lambda"
};
const apiKey = process.env.LAMBDA_AUTH;
const invoke = cb => cb(null, {welcomeMessage});

module.exports.handler = (event, context, cb) => {
  const { authorizationToken } = event;

  const apiKey = config.get('exportsApiKey');
  if (authorizationToken === apiKey) return invoke(cb);

};