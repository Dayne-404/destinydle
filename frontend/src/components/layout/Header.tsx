import { Stack, Typography } from '@mui/material';

interface HeaderProps {
  title: string;
  icon?: string;
}

const Header = ({title}: HeaderProps) => {
	const Title = () => {
		return (
			<Typography
				variant="h4"
				sx={{
					letterSpacing: '0.5rem',
					flexGrow: 1,
					textAlign: 'center',
					fontWeight: 'bold',
					wordWrap: 'break-word',
					fontSize: {
						xs: '2rem',
						sm: '2rem',
						md: '2.5rem',
						lg: '3rem',
					},
					color: 'text.secondary'
				}}
			>
				{title}
			</Typography>
		);
	};

	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="center"
			py={3}
		>
			<Title />
		</Stack>
	);
};

export default Header;
