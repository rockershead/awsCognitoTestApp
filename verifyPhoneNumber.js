
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');
const {poolData1,poolData2,pool_region,userPool1,userPool2}=require("./utils")


pincode="687804"


var userData = {
    Username : '+6591414573',
    Pool : userPool2
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


   
      cognitoUser.confirmRegistration(pincode, true, (err, result) => {
        if (err) {
          console.log({ statusCode: 422, response: err });
        }
        console.log({ statusCode: 400, response: result });
      });
    
  





