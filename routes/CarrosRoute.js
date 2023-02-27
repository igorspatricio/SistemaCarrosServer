const express = require('express')
const router = express.Router();
const controller = require('../controllers/CarrosController')

router.route('/')
    .post(controller.postCarro)

module.exports = router;