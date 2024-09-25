import { Stack, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface HeaderProps {
  title: string;
  icon?: string;
}

const Header = ({title}: HeaderProps) => {
	const SettingsButton = () => {
		return (
			<IconButton color="inherit" aria-label="settings">
				<SettingsIcon />
			</IconButton>
		);
	};

	const NotificationsButton = () => {
		return (
			<IconButton color="inherit" aria-label="notifications">
				<NotificationsIcon />
			</IconButton>
		);
	};

	const Title = () => {
		return (
			<Typography
				variant="h4"
				sx={{
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
			<SettingsButton />
			<Title />
			<NotificationsButton />
		</Stack>
	);
};

export default Header;
