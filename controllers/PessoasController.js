const pessoas = require('../model/Pessoas');


const sequelize = require('sequelize')
const { QueryTypes } = require('sequelize');
const database = require('../db/db.js');

const postPessoa = async (req, res) => {
    const {cpf, nome, idade, genero} = req.body;

    result = await pessoas.findOne({where:{cpf:cpf}})
    if (result){
        //cpf já existe no banco
        res.status(409).send("CPF já cadastrado!");
        return

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

const getPessoasWithNumberCarOwned = async (req, res) => {
    sql = 'select  cpf, nome, idade, genero, coalesce(carrosCount.count, 0) as Carros_cadastrados from (select cpf_dono_carro, count(cpf_dono_carro) from carros group by cpf_dono_carro ) as carrosCount right join pessoas on cpf = cpf_dono_carro'
    result = await database.query(sql, { type: QueryTypes.SELECT })
    
    res.send(result)
}


module.exports = {
    postPessoa,
    getPessoas,
    getPessoasGenero,
    getInfoPessoasSeparadasPorGenero,
    getPessoasWithNumberCarOwned
}