import { Stack, Box, Button } from '@mui/material';
import Search from '../search/Search';
import { Weapon } from '../../config/weaponType';

interface SearchBarProps {
	searchOptions: Weapon[];
	guessedItem: Weapon | null;
	setGuessedItem: React.Dispatch<React.SetStateAction<Weapon | null>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	onClick: (guessedItemState?: Weapon | null, searchTermState?: string) => void;
}

const SearchBar = ({
	searchOptions,
	guessedItem,
	setGuessedItem,
	searchTerm,
	setSearchTerm,
	onClick,
}: SearchBarProps) => {
	return (
		<Stack direction="row" width="100%" justifyContent="center" spacing={1} pt={3} pb={1}>
			<Box width="50%">
				<Search
					options={searchOptions}
					size="small"
					loading={false}
					selectedWeapon={guessedItem}
					setSelectedWeapon={setGuessedItem}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			</Box>
			<Button variant="contained" onClick={() => onClick()}>
				Search
			</Button>
		</Stack>
	);
};

export default SearchBar;
