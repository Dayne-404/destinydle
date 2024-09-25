import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import { Weapon } from '../../config/weaponType';
import GuessGridHeader from './GuessGridHeader';
import GuessGridItem from './GuessGridItem';

export default function GuessGrid({
	guessedItems,
	correctItem,
	replace,
}: {
	guessedItems: Weapon[];
	correctItem: Weapon;

	replace?: Record<string, string>;
}) {
	const columns = Object.keys(guessedItems[0]).filter(
		(column) => column !== '_id' && column !== 'name'
	);
	const displayedColumns = columns.map((column) =>
		replace && replace[column] ? replace[column] : column
	);

	return (
		<Box sx={{ overflowX: 'auto', width: '100%' }}>
			<Grid container spacing={1}>
				<GuessGridHeader displayedColumns={displayedColumns} />
				{guessedItems.map((item) => (
					<GuessGridItem
						key={item._id}
						guessedItem={item}
						correctItem={correctItem}
						columns={columns}
					/>
				))}
			</Grid>
		</Box>
	);
}
