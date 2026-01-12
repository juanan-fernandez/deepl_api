const express = require('express')
const router = express.Router()
const deeplCtrl = require('../../controllers/deepl')

//router.route('/:text/:target').get(deeplCtrl.getTranslation)
router.route('/:text/:target').get(deeplCtrl.getTranslationV2)
module.exports = router
