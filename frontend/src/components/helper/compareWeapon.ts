import { Weapon } from '../../config/weaponType';

//0 for false
//1 for correct
//2 for lower / false
//3 for higher / true
export const compareWeapon = (weapon: Weapon, compared: Weapon): Record<string, number> => {
	const comparedValues: Record<string, number> = {};

	Object.keys(weapon).forEach((key) => {
		if (weapon[key as keyof Weapon] === compared[key as keyof Weapon]) {
			comparedValues[key] = 1;
		} else if (key === 'released') {
			comparedValues[key] = weapon[key] > compared[key] ? 2 : 3;
		} else {
			comparedValues[key] = 0;
		}
	});

	return comparedValues;
};
