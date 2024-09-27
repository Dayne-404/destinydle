import { Stack, Typography, Box } from '@mui/material';
import { Weapon } from '../../config/weaponType';
import { bodySx, itemSx } from '../../styles/gridStyle';
import CountdownToMidnight from './Clock';

const GameWon = ({ dailyItem, numTries }: { dailyItem?: Weapon; numTries: number }) => {
	return (
		<Stack
			margin="auto"
			alignItems="center"
			justifyContent="center"
			textAlign="center"
			mt={5}
			sx={{
				height: '550px',
				width: '80%',
				border: '2px solid white',
				background: (theme) =>
					`linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
			}}
			spacing={5}
		>
			<Typography variant="h4">gg wp</Typography>
			<Stack
				height="60px"
				direction="row"
				spacing={2}
				justifyContent="center"
				alignItems="center"
			>
				<Box sx={{...itemSx, ...bodySx}}>
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
			<Typography variant="subtitle1">Number of tries: {numTries}</Typography>
			<Typography variant="subtitle1">Next weapon in {numTries}</Typography>
			<CountdownToMidnight />
		</Stack>
	);
};

export default GameWon;
