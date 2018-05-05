import * as AWS from 'aws-sdk';
import config from '../config';

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
    body: JSON.stringify(item)
  };

  return response;
};

const handleError = (error, code) => {
  const response = {
    statusCode: error.statusCode || code,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Couldn\'t complete operation',
    error
  };
};

const put = (item) => {
  const params = {
    TableName: tableName,
    Item: {
      lockerNumber: item.lockerNumber,
      wing: data.wing,
      assignee: item.assignee || false,
      available: !!item.assignee,
      status: item.status || 'functional'
    },
  };

  return dynamoDB.putItem(params).promise()
    .then(response => parseResponse(response.Attributes))
    .catch(err => handleError(err, 501));
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

export default {
  put,
  remove,
  get
};
