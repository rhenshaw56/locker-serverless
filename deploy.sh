#!/bin/bash
export NODE_ENV=production &&

echo "* Setting up project" &&
npm run build &&
cd ./dist/ &&

echo "* Installing dependencies" &&
cp ../package.json ./ &&
npm install --production &&
rm package.json &&

echo "* Updating Lambda function with latest" &&
zip -q -r dist.zip *

# Using hash to track latest versions
HASH=$(sha256sum dist.zip | awk '{print $1}')

aws s3 mv dist.zip "s3://seekteam-backend/lamdas/$HASH"

aws lambda update-function-code \
  --region us-west-2 \
  --s3-bucket seekteam-backend \
  --s3-key lamdas/$HASH \
  --function-name $1 \

cd ../ &&
echo "* Done";
