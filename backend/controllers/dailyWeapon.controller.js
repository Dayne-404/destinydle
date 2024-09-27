const DailyWeapon = require('../models/DailyWeapon.model');
const Weapon = require('../models/Weapon.model');

const selectNewDailyWeapon = async (req, res) => {
	try {
		const currentDaily = await DailyWeapon.findOne().sort({ updatedAt: -1 });

		const weaponCount = await Weapon.countDocuments();
		const randomIndex = Math.floor(Math.random() * weaponCount);
		const randomWeapon = await Weapon.findOne().skip(randomIndex);

		const newDailyWeapon = await DailyWeapon.create({
			current: randomWeapon._id,
			previous: currentDaily ? currentDaily.current : null,
		});

		const dailyWeaponsCount = await DailyWeapon.countDocuments();

		if (dailyWeaponsCount > 7) {
			const oldestDocument = await DailyWeapon.findOne().sort({ updatedAt: 1 });
			if (oldestDocument) {
				await DailyWeapon.deleteOne({ _id: oldestDocument._id });
				console.log('Oldest daily weapon deleted ');
			}
		}

		console.log('New daily weapon selected: ', randomWeapon.name);

		if (res)
			res.status(200).json({
				message: 'Daily Weapon Selected Sucessfully',
				weapon: randomWeapon.name,
				daily: newDailyWeapon,
			});
	} catch (error) {
		console.error('Error updating daily weapon: ', error);

		if (res) res.status(500).json({ message: error.message });
	}
};

const getDailyWeapon = async (req, res) => {
	try {
		const currentDaily = await DailyWeapon.findOne()
			.sort({ updatedAt: -1 })
			.populate('current previous');
		res.status(200).json(currentDaily);
	} catch (error) {
		console.error('Error getting daily weapon');
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	selectNewDailyWeapon,
	getDailyWeapon,
};
