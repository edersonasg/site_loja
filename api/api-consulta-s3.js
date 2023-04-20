/* Erro API // TESTE ////

const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/s3credentials');

AWS.config.region = 'us-east-2' // Região
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:db237e02-158b-4585-9f7c-25782e6491cc',
});

const albumBucketName = 'bucketgarb';
var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
        Bucket: albumBucketName
    }
});


s3.listObjects({
    Delimiter: '/'
}, function consulta(err, data) {
    if (err) {
        return console.log('There was an error listing your albums: ' + err.message);
    } else {
        var albums = data.CommonPrefixes.map(function(commonPrefix) {
            var prefix = commonPrefix.Prefix;
            var albumName = decodeURIComponent(prefix.replace('/', ''));
            console.log(albumName);
        });
        var message = albums.length;
        console.log(message);
    };

});


router.get('/', async(req, res) => {
    const dado = await consulta(data);
    console.log(dado);
    return res.send(dado);

});

module.exports = router;

*/