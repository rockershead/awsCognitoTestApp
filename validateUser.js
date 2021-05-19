const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');
const {poolData1,poolData2,pool_region,userPool1,userPool2}=require("./utils")


token="eyJraWQiOiIzbUJxekpvR0ZhMDFtOVNmd2ZQdmhoTjZLcjJuVUJycnZyVUY0ajYyK0dFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1OGQ4ODNlNC05MGVjLTQ0NjItYTJhMi0wYTk4YjdlNDBhMTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfaVp4UmoxQjVxIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6IjU4ZDg4M2U0LTkwZWMtNDQ2Mi1hMmEyLTBhOThiN2U0MGExMyIsImF1ZCI6IjJ1bXR1MWVrbmZ1ZGo1bnUwYXZyczg3am5zIiwiZXZlbnRfaWQiOiJlNTE0ZGE2YS00MTllLTQ3ZTAtYWJjNi1jY2U0MWYyMDEyNjUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYyMDcyMjQ3NCwibmFtZSI6InphaGlyIiwicGhvbmVfbnVtYmVyIjoiKzY1OTE0MTQ1NzMiLCJleHAiOjE2MjA3MjYwNzQsImN1c3RvbTpyb2xlIjoiOTkiLCJpYXQiOjE2MjA3MjI0NzQsImVtYWlsIjoiemFoaXIuaW5zcGlyZW1lQGdtYWlsLmNvbSJ9.UBvKsYdN8NLFx3fUQjjIdxvH8F2ZOYtiWoMDCox-NokngDdZqWW_e1GdTOHvdXOazr1AqXdLYO5Aa9_Jos6DmrQnJ1AJk0w0Sy4uFHmbYqCg1rWJqVhmWBrLGjDDP8--j8gCz7TI2IWCjZ4m6Vhk0peGFZHvjBwWtbkBCxvyQd4bfarFjnjBHQMv83mjMWMqgKd-CYAvClyqeaoxGqTLjQ2zOcDQ32dyxryJg35ws8GIXNI5dBysN6_ofbr5ltJup8OE6-pfeS4Q9A_wrb-0PBK2R48lbppA5oztTdcvJOaZ7QrW7HHqaX3PkjBqpiZ5-X87ujRjBckUIvgFCakU5g"


  request({
    url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        pems = {};
        var keys = body['keys'];
        for(var i = 0; i < keys.length; i++) {
            //Convert each key to PEM
            var key_id = keys[i].kid;
            var modulus = keys[i].n;
            var exponent = keys[i].e;
            var key_type = keys[i].kty;
            var jwk = { kty: key_type, n: modulus, e: exponent};
            var pem = jwkToPem(jwk);
            pems[key_id] = pem;
        }
        //validate the token
        var decodedJwt = jwt.decode(token, {complete: true});
        if (!decodedJwt) {
            console.log("Not a valid JWT token");
            return;
        }

        var kid = decodedJwt.header.kid;
        var pem = pems[kid];
        if (!pem) {
            console.log('Invalid token');
            return;
        }

        jwt.verify(token, pem, function(err, payload) {
            if(err) {
                console.log("Invalid Token.");
            } else {
                console.log("Valid Token.");
                console.log(payload);
            }
        });
    } else {
        console.log("Error! Unable to download JWKs");
    }
});
