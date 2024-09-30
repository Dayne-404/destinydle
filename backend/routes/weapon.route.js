const express = require('express');
const { addWeapon, getWeapons, updateWeapon } = require('../controllers/weapon.controller');
const authorize = require('../middleWare');

const router = express.Router();

router.get('/', getWeapons);
router.post('/', authorize, addWeapon);
router.put('/:id', authorize, updateWeapon);

module.exports = router;