import React from 'react';
import { Modal, Box, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon

interface ModalProps {
	open: boolean;
	handleClose: () => void;
	title: string;
	children: React.ReactNode;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	color: 'text.secondary',
	bgcolor: 'primary.main',
	border: '2px solid white',
	boxShadow: 24,
	p: 4,
};

const headerStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
};

const ReusableModal = ({ open, handleClose, title, children }: ModalProps) => {
	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Box sx={headerStyle}>
					<Typography variant="h5" component="h2">
						{title}
					</Typography>
					<IconButton onClick={handleClose} sx={{ color: 'white' }}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Divider sx={{ borderBottomWidth: 2, borderColor: 'white', width: '100%' }} />
				<Box sx={{ mt: 2 }}>{children}</Box>
			</Box>
		</Modal>
	);
};

export default ReusableModal;
