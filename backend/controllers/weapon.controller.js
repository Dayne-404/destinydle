const Weapon = require('../models/Weapon.model');

const addWeapon = async (req, res) => {
	try {
		const weapon = await Weapon.create(req.body);
		res.status(200).json(weapon);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

const updateWeapon = async (req, res) => {
	const { id } = req.params;

	try {
		const weapon = await Weapon.findByIdAndUpdate(id, req.body, { new: true });
		res.status(200).json(weapon);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

const getWeapons = async (req, res) => {
	const { limit = 10 } = req.query;

	try {
		const weapons = await Weapon.find();
		const totalCount = await Weapon.countDocuments();
		res.status(200).json({ weapons, totalCount });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	updateWeapon,
	getWeapons,
	addWeapon,
};
