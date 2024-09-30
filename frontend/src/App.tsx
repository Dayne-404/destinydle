import { Container, Paper } from '@mui/material';
import Header from './components/layout/Header';
import { Weapon, WEAPON_COMPARE_FIELDS, WEAPON_ORDER } from './config/weaponType';
import { useEffect, useState, useRef } from 'react';
import NavIcons from './components/layout/NavIcons';
import { paperSx } from './styles/paperStyle';
import SearchBar from './components/layout/SearchBar';
import Lives from './components/layout/Lives';
import { getDailyWeapon, getWeapons } from './helper/getRequest';
import GuessGrid from './components/grids/GuessGrid';
import GameOver from './components/layout/GameOver';
import GameWon from './components/layout/GameWon';
import PreviousWeapon from './components/layout/PreviousWeapon';
import {
	GameState,
	initalizeGame,
	setLocalFinishedGameState,
	setLocalGameState,
} from './helper/localStorageHandler';

function App() {
	const [numGuesses, setNumGuesses] = useState<number | null>(10);
	const [gameState, setGameState] = useState<0 | 1 | 2>(0);
	const [guessedItem, setGuessedItem] = useState<Weapon | null>(null);
	const [guessedItems, setGuessedItems] = useState<Weapon[]>([]);
	const [previousItem, setPreviousItem] = useState<string>('');
	const [dailyItem, setDailyItem] = useState<Weapon>();
	const [items, setItems] = useState<Weapon[]>([]);
	const [streak, setStreak] = useState<number>(0);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const targetRef = useRef<HTMLDivElement | null>(null);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);

	const handleScroll = () => {
		if (targetRef.current) {
			targetRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	useEffect(() => {
		const initalGameState: GameState = initalizeGame();
		setGameState(initalGameState.gameState);
		setGuessedItems(initalGameState.guessedItems);
		
		if(initalGameState.gameState === 2) {
			setNumGuesses(11 - initalGameState.guessedItems.length);
		}
		else {
			setNumGuesses(10 - initalGameState.guessedItems.length);
		}

		setStreak(initalGameState.streak);
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		if (!isInitialized) return;

		if (gameState > 0) {
			const finalGuesses = 10 - (numGuesses || 0);
			const finalGameState = setLocalFinishedGameState({ gameState, guessedItems, numGuesses: finalGuesses });
			if(finalGameState) setStreak(finalGameState.streak);
		}

		setLocalGameState({ guessedItems });
	}, [gameState, guessedItems, numGuesses, isInitialized]);

	useEffect(() => {
		const fillGuessGrid = async () => {
			try {
				const result = await getDailyWeapon();
				setDailyItem(result.current);
				if (result.previous) setPreviousItem(result.previous.name);
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

	useEffect(() => {
		if (gameState === 2) {
			handleScroll();
		}
	}, [gameState]);

	const handleSubmit = (
		guessedItemState: Weapon | null = guessedItem,
		searchTermState: string = searchTerm
	) => {
		if (!guessedItemState && searchTermState.length <= 1) {
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
			} else {
				return;
			}
		}

		if (!localGuessedItem) return;

		setGuessedItems([localGuessedItem, ...guessedItems]);
		setGuessedItem(null);
		setSearchTerm('');

		if (guessedItemState?._id === dailyItem?._id) {
			setGameState(2);
		} else if (numGuesses) {
			if (numGuesses - 1 <= 0) setGameState(1);
			setNumGuesses(numGuesses - 1);
		}
	};

	return (
		<Container
			sx={{
				maxWidth: { xs: '100%', sm: '700px' },
				padding: { xs: 0 },
			}}
		>
			<Paper sx={paperSx}>
				<Header title="DESTINYDLE" />
				<NavIcons streak={streak} />
				{gameState === 1 ? (
					<GameOver dailyItem={dailyItem} />
				) : (
					<>
						{gameState === 0 && (
							<SearchBar
								selectedOptions={guessedItems}
								searchOptions={items}
								guessedItem={guessedItem}
								setGuessedItem={setGuessedItem}
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
								onClick={handleSubmit}
							/>
						)}
						<Lives numGuesses={numGuesses} maxGuesses={10} />
						<PreviousWeapon weapon={previousItem} />
						{gameState === 2 && (
							<div ref={targetRef}>
								<GameWon dailyItem={dailyItem} numTries={11 - (numGuesses || 0)} />
							</div>
						)}
						<GuessGrid
							order={WEAPON_ORDER}
							compareFields={WEAPON_COMPARE_FIELDS}
							guessedItems={guessedItems}
							correctItem={dailyItem}
						/>
					</>
				)}
			</Paper>
		</Container>
	);
}

export default App;
