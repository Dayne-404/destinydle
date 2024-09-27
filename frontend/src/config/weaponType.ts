export interface Weapon {
	_id: string;
	name: string;
	imgUrl: string;
	type: string;
	ammo: string;
	element: string;
	rpm: number;
	magazine: number;
	released: number;
}

export const WEAPON_ORDER: (keyof Weapon)[] = [
	'_id',
	'name',
	'imgUrl',
	'type',
	'ammo',
	'element',
	'rpm',
	'magazine',
	'released',
];

export const WEAPON_COMPARE_FIELDS: (keyof Weapon)[] = [
	'rpm',
	'magazine',
	'released',
]
