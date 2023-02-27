const express = require('express')
const router = express.Router();
const controller = require('../controllers/PessoasController')

router.route('/')
    .get(controller.getPessoas)
    .post(controller.postPessoa)

router.route('/:genero')
    .get(controller.getPessoasGenero)

router.route('/infoPorGenero')
    .get(controller.getInfoPessoasSeparadasPorGenero)

module.exports = router;