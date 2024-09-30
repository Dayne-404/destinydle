import { Stack, IconButton, Tooltip, Box, Typography } from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import ReusableModal from '../modals/Modal';

const NavIcon = ({
	tooltip,
	icon,
	onClick,
}: {
	tooltip: string;
	icon?: React.ReactNode;
	onClick?: () => void;
}) => {
	return (
		<Tooltip
			title={tooltip}
			arrow
			PopperProps={{
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, -10],
						},
					},
				],
			}}
		>
			<IconButton
				onClick={onClick}
				sx={{
					color: 'text.secondary',
				}}
			>
				{icon}
			</IconButton>
		</Tooltip>
	);
};

const NavIcons = ({streak}: {streak: number}) => {
	const [open, setOpen] = useState(false);
	const [modalContent, setModalContent] = useState<{
		title: string;
		content: React.ReactNode;
	} | null>(null);

	const handleOpen = (title: string, content: React.ReactNode) => {
		setModalContent({ title, content });
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setModalContent(null);
	};

	return (
		<>
			<Stack direction="row" spacing={0.5} width="100%" justifyContent="center" pb={3}>
				<NavIcon
					tooltip="Stats"
					icon={<LeaderboardIcon />}
					onClick={() => handleOpen('Stats', <div>Nothing yet</div>)}
				/>
				<Box position="relative">
					<NavIcon
						tooltip="Streak"
						icon={
							<LocalFireDepartmentTwoToneIcon
								sx={{
									color: streak ? 'primary.main' : 'text.secondary',
								}}
							/>
						} 
					/>
					<Typography
						variant="body1"
						color="white" 
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							borderRadius: '50%',
							padding: '0 4px',
							textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
						}}
					>
						{streak > 0 && streak}
					</Typography>
				</Box>
				<NavIcon
					tooltip="Patch Notes"
					icon={<TextSnippetIcon />}
					onClick={() =>
						handleOpen('Patch Notes', <div>Nothing yet</div>)
					}
				/>
				<NavIcon
					tooltip="Help"
					icon={<HelpOutlineIcon />}
					onClick={() => handleOpen('Help', <div>Nothing yet</div>)}
				/>
				<NavIcon
					tooltip="Settings"
					icon={<SettingsIcon />}
					onClick={() => handleOpen('Settings', <div>Nothing yet</div>)}
				/>
			</Stack>
			{modalContent && (
				<ReusableModal open={open} handleClose={handleClose} title={modalContent.title}>
					{modalContent.content}
				</ReusableModal>
			)}
		</>
	);
};

export default NavIcons;
