const Sequelize = require('sequelize');
const database = require('../db/db.js');

const carros = require('./Carros');

const Revisoes = database.define('revisoes',{
    id_revisao: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    custo:{
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    data:{
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
    },
    descricao:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

Revisoes.belongsTo(carros, {
        foreignKey: "placa_carro",
        sourceKey: "placa",
});

module.exports = Revisoes