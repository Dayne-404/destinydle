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
			main: '#ceae33',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#ffffff',
		},
		text: {
			secondary: '#ffffff'
		},
		error: {
			main: '#f44336',
			dark: '#b00020',
		}
	},
});

export default theme;
