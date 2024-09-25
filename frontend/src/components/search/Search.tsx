import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { searchSx } from '../../styles/searchStyle';
import { Weapon } from '../../config/weaponType';

interface SearchProps {
	options: Weapon[];
	loading: boolean;
	size?: 'small' | 'medium';
	label?: string;
}

const Search = ({ options, loading, size = 'medium', label = 'Search' }: SearchProps) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

	const handleInputChange = (_event: React.SyntheticEvent, newInputValue: string) => {
		setSearchTerm(newInputValue);
		console.log('Querying database with:', newInputValue);
	};

	const handleChange = (_event: React.SyntheticEvent, newValue: Weapon | null) => {
		setSearchTerm('');
		setSelectedWeapon(newValue);
		console.log('Submitting Weapon to DB:', newValue);
	};

	return (
		<Autocomplete
			value={selectedWeapon || undefined}
			size={size}
			fullWidth
			loading={loading}
			options={options}
			inputValue={searchTerm}
			getOptionLabel={(option: Weapon | string) =>
				typeof option === 'string' ? option : option.name
			}
			isOptionEqualToValue={(option: Weapon, value: Weapon | null) =>
				option._id === value?._id
			}
			onInputChange={(_event, newInputValue) => handleInputChange(_event, newInputValue)}
			onChange={handleChange}
			forcePopupIcon={false}
			disableClearable
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
