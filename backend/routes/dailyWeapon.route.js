import express from 'express';
import { getDailyWeapon } from '../controllers/dailyWeapon.controller.js';


const router = express.Router();

router.get('/', getDailyWeapon );

export default router;