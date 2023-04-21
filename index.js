const express = require('express')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
const bodyparser = require('body-parser');

//chamando rota usuario
const usuarioRoute = require('./routes/routerConsulta')
const consultaProdutos = require('./api/api-consulta-produtos')
const consultaDetalheProduto = require('./api/api-consulta-detalhe-produto')
    // const s3route = require('./api/api-consulta-s3')
    //  ROTA TESTE API

//CONFIGURANDO BODY-PARSER
//app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//CONFIGURANDO EJS
app.set('view engine', 'ejs')

//CONFIGURANDO ARQUIVOS ESTATICOS
app.use(express.static('public'))


app.get('/', (req, res) => {
    return res.render("index")
});

app.get('/produto', (req, res) => {
    return res.render("produto")
});

app.get('/produtos', (req, res) => {
    return res.render("produtos")
});

app.get('/carrinho', (req, res) => {
    return res.render("carrinho")
});

//ROTA DA API
app.use('/usersAPI', usuarioRoute);
// app.use('/s3teste', s3route);
app.use('/apiProdutos', consultaProdutos);
app.use('/apiDetalheProduto', consultaDetalheProduto);

//LOG
app.listen(port, () => (
    console.log('Servidor iniciado na porta' + port)
));