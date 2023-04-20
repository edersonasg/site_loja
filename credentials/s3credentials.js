const AWS = require('aws-sdk');

/*AWS.config.region = 'us-east-2'; // Região
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:db237e02-158b-4585-9f7c-25782e6491cc',
});
*/


module.exports = {
    AwsConfig: {
        region: 'us-east-2',
        IdentityPoolId: 'us-east-2:db237e02-158b-4585-9f7c-25782e6491cc',
    }
}