import { Container, Box } from '@mui/material';
import Header from './components/Header';
import ClassicTable from './components/tables/GuessGrid';
import { Weapon } from './config/weaponType';
import Search  from './components/search/Search';
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

	return (
		<Container
			sx={{
				maxWidth: { xs: '95%', sm: '700px' },
			}}
		>
			<Header title="Destinydle" />

			<Box
				sx={{
					mt: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '70vh',
					width: '100%',
				}}
			>
				<Search
					options={[
						{ id: '1', name: 'Sword' },
						{ id: '2', name: 'Axe' },
						{ id: '3', name: 'Bow' },
						{ id: '4', name: 'Dagger' },
						{ id: '5', name: 'Spear' },
					]}
					loading={false}
				/>
				<ClassicTable
					guessedItems={items}
					correctItem={selectedItem}
					replace={{ imgUrl: 'name' }}
				/>
			</Box>
		</Container>
	);
}

export default App;
