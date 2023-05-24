const express = require('express')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
const bodyparser = require('body-parser');

//chamando rota usuario
const usuarioRoute = require('./routes/routerConsulta')
const consultaProdutos = require('./api/api-consulta-produtos')
const consultaDetalheProduto = require('./api/api-consulta-detalhe-produto')
const destaqueProduto = require('./api/api-destaque-produto')
const ofertaProduto = require('./api/api-ofertas-produtos')
const filtroProduto = require('./api/api-filtro-produtos')
const buscaProduto = require('./api/api=busca-produto')
const buscaCliente = require('./api/api-verifica-cliente')
const consultarCarrinho = require('./api/api-consultar-carrinho')
    //  ROTA API DE CRIACAO
const criarCliente = require('./api/api-criar-cliente')
const adicionarCarrinho = require('./api/api-adicionar-carrinho')
const deletarItemCarrinho = require('./api/api-deletar-item-carrinho')
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

app.get('/perfil', (req, res) => {
    return res.render("perfil")
});
app.get('/login', (req, res) => {
    return res.render("login")
});
//ROTA DA API
app.use('/usersAPI', usuarioRoute);
// app.use('/s3teste', s3route);
app.use('/apiProdutos', consultaProdutos);
app.use('/apiDetalheProduto', consultaDetalheProduto);
app.use('/apiDestaqueProduto', destaqueProduto);
app.use('/apiOfertas', ofertaProduto);
app.use('/apiFiltro', filtroProduto);
app.use('/apiBusca', buscaProduto);
app.use('/apiBuscaCliente', buscaCliente);
app.use('/apiConsultaCarrinho', consultarCarrinho);
// app.use POST
app.use('/apiCriarCliente', criarCliente);
app.use('/apiAdicionarCarrinho', adicionarCarrinho);
app.use('/apiDeletarItemCarrinho', deletarItemCarrinho);
//LOG
app.listen(port, () => (
    console.log('Servidor iniciado na porta' + port)
));