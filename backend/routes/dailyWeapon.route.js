const express = require('express');
const { selectNewDailyWeapon, getDailyWeapon } = require('../controllers/dailyWeapon.controller');
const authorize = require('../middleWare');

const router = express.Router();

router.get('/', getDailyWeapon)
router.post('/', authorize, selectNewDailyWeapon);

module.exports = router