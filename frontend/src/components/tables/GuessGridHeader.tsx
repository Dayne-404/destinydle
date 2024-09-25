import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { itemSx } from '../../styles/gridStyle';

interface GuessGridHeaderProps {
	displayedColumns: string[];
}

export default function GuessGridHeader({ displayedColumns }: GuessGridHeaderProps) {
	

	return (
		<Grid container size={12} spacing={1} sx={{ minWidth: '420px', justifyContent: 'center' }}>
			{displayedColumns.map((column) => (
				<Grid
					key={column}
					size={1.8}
					sx={{
						...itemSx,
						minHeight: '30px',
						borderBottom: '2px solid white',
					}}
				>
					<Typography variant="subtitle2" fontWeight="400">
						{column.charAt(0).toUpperCase() + column.slice(1)}
					</Typography>
				</Grid>
			))}
		</Grid>
	);
}
