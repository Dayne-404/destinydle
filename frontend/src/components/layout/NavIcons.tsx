import { Stack, IconButton } from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const NavIcons = () => {
	return (
		<Stack direction="row" spacing={0.5} width="100%" justifyContent="center" pb={3}>
			<IconButton sx={{ color: 'text.secondary' }}>
				<LeaderboardIcon />
			</IconButton>
			<IconButton sx={{ color: 'text.secondary' }}>
				<LocalFireDepartmentIcon />
			</IconButton>
			<IconButton sx={{ color: 'text.secondary' }}>
				<TextSnippetIcon />
			</IconButton>
			<IconButton sx={{ color: 'text.secondary' }}>
				<HelpOutlineIcon />
			</IconButton>
		</Stack>
	);
};

export default NavIcons;
