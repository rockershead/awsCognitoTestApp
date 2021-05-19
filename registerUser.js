const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');
const {poolData1,poolData2,pool_region,userPool1,userPool2}=require("./utils")


name="zahir"
email="zahir.inspireme@gmail.com"
phone_number="+6591414573"
role=99
updated_at=""




var attributeList = [];
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:name}));
    
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:phone_number}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"updated_at",Value:updated_at}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:role",Value:role.toString()}));

    //userPool1.signUp(email, 'Mzbt_70311', attributeList, null, function(err, result){
   //     if (err) {
    //        console.log("error")
    //        console.log(err);
     //       return;
    //    }
    //   cognitoUser = result.user;
    //    console.log('user name is ' + cognitoUser.getUsername());
    //});

    userPool2.signUp(phone_number, 'mzbt70311', attributeList, null, function(err, result){
        if (err) {
            console.log("error")
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
