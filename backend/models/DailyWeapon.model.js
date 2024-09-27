const mongoose = require('mongoose');

const DailyWeaponSchema = mongoose.Schema(
	{
		current: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' },
		previous: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' },
	},
	{ timestamps: true }
);

const DailyWeapon = mongoose.model('DailyWeapon', DailyWeaponSchema);
module.exports = DailyWeapon;
