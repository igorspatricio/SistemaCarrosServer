const pessoas = require('../model/Pessoas');
const sequelize = require('sequelize')

const postPessoa = async (req, res) => {
    const {cpf, nome, idade, genero} = req.body;

    result = await pessoas.findOne({where:{cpf:cpf}})
    if (result){
        //cpf já existe no banco
        res.status(409).send("CPF já cadastrado!");

    }else{
        pessoas.create({
            cpf: cpf,
            nome: nome,
            idade: idade,
            genero, genero
        })

        //responde informando sucesso!
        res.status(201).send("Pessoa cadastrada com sucesso!");
    }    
}

const getPessoas = async (req, res) => {
    result = await pessoas.findAll()
    res.send(result)
}

const getInfoPessoasSeparadasPorGenero = async (req, res) => {
    result = await pessoas.findAll({
        attributes: [
            'genero', 
            [sequelize.fn('COUNT', sequelize.col('*')), 'quantidade'], 
            [sequelize.fn('AVG', sequelize.col('idade')), 'media_idade']
        ],
        group: 'genero'
    });

    res.send(result)
}

const getPessoasGenero = async (req, res) =>{
    const genero = req.params.genero;

    result = await pessoas.findAll({where:{genero:genero}})

    res.send(result)
}


module.exports = {
    postPessoa,
    getPessoas,
    getPessoasGenero,
    getInfoPessoasSeparadasPorGenero
}