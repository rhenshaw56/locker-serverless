import * as AWS from 'aws-sdk';
import dynamoDataTypes from 'dynamodb-data-types';
import config from '../config';

const attr = dynamoDataTypes.AttributeValue;

AWS.config.update({
  region: 'us-west-2'
});

const dynamoDB = new AWS.DynamoDB({
  apiVersion: '2012-08-10'
});

const stagingDB = config.get('staging_db');
const productionDB = config.get('production_db');

const tableName = process.env.NODE_ENV === 'production' ? productionDB : stagingDB;

const parseResponse = (item) => {
  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  };

  return response;
};

const handleError = (error, code) => {
  const response = {
    statusCode: error.statusCode || code,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Couldn\'t complete operation'
  };
  return JSON.stringify(response);
};

const put = (item) => {
  const params = {
    lockerNumber: item.lockerNumber,
    wing: item.wing,
    assignee: item.assignee || false,
    available: !!item.assignee,
    status: item.status ? item.status : 'functional'
  };

  const data = {
    TableName: tableName,
    Item: attr.wrap(params)
  };

  return dynamoDB.putItem(data).promise()
    .then((response) => {
      return parseResponse(params);
    })
    .catch(err => err);
};

const remove = item => dynamoDB.deleteItem({
  TableName: tableName,
  Key: {
    lockerNumber: item.lockerNumber
  }
}).then(response => JSON.stringify(response)).catch(err => handleError(err, 404));

const get = item => dynamoDB.getItem({
  TableName: tableName,
  Key: {
    lockerNumber: item.lockerNumber
  }
}).then(response => parseResponse(response.Attributes)).catch(err => handleError(err, 404));

export {
  put,
  remove,
  get
};
