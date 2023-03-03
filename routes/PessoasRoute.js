const express = require('express')
const router = express.Router();
const controller = require('../controllers/PessoasController')

router.route('/')
    .get(controller.getPessoas)
    .post(controller.postPessoa)




router.route('/withcarowned')
    .get(controller.getPessoasWithNumberCarOwned);


router.route('/infobygender')
    .get(controller.getInfoPessoasSeparadasPorGenero);

router.route('/apartbygenero/:genero')
    .get(controller.getPessoasGenero);





    
module.exports = router;