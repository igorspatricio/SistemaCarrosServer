const express = require('express')
const router = express.Router();
const controller = require('../controllers/RevisoesController')

router.route('/')
    .get(controller.getRevisao)
    .post(controller.postRevisao)


router.route('/marca')
    .get(controller.revisoesByMarca)

router.route('/nome')
    .get(controller.revisoesByNome)

router.route('/DataAndName')
    .get(controller.revisoesByDataAndName)    

module.exports = router