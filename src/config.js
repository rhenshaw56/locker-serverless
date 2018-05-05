import convict from 'convict';

const config = convict.config({
  lambdaAccessKey: {
    doc: 'API key to limit unathenticated access to lambda',
    format: 'String',
    default: 'test_key_goes_here', // set local config here
    env: 'LAMBDA_AUTH_KEY'
  },
  staging_db: {
    doc: 'dynamoDb for staging environment',
    format: 'String',
    default: 'seekteam-staging-db',
    env: 'STAGING_DB'
  },
  production_db: {
    doc: 'dynamoDb for staging environment',
    format: 'String',
    default: 'seekteam-prod-db',
    env: 'PROD_DB'
  },
});

export default config;
