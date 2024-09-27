import { Stack, Rating, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Lives = ({ numGuesses, maxGuesses }: { numGuesses: number | null, maxGuesses: number }) => {
	return (
		<Stack width="100%" alignItems="center" pb={4} spacing={1}>
			<Rating
				value={numGuesses}
				defaultValue={maxGuesses}
				max={maxGuesses}
				precision={1}
				readOnly
				icon={<FavoriteIcon fontSize="inherit" color="primary" />}
				emptyIcon={
					<FavoriteBorderIcon fontSize="inherit" sx={{ color: 'text.secondary' }} />
				}
			/>
			<Typography color="text.secondary" variant="body2">
				4000 people already guessed
			</Typography>
		</Stack>
	);
};

export default Lives;
