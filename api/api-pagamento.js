const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken("TEST-3357851942106980-052613-28e62cd3ddc362544b2f6340f53efffe-264872132");


router.post('/', async(req, res) => {

    mercadopago.payment.save(req.body)
      .then(function(response) {
        const { status, status_detail, id } = response.body;
        //console.log(response.status).json({ status, status_detail, id });
        console.log(response.body.status);
        console.log(response.body.id);
        //res.status(response.status).json({ status, status_detail, id });
        res.status(response.status).send({message: response.body.id, status, status_detail, id});
      })
      .catch(function(error) {
        console.error(error);
        const { code, description } = error.cause[0];
       res.send({message: error.message, code, description});
      });
});

module.exports = router;