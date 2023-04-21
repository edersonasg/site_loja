const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');

const tableName = "produtos";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function consulta(id) {

    var params = {
        TableName: tableName,
        FilterExpression: "ID = :ID",
        ExpressionAttributeValues: {
            ":ID": id,
        }
    };

    try {
        const dados = await dynamodb.scan(params).promise();
        return dados.Items;
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

router.get('/', async(req, res) => {
    let id = parseInt(req.query.id);
    const dado = await consulta(id, req.body);
    //console.log(dado);
    return res.send(dado);

});

module.exports = router;