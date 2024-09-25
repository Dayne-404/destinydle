import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { Weapon } from '../../config/weaponType';
import { itemSx, bodySx, textSx, arrowSx } from '../../styles/gridStyle';
import { compareWeapon } from '../helper/compareWeapon';

import PublishIcon from '@mui/icons-material/Publish';
import DownloadIcon from '@mui/icons-material/Download';

interface GuessGridItemProps {
	guessedItem: Weapon;
	correctItem: Weapon;
	columns: string[];
}

export default function GuessGridItem({ guessedItem, correctItem, columns }: GuessGridItemProps) {
	const compared = compareWeapon(guessedItem, correctItem);

	const getColorSx = (num: number): { color: string; backgroundColor: string } => {
		if (num === 1) return { color: 'success.contrastText', backgroundColor: 'success.main' };

		return { color: 'error.contrastText', backgroundColor: 'error.main' };
	};

	return (
		<Grid container size={12} spacing={1} sx={{ minWidth: '420px', justifyContent: 'center' }}>
			{columns.map((column) => (
				<Grid
					key={`${guessedItem._id}-${column}`}
					size={1.8}
					sx={{ ...getColorSx(compared[column as keyof Weapon]), ...itemSx, ...bodySx }}
				>
					{compared[column as keyof Weapon] === 2 && <DownloadIcon sx={arrowSx} />}
					{compared[column as keyof Weapon] === 3 && <PublishIcon sx={arrowSx} />}
					{column === 'craftable' ? (
						<Typography variant="subtitle1" sx={textSx}>
							{guessedItem[column as keyof Weapon] ? 'Yes' : 'No'}
						</Typography>
					) : column === 'imgUrl' ? (
						<img
							src={guessedItem[column]}
							alt={guessedItem.name}
							style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
						/>
					) : (
						<Typography variant="subtitle1" sx={textSx}>
							{guessedItem[column as keyof Weapon]}
						</Typography>
					)}
				</Grid>
			))}
		</Grid>
	);
}
