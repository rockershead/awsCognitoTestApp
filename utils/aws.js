const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');


const poolData1 = {    
    UserPoolId : "us-west-2_iZxRj1B5q",   
    ClientId : "2umtu1eknfudj5nu0avrs87jns" 
    }; 

    


    const poolData2 = {    
        UserPoolId : "us-west-2_MjUJuyJeK",   
        ClientId : "7usuh38l56qm55te8581hcusp4" 
        };
    
    
    const pool_region = 'us-west-2';


    const userPool1=new AmazonCognitoIdentity.CognitoUserPool(poolData1);
    const userPool2 = new AmazonCognitoIdentity.CognitoUserPool(poolData2);



    module.exports={poolData1,poolData2,pool_region,userPool1,userPool2}
