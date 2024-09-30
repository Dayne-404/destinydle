import { Typography, Box } from '@mui/material';

const PreviousWeapon = ({ weapon }: { weapon: string }) => {
	if (!weapon) return;

	return (
		<Box width="40%" mx='auto' textAlign='center' pb={4}>
			<Typography variant="subtitle1">
				Yesterday's weapon was{' '}
				<Box component="span" sx={{ color: 'primary.main' }}>
					{weapon}
				</Box>
			</Typography>
		</Box>
	);
};

export default PreviousWeapon;
