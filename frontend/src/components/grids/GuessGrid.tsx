import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import { Weapon } from '../../config/weaponType';
import GuessGridHeader from './GuessGridHeader';
import GuessGridItem from './GuessGridItem';

export default function GuessGrid({
	order,
	guessedItems,
	correctItem,
	compareFields,
}: {
	order: (keyof Weapon)[];
	guessedItems: Weapon[];
	correctItem: Weapon | undefined;
	compareFields: (keyof Weapon)[];
}) {
	const keysToRemove = ['rpm', 'magazine',]
	const formattedOrder = order.filter(key => !keysToRemove.includes(key));
	
	const displayedColumns: string[] = order.filter(key => !keysToRemove.includes(key));
	displayedColumns[0] = 'Icon';

	return (
		<Box sx={{ overflowX: 'auto', width: '100%' }}>
			<Grid container spacing={1}>
				{guessedItems.length > 0 && <GuessGridHeader displayedColumns={displayedColumns} />}
				{guessedItems.map((item) => (
					<GuessGridItem
						order={formattedOrder}
						key={item.name}
						guessedItem={item}
						correctItem={correctItem}
						compareFields={compareFields}
					/>
				))}
			</Grid>
		</Box>
	);
}
