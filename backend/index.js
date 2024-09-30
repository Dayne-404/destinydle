const express = require('express');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const cors = require('cors');
const destinyRoute = require('./routes/weapon.route');
const dailyWeaponRoute = require('./routes/dailyWeapon.route');
const { selectNewDailyWeapon, updateDailyWeapon } = require('./controllers/dailyWeapon.controller')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
	origin: 'http://localhost:5173', //Replace with frontend URL
	methods: ['GET'],
	credentials: true,
}));

app.use('/api/destiny', destinyRoute);
app.use('/api/daily', dailyWeaponRoute);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to the database!');
		updateDailyWeapon();
		app.listen(PORT, () => {
			console.log('Server is running on port 3000');
		});
	})
	.catch(() => {
		console.log('Failed to connect to database');
	});

schedule.scheduleJob('0 0 * * *', selectNewDailyWeapon);
