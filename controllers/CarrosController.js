const carros = require("../model/Carros")
const pessoas = require('../model/Pessoas');

const sequelize = require('sequelize')
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const database = require('../db/db.js');

const getCarros  = async (req, res) => {
    result = await carros.findAll()
    res.send(result)
}

const postCarro = async (req, res) => {
    const {placa, marca, modelo, ano, cor, cpf_dono} = req.body;

    result = await carros.findOne({where:{placa:placa}});

    if (result){
        //carro já existe no banco
        res.status(409).send("Placa já cadastrada!");
        return

    }else{
        result = await pessoas.findOne({where:{cpf: cpf_dono }})
        if(!result){
            res.status(400).send("CPF nao cadastrado!");
            return
        }

        carros.create({
            placa: placa,
            marca:marca,
            modelo:modelo,
            ano:ano,
            cor:cor,
            cpf_dono_carro: cpf_dono
        });

        res.status(201).send("Carro cadastrado com sucesso!");
    }
}

const getCarrosWithOwnerName = async (req, res)=>{
    const carrosData = await carros.findAll({
        attributes: ['placa', 'marca', 'modelo', 'ano', 'cor', [Sequelize.col('pessoa.nome'), 'nome_dono'], 'cpf_dono_carro'],
        include: [{
          model: pessoas,
          attributes: [],
        }]
      });
    res.send(carrosData)
}

const getNumberCarrosOwnerPerGender = async (req, res) => {
    const result = await carros.findAll({
        attributes: [[Sequelize.col('pessoa.genero'), 'genero'], [Sequelize.fn('count', Sequelize.col('carros.placa')), 'count']],
        include: [{
          model: pessoas,
          attributes: []
        }],
        group: Sequelize.col('pessoa.genero')
    })

    res.send(result)
}

const getCountCarrosMarcas = async (req, res) => {
    sql = 'select marca, count(placa) from carros group by marca'
    result = await database.query(sql, { type: QueryTypes.SELECT })
    
    res.send(result)

}

const getCountCarrosMarcasGenero = async (req, res) => {
    sql = 'select marca, genero, count(placa) from carros join pessoas on cpf = cpf_dono_carro group by marca, genero order by marca '
    result = await database.query(sql, { type: QueryTypes.SELECT })
    
    res.send(result)

}


module.exports = {
    postCarro,
    getCarros,
    getCarrosWithOwnerName,
    getNumberCarrosOwnerPerGender,
    getCountCarrosMarcas,
    getCountCarrosMarcasGenero
}