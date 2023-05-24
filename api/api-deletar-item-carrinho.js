/////////////   INICIO API /////////////////////////////////////
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');
const bodyParser = require('body-parser');

const tableName = "carrinho";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();


/////////////////////////////////////////////////////////////

async function apagarItem(ID) {
    var params = {
        TableName: tableName,
        Key: {
            'ID': ID
          }
    };

    try {
        await dynamodb.delete(params).promise();
        //return dados;
    } catch (error) {
        console.log('erro', error);
        return false;
    }
}

router.post('/', async(req, res) => {
    if (req.body) {
        const ID = req.query.ID;
        const adicionar = await apagarItem(ID,req.body);
        return res.send(adicionar);
    }

    return res.status(500).json({ mensagem: "Item nao adicionado" });
});

module.exports = router;