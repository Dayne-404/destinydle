import { Container, Box, Paper } from '@mui/material';
import Header from './components/layout/Header';
import { Weapon, WEAPON_COMPARE_FIELDS, WEAPON_ORDER } from './config/weaponType';
import { useEffect, useState } from 'react';
import NavIcons from './components/layout/NavIcons';
import { paperSx } from './styles/paperStyle';
import SearchBar from './components/layout/SearchBar';
import Lives from './components/layout/Lives';
import { getDailyWeapon, getWeapons } from './helper/getRequest';
import GuessGrid from './components/grids/GuessGrid';
import GameOver from './components/layout/GameOver';
import GameWon from './components/layout/GameWon';

function App() {
	const [numGuesses, setNumGuesses] = useState<number | null>(10);
	const [gameState, setGameState] = useState<number>(2); //0 for playing 1 for failed 2 for won
	const [guessedItem, setGuessedItem] = useState<Weapon | null>(null);
	const [guessedItems, setGuessedItems] = useState<Weapon[]>([]);
	const [dailyItem, setDailyItem] = useState<Weapon>();
	const [items, setItems] = useState<Weapon[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		const fillGuessGrid = async () => {
			try {
				const result = await getDailyWeapon();
				setDailyItem(result.current);
			} catch (error) {
				console.error(error);
			}
		};

		fillGuessGrid();
	}, []);

	useEffect(() => {
		const getWeaponItems = async () => {
			try {
				const result: { weapons: Weapon[]; totalCount: number } = await getWeapons();
				setItems(result.weapons);
			} catch (error) {
				console.error(error);
			}
		};

		getWeaponItems();
	}, []);

	const handleSubmit = (
		guessedItemState: Weapon | null = guessedItem,
		searchTermState: string = searchTerm
	) => {
		if (!guessedItemState && searchTermState.length <= 1) {
			console.log('No Guessed item or search term too short, returning');
			return;
		}

		let localGuessedItem = guessedItemState;

		if (!localGuessedItem) {
			const matchedOption = items.find(
				(item) => item.name.toLowerCase() === searchTermState.toLowerCase()
			);

			if (matchedOption) {
				localGuessedItem = matchedOption;
				setGuessedItem(matchedOption);
				console.log('Matched Item found setting single item');
			} else {
				console.log('No Matched Setting Returning');
				return;
			}
		}

		if (!localGuessedItem) {
			console.log('No guessed item returnting');
			return;
		}

		setGuessedItems([localGuessedItem, ...guessedItems]);
		setGuessedItem(null);
		setSearchTerm('');

		if (guessedItemState === dailyItem) {
			setGameState(2);
			console.log('YOU WON!');
		} else if (numGuesses) {
			if (numGuesses - 1 <= 0) setGameState(1);
			setNumGuesses(numGuesses - 1);
			console.log('NOT RIGHT');
		}
	};

	return (
		<Container
			sx={{
				maxWidth: { xs: '95%', sm: '700px' },
			}}
		>
			<Paper sx={paperSx}>
				<Header title="DESTINYDLE" />
				<NavIcons />
				{gameState === 1 ? (
					<GameOver dailyItem={dailyItem} />
				) : (
					<>
						{gameState === 0 && (
							<SearchBar
								searchOptions={items}
								guessedItem={guessedItem}
								setGuessedItem={setGuessedItem}
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
								onClick={handleSubmit}
							/>
						)}
						<Lives numGuesses={numGuesses} maxGuesses={10} />
						<GuessGrid
							order={WEAPON_ORDER}
							compareFields={WEAPON_COMPARE_FIELDS}
							guessedItems={guessedItems}
							correctItem={dailyItem}
						/>
						{gameState === 2 && (
							<GameWon dailyItem={dailyItem} numTries={10 - (numGuesses || 0)} />
						)}
					</>
				)}
			</Paper>
		</Container>
	);
}

export default App;
