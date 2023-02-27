const carros = require("../model/Carros")

const postCarro = async (req, res) => {
    const {placa, marca, modelo, ano, cor, cpf_dono} = req.body;

    result = await carros.findOne({placa:placa});

    if (result){
        //carro já existe no banco
        res.status(409).send("Placa já cadastrada!");

    }else{
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

module.exports = {
    postCarro
}