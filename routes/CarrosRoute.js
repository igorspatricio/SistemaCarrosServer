const express = require('express')
const router = express.Router();
const controller = require('../controllers/CarrosController')

router.route('/')
    .get(controller.getCarros)
    .post(controller.postCarro)

module.exports = router;