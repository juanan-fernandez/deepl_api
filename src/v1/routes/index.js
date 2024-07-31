const express = require('express')
const router = express.Router()
const deeplCtrl = require('../../controllers/deepl')

router.route('/:text/:target').get(deeplCtrl.getTranslation)

module.exports = router
