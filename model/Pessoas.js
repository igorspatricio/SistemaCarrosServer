const Sequelize = require('sequelize');
const database = require('../db/db.js');

const Pessoas = database.define('pessoas', {
    cpf:{
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nome:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    idade:{
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false

    },
    genero:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Pessoas;