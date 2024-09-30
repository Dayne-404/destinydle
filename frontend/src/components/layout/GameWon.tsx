import { Stack, Typography, Box, Divider, Button, Theme } from '@mui/material';
import { Weapon } from '../../config/weaponType';
import { bodySx, itemSx } from '../../styles/gridStyle';
import CountdownToMidnight from './MidnightCountdown';
import BarChartIcon from '@mui/icons-material/BarChart';

const gameWonContainerSx = {
	minHeight: '475px',
	width: {
		xs: '95%',
		md: '70%',
	},
	border: '2px solid white',
	background: (theme: Theme) =>
		`linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
};

const statsButtonSx = {
	mx: 'auto',
	width: '80px',
	color: 'white',
	borderColor: 'white',
	backgroundColor: 'rgba(33, 33, 33, 0.8)',
};

const dividerSx = {
	borderBottomWidth: 2,
	borderColor: 'white',
	width: '90%',
};

const GameWon = ({ dailyItem, numTries }: { dailyItem?: Weapon; numTries: number }) => {
	return (
		<Stack
			margin="auto"
			alignItems="center"
			justifyContent="center"
			textAlign="center"
			mb={4}
			spacing={3}
			sx={gameWonContainerSx}
		>
			<Typography variant="h4">YYYYEEESSSS!</Typography>
			<Stack
				direction="row"
				spacing={2}
				justifyContent="center"
				alignItems="center"
				height="60px"
			>
				<Box sx={{ ...itemSx, ...bodySx }}>
					<img
						src={dailyItem?.imgUrl}
						alt={dailyItem?.name}
						style={{ width: '60px', height: 'auto', objectFit: 'cover' }}
					/>
				</Box>
				<Stack>
					<Typography variant="subtitle2">You guessed</Typography>
					<Typography variant="h5">{dailyItem?.name}</Typography>
				</Stack>
			</Stack>
			<Stack>
				<Typography variant="subtitle1">
					Number of tries:{' '}
					<Box component="span" sx={{ color: 'primary.main' }}>
						{numTries}
					</Box>
				</Typography>
				<Button
					startIcon={<BarChartIcon />}
					size="small"
					variant="outlined"
					sx={statsButtonSx}
				>
					Stats
				</Button>
			</Stack>
			<Stack>
				<Typography variant="subtitle1">Next weapon in</Typography>
				<CountdownToMidnight />
			</Stack>
			<Divider sx={dividerSx} />
		</Stack>
	);
};

export default GameWon;
