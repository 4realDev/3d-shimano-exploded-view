import { createTheme } from '@mui/material/styles';

// Create a theme instance
export const theme = createTheme({
	palette: {
		primary: {
			main: '#FFEF00',
		},
		secondary: {
			main: '#283042',
		},
	},
	typography: {
		fontFamily: 'Arial',
		// body2: {
		// 	fontFamily: 'Times New Roman',
		// 	fontSize: '1.1rem',
		// },
	},
	shape: {
		borderRadius: 6,
	},
	// setting size for Theme.Spacing component
	spacing: 8,
	// Overrides of components
	components: {
		// MUI STEPPER ADJUSTMENTS
		MuiStepper: {
			styleOverrides: {
				root: { width: '100%', transition: 'all ease-in-out 0.5' },
			},
		},

		MuiStepButton: {
			defaultProps: {
				disableRipple: true,
				disableTouchRipple: true,
			},
		},

		MuiStepConnector: {
			styleOverrides: {
				line: {
					borderColor: '#fff',
				},
			},
		},

		MuiStepIcon: {
			styleOverrides: {
				root: {
					height: '4rem',
					width: '4rem',
					color: 'transparent',
					transition: 'ease-in-out all 200ms',
					'&.Mui-active': {
						fill: '#FFEF00',
					},
				},
				text: {
					fontSize: '1.6rem',
					fontFamily: 'Lyon Display',
					fontWeight: 900,
					transform: 'translateY(1px)',

					// Does not work: therefore styling is done insied App.css
					// '&.Mui-active': {
					// 	fill: '#000',
					// },
				},
			},
		},

		// MUI TEXTFIELD ADJUSTMENTS
		// TextField will start expanded and there will be no animations
		MuiTextField: {
			styleOverrides: {
				root: {
					width: '100%',
				},
			},
			defaultProps: {
				variant: 'outlined',
				InputLabelProps: {
					shrink: true,
				},
			},
		},

		MuiInputBase: {
			styleOverrides: {
				root: {
					marginBottom: '24px',
					fontSize: '1.4rem',
				},
			},
		},

		// Adjust upper input label hint
		// Focused upper input label hint (color) is adjusted in App.css
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: '#fff',
					fontSize: '1.6rem',
					lineHeight: '16px',
					backgroundColor: '#283042',
					paddingRight: '8px',
					'&.Mui-focused': {
						color: 'white',
					},
				},
			},
		},

		// Coloring typed InputText
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					color: 'white',
				},
				notchedOutline: {
					borderColor: 'white',
				},
			},
		},

		// Coloring Icons of TextFields
		MuiSelect: {
			styleOverrides: {
				icon: {
					fill: 'white',
				},
			},
		},

		MuiIconButton: {
			styleOverrides: {
				root: {
					color: 'white',
				},
			},
		},
	},
});
