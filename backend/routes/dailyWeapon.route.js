import express from 'express';
import { getDailyWeapon, getAllWeapons } from '../controllers/dailyWeapon.controller.js';
import authorize from '../middleware.js';

const router = express.Router();

router.get('/', authorize, getDailyWeapon );
router.get('/all', authorize, getAllWeapons );

export default router;