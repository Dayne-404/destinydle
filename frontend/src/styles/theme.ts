import { createTheme } from '@mui/material/styles';
import './fonts.css';

const theme = createTheme({
	typography: {
		fontFamily: 'Neue, Arial, sans-serif',
		h4: {
			fontFamily: 'Futura, Arial, sans-serif',
		},
	},

	palette: {
		primary: {
			main: '#1976d2',
			contrastText: '#ffffff',
		},

		secondary: {
			main: '#dc004e',
		},
	},
});

export default theme;
