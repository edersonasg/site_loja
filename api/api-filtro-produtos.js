const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');

const tableName = "produtos";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function consulta(categoria, tamanho, preco, marca, subcategoria) {
    let filtro = "categoria_produto = :categoria and ";
    var valor = preco || 0;

    const atributos = {
        ":categoria": categoria,
    }

    //console.log(valor);
    if (tamanho != 'undefined') {
        filtro += 'tamanho_produto.quantidade_' + tamanho + ' > :quantidade';
        Object.defineProperty(atributos, ':quantidade', {
            value: 0,
            writable: true,
            enumerable: true,
            configurable: true
        });
    } else {
        filtro += 'tamanho_produto <> :quantidade';
        //atributos = { ":quantidade": 0 }
        Object.defineProperty(atributos, ':quantidade', {
            value: 0,
            writable: true,
            enumerable: true,
            configurable: true
        })
    }
    if (valor > 0) {
        filtro += ' and preco_produto BETWEEN :zero AND :preco';
        Object.defineProperties(atributos, {
            ":zero": {
                value: 0,
                writable: true,
                enumerable: true,
                configurable: true
            },
            ":preco": {
                value: parseInt(valor),
                writable: true,
                enumerable: true,
                configurable: true
            }
        });
        /*var atributos = {
            ":quantidade": 0,
            ":zero": 0,
            ":preco": parseInt(valor),
        }*/
    } else if (valor == 0) {
        filtro += ' and preco_produto > :zero';
        Object.defineProperty(atributos, ':zero', {
            value: 0,
            writable: true,
            enumerable: true,
            configurable: true
        });
        /* var atributos = {
             ":quantidade": 0,
             ":zero": 0,
         }*/
    }
    if (marca != 'undefined') {
        filtro += ' and marca_produto = :marca'
        Object.defineProperty(atributos, ':marca', {
            value: marca,
            writable: true,
            enumerable: true,
            configurable: true
        });
        /* var atributos = {
             ":quantidade": 0,
             ":zero": 0,
             ":marca": marca,
         }*/
    }
    if (subcategoria != 'undefined') {
        filtro += ' and subcategoria_produto = :subcategoria'
        Object.defineProperty(atributos, ':subcategoria', {
            value: subcategoria,
            writable: true,
            enumerable: true,
            configurable: true
        });
        /*var atributos = {
            ":subcategoria": subcategoria,
            ":quantidade": 0,
            ":zero": 0,
            ":preco": parseInt(preco) || 0,
            ":marca": marca,
        }*/
    }
    // console.log(atributos);

    //var filtro = "preco_produto BETWEEN :zero AND :preco and subcategoria_produto = :categoria";
    /*var atributos = {
        ":zero": 0,
        ":preco": 300,
        ":categoria": "Bermuda",
    }*/

    /* var atributos = {
         ":tamanho": "M",
     }*/

    var params = {
        TableName: tableName,
        FilterExpression: filtro,
        ExpressionAttributeValues: atributos
    };

    try {
        const dados = await dynamodb.scan(params).promise();
        //console.log(dados.Items);
        return dados.Items;
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

router.get('/', async(req, res) => {
    let categoria = req.query.categoria;
    let tamanho = req.query.tamanho;
    let preco = req.query.preco;
    let marca = req.query.marca;
    let subcategoria = req.query.subcategoria;
    const dado = await consulta(categoria, tamanho, preco, marca, subcategoria, req.body);
    //console.log(dado);
    return res.send(dado);

});

module.exports = router;