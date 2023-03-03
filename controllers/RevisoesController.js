const revisoes = require('../model/Revisoes');
const {carros} = require('../model/Carros');
const sequelize = require('sequelize')
const database = require('../db/db')
const { QueryTypes } = require('sequelize');


const getRevisao = async (req, res) => {
    result = await revisoes.findAll()
    res.send(result)
}

const postRevisao = async (req, res) => {
    const {custo, data, descricao, placa} = req.body;

    console.log(req.body);

    const dataJS = new Date(data);
    const dataPostgres = dataJS.toISOString();

    placaExists = await carros.findOne({where:{placa: placa}})



    if(!placaExists){
        res
        .status(400)
        .send("Placa invalida!")
        return
    }


    revisoes.create({
        custo: custo,
        data: dataPostgres,
        descricao: descricao,
        placa_carro: placa
    });

    res
        .status(201)
        .send("Revisao Criada")

}

const revisoesByMarca = async (req, res) => {
    sql = `
        select marca, count(id_revisao) from revisoes 
        join carros 
            on placa_carro = placa
        join pessoas
            on cpf = cpf_dono_carro
        group by marca
        order by count desc
    `
    result = await database.query(sql, { type: QueryTypes.SELECT })
    
    res.send(result)
}

const revisoesByNome = async (req, res) => {
    sql = `
        select nome, count(id_revisao) from revisoes 
        join carros 
            on placa_carro = placa
        join pessoas
            on cpf = cpf_dono_carro
        group by cpf
        order by count desc
    `
    result = await database.query(sql, { type: QueryTypes.SELECT })
    
    res.send(result)
}

const revisoesByDataAndName = async (req, res) => {
    sql = `
    select nome, revisoes.data from revisoes 
        join carros 
            on placa_carro = placa
        join pessoas
            on cpf = cpf_dono_carro
        order by revisoes.data
    `
    result = await database.query(sql, { type: QueryTypes.SELECT })
    
    res.send(result)
}

module.exports = {
    getRevisao,
    postRevisao,
    revisoesByMarca,
    revisoesByNome,
    revisoesByDataAndName
}