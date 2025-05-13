const express = require('express')

const cryptoCurrencyCtrl = require('../controllers/cryptoCurrencyCtrl');
const router = express.Router()

router.get('/cryptocurrency/coins',cryptoCurrencyCtrl.getTrendingCoins);
router.get('/cryptocurrency/coin/:id', cryptoCurrencyCtrl.getCoin);

module.exports = router