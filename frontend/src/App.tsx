import {
	Container,
	Box,
	Stack,
	Button,
	IconButton,
	Rating,
	Typography,
	Paper,
} from '@mui/material';
import Header from './components/Header';
import ClassicTable from './components/tables/GuessGrid';
import { Weapon } from './config/weaponType';
import Search from './components/search/Search';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
function App() {
	const items: Weapon[] = [
		{
			_id: '1',
			name: 'Basic Bow',
			imgUrl: 'https://via.placeholder.com/100',
			type: 'Bow',
			ammo: 'Arrow',
			element: 'Fire',
			released: 0,
			craftable: true,
		},
		{
			_id: '2',
			name: 'Electric Gun',
			imgUrl: 'https://via.placeholder.com/100',
			type: 'Gun',
			ammo: 'Bullet',
			element: 'Electric',
			released: 1,
			craftable: false,
		},
	];

	const selectedItem: Weapon = {
		_id: '1',
		name: 'Basic Bow',
		imgUrl: 'https://via.placeholder.com/100',
		type: 'Bow',
		ammo: 'Arrow',
		element: 'Fire',
		released: -1,
		craftable: true,
	};

	const [rating, setRating] = useState<number | null>(5);

	return (
		<Container
			sx={{
				maxWidth: { xs: '95%', sm: '700px' },
			}}
		>
			<Paper
				sx={{
					backgroundColor: 'rgba(33, 33, 33, 0.8)', // Dark grey with 80% opacity
					color: 'white', // Ensures text color is white for contrast
					padding: 2, // Add some padding
					borderRadius: 0, // Slightly rounded corners
					backdropFilter: 'blur(10px)', // Optional: add a blur effect to the background
					height: '100vh',
					boxSizing: 'border-box'
				}}
			>
				<Header title="DESTINYDLE" />

				<Stack direction="row" spacing={0.5} width="100%" justifyContent="center" pb={3}>
					<IconButton sx={{ color: 'text.secondary' }}>
						<LeaderboardIcon />
					</IconButton>
					<IconButton sx={{ color: 'text.secondary' }}>
						<LocalFireDepartmentIcon />
					</IconButton>
					<IconButton sx={{ color: 'text.secondary' }}>
						<TextSnippetIcon />
					</IconButton>
					<IconButton sx={{ color: 'text.secondary' }}>
						<HelpOutlineIcon />
					</IconButton>
				</Stack>

				<Stack
					direction="row"
					width="100%"
					justifyContent="center"
					spacing={1}
					pt={3}
					pb={1}
				>
					<Box width="50%">
						<Search options={items} size="small" loading={false} />
					</Box>
					<Button variant="contained">Search</Button>
				</Stack>

				<Stack width="100%" alignItems="center" pb={4} spacing={1}>
					<Rating
						value={rating}
						defaultValue={5}
						max={5}
						precision={1}
						readOnly
						icon={<FavoriteIcon fontSize="inherit" color="primary" />}
						emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
					/>
					<Typography color="text.secondary" variant="body2">
						4000 people already guessed
					</Typography>
				</Stack>

				<Box py={5}>
					<ClassicTable
						guessedItems={items}
						correctItem={selectedItem}
						replace={{ imgUrl: 'name' }}
					/>
				</Box>
			</Paper>
		</Container>
	);
}

export default App;
