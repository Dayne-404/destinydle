import { Weapon } from '../config/weaponType';

export interface GameState {
	lastGuessDate: string;
	gameState: 0 | 1 | 2;
	guessedItems: Weapon[];
	avgGuesses: number[];
	streak: number;
	finished: boolean;
}

export const initalizeGame = (): GameState => {
	const currentDate = new Date();
	const todayString = currentDate.toISOString().split('T')[0];
	const yesterdayString = new Date(currentDate.setDate(currentDate.getDate() - 1))
		.toISOString()
		.split('T')[0];
	const storedGameStateStr = localStorage.getItem('gameState');

	let gameState: GameState;

	if (storedGameStateStr) {
		gameState = JSON.parse(storedGameStateStr);
		if (gameState.lastGuessDate !== todayString) {
			if (gameState.lastGuessDate === yesterdayString) {
				console.log('Streak Found and last guess was yesterday no need to reset');
				gameState = {
					...gameState,
					gameState: 0,
					guessedItems: [],
					lastGuessDate: todayString,
				};
			} else {
				console.log('Streak Found but last guess was NOT yesterday resetting');
				gameState = {
					gameState: 0,
					guessedItems: [],
					lastGuessDate: todayString,
					avgGuesses: gameState.avgGuesses,
					streak: 0,
					finished: false,
				};
			}
		}
	} else {
		console.log('No Local storage found creating new');
		gameState = {
			gameState: 0,
			guessedItems: [],
			lastGuessDate: todayString,
			avgGuesses: Array(11).fill(0),
			streak: 0,
			finished: false,
		};
	}

	
	localStorage.setItem('gameState', JSON.stringify(gameState));

	return gameState;
};

export const getGameState = (): GameState | undefined => {
	const storedGameStateStr = localStorage.getItem('gameState');

	if (storedGameStateStr) {
		const gameState: GameState = JSON.parse(storedGameStateStr);
		return gameState;
	}

	console.log('No Game State Found');
	return undefined;
};

export const setLocalGameState = ({
	guessedItems,
}: {
	guessedItems: Weapon[];
}) => {
	const storedGameStateStr = localStorage.getItem('gameState');

	if (storedGameStateStr) {
		const oldGameState: GameState = JSON.parse(storedGameStateStr);

		if(oldGameState.finished) return;

		const newGameState: GameState = {
			...oldGameState,
			guessedItems: guessedItems,
		};

		console.log('Setting local game state');
		localStorage.setItem('gameState', JSON.stringify(newGameState));
	}
};

export const setLocalFinishedGameState = ({
	gameState,
	guessedItems,
	numGuesses,
}: {
	gameState: 0 | 1 | 2;
	guessedItems: Weapon[];
	numGuesses: number;
}): GameState | undefined => {
	const storedGameStateStr = localStorage.getItem('gameState');

	if (storedGameStateStr) {
		const oldGameState: GameState = JSON.parse(storedGameStateStr);

		if(oldGameState.finished) return;

		const newAvgGuesses = oldGameState.avgGuesses;
		newAvgGuesses[numGuesses] = oldGameState.avgGuesses[numGuesses] + 1;

		const newGameState: GameState = {
			...oldGameState,
			gameState: gameState,
			guessedItems: guessedItems,
			avgGuesses: newAvgGuesses,
			streak: gameState === 2 ? oldGameState.streak + 1 : 0,
			finished: true,
		};

		console.log('Setting local FINISHED game state');
		localStorage.setItem('gameState', JSON.stringify(newGameState));
		return newGameState;
	}
};
