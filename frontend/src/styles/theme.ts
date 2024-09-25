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
			main: '#ed880b',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#ffffff',
		},
		text: {
			secondary: '#ffffff'
		}
	},
});

export default theme;
