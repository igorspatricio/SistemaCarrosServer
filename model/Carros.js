const Sequelize = require('sequelize');
const database = require('../db/db.js');
const pessoas = require('./Pessoas')

const Carros = database.define('carros',{
    placa: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    marca:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    modelo:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    ano:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
    },
    cor:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }

});

Carros.belongsTo(pessoas, {
    foreignKey: "cpf_dono_carro",
    sourceKey: "cpf",
});

module.exports = Carros;