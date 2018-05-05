import convict from 'convict';

const config = convict.config({
  lambdaAccessKey: {
    doc: 'API key to limit unathenticated access to lambda',
    format: 'String',
    default: 'test_key_goes_here', // set local config here
    env: 'LAMBDA_AUTH_KEY'
  }
});

export default config;
