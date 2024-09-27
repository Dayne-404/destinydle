const express = require('express');
const { addWeapon, getWeapons, updateWeapon } = require('../controllers/weapon.controller');

const router = express.Router();

router.get('/', getWeapons);
router.post('/', addWeapon);
router.put('/:id', updateWeapon);

module.exports = router;