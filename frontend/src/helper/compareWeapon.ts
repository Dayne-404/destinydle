import { Weapon } from '../config/weaponType';

//0 for false
//1 for correct
//2 for lower / false
//3 for higher / true
export const compareWeapon = (
	weapon: Weapon,
	compared: Weapon,
	compareFields: (keyof Weapon)[]
): Record<string, number> => {
	const comparedValues: Record<string, number> = {};

	Object.keys(weapon).forEach((key) => {
		const typedKey = key as keyof Weapon;
		if (weapon[typedKey] === compared[typedKey]) {
			comparedValues[key] = 1;
		} else if (compareFields.includes(typedKey)) {
			comparedValues[key] = weapon[typedKey] > compared[typedKey] ? 2 : 3;
		} else {
			comparedValues[key] = 0;
		}
	});

	return comparedValues;
};
