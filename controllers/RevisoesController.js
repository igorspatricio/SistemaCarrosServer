const revisoes = require('../model/Revisoes');
const sequelize = require('sequelize')

const postRevisao = async (req, res) => {
    const {custo, data, descricao, placa} = req.body;

    const dataJS = new Date(data);
    const dataPostgres = dataJS.toISOString();

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

module.exports = {
    postRevisao
}