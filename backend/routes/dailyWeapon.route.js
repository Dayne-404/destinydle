const express = require('express');
const { selectNewDailyWeapon, getDailyWeapon } = require('../controllers/dailyWeapon.controller');

const router = express.Router();

router.get('/', getDailyWeapon)
router.post('/', selectNewDailyWeapon);

module.exports = router