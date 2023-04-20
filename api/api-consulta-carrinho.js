const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');

const tableName = "produtos";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function consulta() {

    var params = {
        TableName: tableName,
    };

    try {
        const dados = await dynamodb.scan(params).promise();
        console.log(dados.Items);
        return dados.Items;
    } catch (err) {
        console.log('err', err);
        return null;
    }
}


module.exports = {
    consulta,
}