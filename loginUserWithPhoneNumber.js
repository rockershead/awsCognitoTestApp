
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');
const {userPool2}=require("./utils")
const prompt = require('prompt');

pincode='124932'


var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username : '+6591414573',
    Password:'mzbt70311'
});

var userData = {
    Username : '+6591414573',
    Pool : userPool2
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        console.log('access token : ' + result.getAccessToken().getJwtToken());
        console.log('id token : ' + result.getIdToken().getJwtToken());
        console.log('refresh token : ' + result.getRefreshToken().getToken());
    },
    
    mfaRequired: function(codeDeliveryDetails) {

        prompt.get(['verificationCode'], function (err, result) {
            if (err) { return onErr(err); }
            console.log('Command-line input received:');
            console.log('Please input verification code: ' + result.verificationCode);
            cognitoUser.sendMFACode(result.verificationCode,{
                onSuccess: function (result) {
                    console.log('access token : ' + result.getAccessToken().getJwtToken());
                    console.log('id token : ' + result.getIdToken().getJwtToken());
                    console.log('refresh token : ' + result.getRefreshToken().getToken());
                },
                onFailure: function (err) {
                   console.log(err);
                }
            })
            
        });


        
    },
    onFailure: function(err) {
        console.log(err);
    }

});
