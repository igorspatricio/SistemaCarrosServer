const express = require('express')
const router = express.Router();
const controller = require('../controllers/CarrosController')

router.route('/')
    .get(controller.getCarros)
    .post(controller.postCarro)

router.route('/owerName')
    .get(controller.getCarrosWithOwnerName)

router.route('/getNumberCarrosOwnerPerGender')
    .get(controller.getNumberCarrosOwnerPerGender)

router.route('/getCountCarrosMarcas')
    .get(controller.getCountCarrosMarcas)

router.route('/getCountCarrosMarcasGenero')
    .get(controller.getCountCarrosMarcasGenero)

module.exports = router;