require('dotenv').config();
module.exports = {
    AwsConfig: {
        "region": process.env.AWS_REGION,
        "endpoint": process.env.AWS_ENDPOINT,
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRETACESSKEY,
    }
}