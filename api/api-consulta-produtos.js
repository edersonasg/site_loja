const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');
const { request } = require('express');

const tableName = "produtos";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function consulta(cat) {
    var params = {
        TableName: tableName,
        FilterExpression: "categoria_produto = :categoria",
        ExpressionAttributeValues: {
            ":categoria": cat,
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
    let cat = req.query.categoria;
    const dado = await consulta(cat, req.body);
    //console.log(dado);
    return res.send(dado);

});

module.exports = router;