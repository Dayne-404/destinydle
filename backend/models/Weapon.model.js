const mongoose = require('mongoose');

const weaponEnums = {
	types: [
		'Hand Cannon',
		'Scout Rifle',
		'Auto Rifle',
		'Pulse Rifle',
		'Sidearm',
		'Submachine Gun',
		'Bow',
		'Fusion Rifle',
		'Glaive',
		'Shotgun',
		'Sniper Rifle',
		'Trace Rifle',
		'Breech Grenade Launcher',
		'Rocket Launcher',
		'Linear Fusion Rifle',
		'Sword',
		'Grenade Launcher',
		'Machine Gun',
	],
	ammos: ['Primary', 'Special', 'Power'],
	elements: ['Kinetic', 'Arc', 'Solar', 'Void', 'Stasis', 'Strand'],
};

const WeaponSchema = mongoose.Schema({
	name: { type: String, required: true, unique: true },
	imgUrl: { type: String, required: true },
	type: { type: String, enum: weaponEnums.types, required: true },
	ammo: { type: String, enum: weaponEnums.ammos, required: true },
	element: { type: String, enum: weaponEnums.elements, required: true },
	rpm: { type: Number, required: true, min: 1 },
	magazine: { type: Number, required: true, min: 1 },
	released: { type: Number, required: true, min: 0 },
	craftable: { type: Boolean, required: true , default: false},
});

const Weapon = mongoose.model('Weapon', WeaponSchema);
module.exports = Weapon;
