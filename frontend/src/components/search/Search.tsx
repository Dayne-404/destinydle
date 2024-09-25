import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { searchSx } from '../../styles/searchStyle';

interface WeaponOption {
	id: string;
	name: string;
}

interface SearchProps {
	options: WeaponOption[];
	loading: boolean;
	size?: 'small' | 'medium';
	label?: string;
}

const Search = ({ options, loading, size = 'medium', label = 'Search' }: SearchProps) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedWeapon, setSelectedWeapon] = useState<WeaponOption | null>(null);

  useEffect(() => {
    setSearchTerm('');
  }, [selectedWeapon])

	const handleInputChange = (_event: React.SyntheticEvent, newInputValue: string) => {
		setSearchTerm(newInputValue);
		console.log('Querying database with:', newInputValue);
	};

	const handleChange = (_event: React.SyntheticEvent, newValue: WeaponOption | null) => {
			setSearchTerm('');
      setSelectedWeapon(null);
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
			getOptionLabel={(option: WeaponOption | string) =>
				typeof option === 'string' ? option : option.name
			}
			isOptionEqualToValue={(option: WeaponOption, value: WeaponOption | null) =>
				option.id === value?.id
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
