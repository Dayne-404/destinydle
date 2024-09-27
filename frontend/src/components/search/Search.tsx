import { Autocomplete, TextField } from '@mui/material';
import { searchSx } from '../../styles/searchStyle';
import { Weapon } from '../../config/weaponType';
interface SearchProps {
	options: Weapon[];
	loading: boolean;
	size?: 'small' | 'medium';
	label?: string;
	selectedWeapon: Weapon | null;
	setSelectedWeapon: React.Dispatch<React.SetStateAction<Weapon | null>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({
	options,
	loading,
	size = 'medium',
	label = 'Search',
	selectedWeapon,
	setSelectedWeapon,
	searchTerm,
	setSearchTerm,
}: SearchProps) => {
	const handleInputChange = (_event: React.SyntheticEvent, newInputValue: string) => {
		setSearchTerm(newInputValue);

		if (selectedWeapon !== null && newInputValue !== selectedWeapon?.name) {
			setSelectedWeapon(null);
		}

		if (newInputValue.length === 0) {
			setSelectedWeapon(null);
		}
	};

	const handleChange = (_event: React.SyntheticEvent, newValue: string | Weapon | null) => {
		if (typeof newValue === 'object' && newValue !== null) {
			setSelectedWeapon(newValue);
			setSearchTerm(newValue.name);
		} else if (!newValue) {
			setSelectedWeapon(null);
		}
	};

	return (
		<Autocomplete
			value={selectedWeapon}
			size={size}
			fullWidth
			loading={loading}
			options={options}
			inputValue={searchTerm}
			freeSolo
			getOptionLabel={(option: Weapon | string) =>
				typeof option === 'string' ? option : option.name
			}
			isOptionEqualToValue={(option: Weapon, value: Weapon | null) =>
				option._id === value?._id
			}
			onInputChange={handleInputChange}
			onChange={handleChange}
			forcePopupIcon={false}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder={label}
					variant="outlined"
					fullWidth
					sx={searchSx}
				/>
			)}
		/>
	);
};

export default Search;
