import express from 'express';
import { getDailyWeapon } from '../controllers/dailyWeapon.controller.js';
import authorize from '../middleware.js';

const router = express.Router();

router.get('/', authorize, getDailyWeapon );

export default router;