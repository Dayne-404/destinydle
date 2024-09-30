import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { Weapon } from '../../config/weaponType';
import { itemSx, bodySx, textSx, arrowSx } from '../../styles/gridStyle';
import { compareWeapon } from '../../helper/compareWeapon';

import PublishIcon from '@mui/icons-material/Publish';
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from 'react';
import { SEASONS } from '../../config/seasonType';

interface GuessGridItemProps {
	order: (keyof Weapon)[];
	compareFields?: (keyof Weapon)[];
	guessedItem?: Weapon;
	correctItem?: Weapon;
}

export default function GuessGridItem({
	guessedItem,
	correctItem,
	order,
	compareFields,
}: GuessGridItemProps) {
	const [fadeIn, setFadeIn] = useState(false);

	let compared: Record<string, number> = {};
	if (correctItem && guessedItem && compareFields) {
		compared = compareWeapon(guessedItem, correctItem, compareFields);
	}

	const getColorSx = (num: number): { color: string; backgroundColor: string } => {
		if (num === 1) return { color: 'success.contrastText', backgroundColor: 'success.main' };
		return { color: 'error.contrastText', backgroundColor: 'error.main' };
	};

	useEffect(() => {
		setTimeout(() => {
			setFadeIn(true);
		}, 100);
	}, []);

	const displayedItem = guessedItem || correctItem;
	if (!displayedItem) {
		return <></>;
	}

	return (
		<Grid container size={12} spacing={1} sx={{ minWidth: '420px', justifyContent: 'center' }}>
			{order.map((key, index) => (
				<Grid
					key={`${displayedItem._id}-${key}`}
					size={1.6}
					sx={{
						opacity: fadeIn ? 1 : 0,
						transition: 'opacity 0.5s ease-in-out',
						transitionDelay: `${index * 0.3}s`,
						animation: 'fadeIn 0.5s forwards',
						p: key === 'imgUrl' ? 0 : 0.2,
						...getColorSx(compared[key]),
						...itemSx,
						...bodySx,
					}}
				>
					{compared[key] === 2 && <DownloadIcon sx={arrowSx} />}
					{compared[key] === 3 && <PublishIcon sx={arrowSx} />}

					{key === 'imgUrl' ? (
						<img
							src={displayedItem[key]}
							alt={displayedItem.name}
							style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
						/>
					) : (
						<Typography variant="body2" sx={textSx}>
							{key === 'released'
								? `${SEASONS[displayedItem.released as keyof typeof SEASONS]} S(${displayedItem[key]})`
								: displayedItem[key]}
						</Typography>
					)}
				</Grid>
			))}
		</Grid>
	);
}
