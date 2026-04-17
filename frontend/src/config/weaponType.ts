export interface Weapon {
	name: string;
	type: string;
	archetype: string;
	ammo: string;
	element: string;
	rpm: number;
	magazine: number;
	season: [number, string];
	icon: string;
}

//TODO: Find a way to reimplement RPM and magazine
export const WEAPON_ORDER: (keyof Weapon)[] = [
	'icon',
	'name',
	'type',
	'archetype',
	'ammo',
	'element',
	'season',
];

export const WEAPON_COMPARE_FIELDS: (keyof Weapon)[] = [
	'rpm',
	'magazine',
	'season',
]
