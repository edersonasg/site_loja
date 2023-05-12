/////////////   INICIO API /////////////////////////////////////
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');
const bodyParser = require('body-parser');

const tableName = "clientes";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();


/////////////////////////////////////////////////////////////

async function adicionarCarrinho(carrinho, bodyRequest) {
    var params = {
        TableName: tableName,
        Key: {
            "ID": bodyRequest.id_cliente
        },
        //Item: bodyRequest,
        UpdateExpression: "SET carrinho.#MyVariable =  :item",
        ExpressionAttributeNames: {
            "#MyVariable": "item" + carrinho,
        },
        ExpressionAttributeValues: {
            ":item": {
                ID_produto: bodyRequest.ID_produto,
                quantidade_produto: bodyRequest.quantidade_produto,
                tamanho_produto: bodyRequest.tamanho_produto,
            },
        },
    };


    try {
        await dynamodb.update(params).promise();
        return bodyRequest;
    } catch (error) {
        console.log('erro', error);
        return false;
    }
}

router.post('/', async(req, res) => {
    if (req.body) {
        const carrinho = parseInt(req.query.quantidadeCarrinho) + 1;
        console.log(carrinho);
        const cadastro = await adicionarCarrinho(carrinho, req.body);
        return res.send(cadastro);
    }

    return res.status(500).json({ mensagem: "Usuario não cadastrado" });
});

module.exports = router;