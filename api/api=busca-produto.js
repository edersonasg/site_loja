const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');

const tableName = "produtos";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function consulta(nome) {

    var params = {
        TableName: tableName,
        FilterExpression: "nome_produto = :nome",
        ExpressionAttributeValues: {
            ":nome": nome,
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
    let nome = req.query.nome;
    const dado = await consulta(nome, req.body);
    //console.log(dado);
    return res.send(dado);

});

module.exports = router;