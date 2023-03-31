const express = require('express')
const app = express();
const port = 8000;
const bodyparser = require('body-parser');

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

app.get('/carrinho', (req, res) => {
    return res.render("carrinho")
});

//LOG
app.listen(port, () => (
    console.log('Servidor iniciado na porta' + port)
));