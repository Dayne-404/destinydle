import { Stack, Box, Button } from '@mui/material';
import Search from '../search/Search';
import { Weapon } from '../../config/weaponType';

interface SearchBarProps {
	searchOptions: Weapon[];
	selectedOptions: Weapon[];
	guessedItem: Weapon | null;
	setGuessedItem: React.Dispatch<React.SetStateAction<Weapon | null>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	onClick: (guessedItemState?: Weapon | null, searchTermState?: string) => void;
}

const SearchBar = ({
	searchOptions,
	selectedOptions,
	guessedItem,
	setGuessedItem,
	searchTerm,
	setSearchTerm,
	onClick,
}: SearchBarProps) => {
	const filteredSearchOptions = searchOptions.filter(option => 
		!selectedOptions.some(selected => selected._id === option._id)
	);

	return (
		<Stack direction="row" width="100%" justifyContent="center" spacing={0.5} pt={3} pb={1}>
			<Box width="40%">
				<Search
					label='Type a weapon to get started'
					options={filteredSearchOptions}
					size="small"
					loading={false}
					selectedWeapon={guessedItem}
					setSelectedWeapon={setGuessedItem}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			</Box>
			<Button variant="contained" size='small' onClick={() => onClick()}>
				Search
			</Button>
		</Stack>
	);
};

export default SearchBar;
