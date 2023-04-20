const express = require('express')
const router = express.Router();
const AWS = require('aws-sdk');
var albumBucketName = 'bucketgarb';

AWS.config.region = 'us-east-2'; // Região
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:db237e02-158b-4585-9f7c-25782e6491cc',
});

// Create a new service object
var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
        Bucket: albumBucketName
    }
});

// A utility function to create HTML.
/*function getHtml(template) {
    return template.join('\n');
}

function listaAlbum() {
    s3.listObjects({
        Delimiter: '/'
    })
}*/

console.log(s3.listObjects);

module.exports = router;