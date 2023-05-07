/////////////   INICIO API /////////////////////////////////////
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');

const tableName = "clientes";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();


/////////////////////////////////////////////////////////////

async function criarCliente(bodyRequest) {
    var params = {
        TableName: tableName,
        Item: bodyRequest,
    };

    try {
        await dynamodb.put(params).promise();
        return bodyRequest;
    } catch (error) {
        console.log('erro', error);
        return false;
    }
}

router.post('/', async(req, res) => {
    if (req.body) {
        console.log("retorno api: " + JSON.stringify(req.body));
        const cadastro = await criarCliente(req.body);
        return res.send(cadastro);
    }

    return res.status(500).json({ mensagem: "Usuario não cadastrado" });
});

module.exports = router;