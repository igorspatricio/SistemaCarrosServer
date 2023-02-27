const express = require("express")

const server = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors')
const path = require('path')


server.use(cors());
server.options("*", (req, res, next) => {
    res.header('Acess-Control-Allow-Origin', "*");
    res.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Acess-Control-Allow-Headers', 'Authorization, Content-Lenght, X-Requested-With');
    res.header(200);
});

server.use(express.json());
server.use(express.urlencoded({extended: false}));


//sincronizar o bd
(async () => {
    const database = require('./db/db.js');

    const pessoas = require('./model/Pessoas');
    const carros = require('./model/Carros');
    const revisoes = require('./model/Revisoes');

    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
        const resultado = await database.sync();
        console.log(resultado);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } 
})()


server.use((req, res, next) => {
    console.log(`${req.method} - ${req.path} - ${req.ip}`);
    next();
})

//routes
server.use('/pessoas', require('./routes/PessoasRoute'))
server.use('/carros', require('./routes/CarrosRoute'))
server.use('/revisoes', require('./routes/RevisoesRoute'))

server.get('/', (req, res) =>{
    res.send("Ola mundoo!")
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));