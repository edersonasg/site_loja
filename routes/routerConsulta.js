const express = require('express');
const router = express.Router();
const { consulta } = require('../api/api-consulta-carrinho');


router.get('/', async(req, res) => {
    const dado = await consulta(req.body);
    //console.log(dado);
    return res.send(dado);

});

module.exports = router;