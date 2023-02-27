const express = require('express')
const router = express.Router();
const controller = require('../controllers/RevisoesController')

router.route('/')
    .post(controller.postRevisao)


module.exports = router