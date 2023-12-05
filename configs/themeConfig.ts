import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// theme 인스턴스 생성합니다.
// primary와 secondary는 여러분이 원하는대로 바꿔도 됩니다.

let themeConfig = createTheme({
	breakpoints: {
		keys: ['xs', 'sm', 'md', 'lg', 'xl'],
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1100,
			xl: 1536,
		},
		unit: 'px',
	},
	direction: 'ltr',
	components: {
		MuiCssBaseline: {
			styleOverrides: `
      @font-face {
        font-family: "MinSans";
        font-weight: 100;
        src: url("/fonts/MinSans-Thin.otf") format("opentype");
      }
      @font-face {
        font-family: "MinSans";
        font-weight: 200;
        src: url("/fonts/MinSans-ExtraLight.otf") format("opentype");
      }
      @font-face {
        font-family: "MinSans";
        font-weight: 300;
        src: url("/fonts/MinSans-Light.otf") format("opentype");
      }
      @font-face {
        font-family: "MinSans";
        font-weight: 400;
        src: url("/fonts/MinSans-Regular.otf") format("opentype");
      }
      @font-face {
        font-family: "MinSans";
        font-weight: 500;
        src: url("/fonts/MinSans-Medium.otf") format("opentype");
      }
      @font-face {
        font-family: "MinSans";
        font-weight: 600;
        src: url("/fonts/MinSans-SemiBold.otf") format("opentype");
      }
      @font-face {
        font-family: "MinSans";
        font-weight: 700;
        src: url("/fonts/MinSans-Bold.otf") format("opentype");
      }
      @font-face {
        font-family: "MinSans";
        font-weight: 800;
        src: url("/fonts/MinSans-ExtraBold.otf") format("opentype");
      }
      @font-face {
        font-family: "MinSans";
        font-weight: 900;
        src: url("/fonts/MinSans-Black.otf") format("opentype");
      }
      `,
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: '#222',
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					fontSize: '11px',
					padding: '13.5px 14px !important',
					'&::placeholder': {
						color: '#838588',
						opacity: 1,
					},
					'&:disabled': {
						'-webkit-text-fill-color': '#7F7F7F',
					},
					fontFamily: 'MinSans',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& > fieldset': {
						border: '1px solid #EFF0F2',
					},
					'&:active > fieldset': {
						border: '1px solid #E4E4E4 !important',
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
					'&:disabled': {
						color: '#000',
					},
					fontWeight: 500,
					maxWidth: '720px',
					'&:hover': {
						boxShadow: 'none',
					},
					padding: '11px 16px',
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					'&.Mui-checked': {
						color: '#7323FF',
					},
				},
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: {},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					'&:before': {
						backgroundColor: 'transparent',
					},
				},
			},
		},
	},
	palette: {
		mode: 'light',
		common: {
			black: '#000',
			white: '#fff',
		},
		primary: {
			main: '#6D6BD1',
		},
		secondary: {
			main: '#FF1744',
		},
		error: {
			main: '#FF1744',
		},
		warning: {
			main: '#FD5935',
		},
		info: {
			main: '#D9D9D9',
		},
		success: {
			main: '#4CAF50',
		},
		grey: {
			'50': '#F9F9F9',
			'100': '#EDEDED',
			'200': '#DCDCDC',
			'300': '#D9D9D9',
			'400': '#D4D4D4',
			'500': '#B5B5B5',
			'600': '#9E9E9E',
			'700': '#979797',
			'800': '#878787',
			'900': '#505050',
			A100: '#383838',
			A200: '#333333',
			A400: '#222222',
			A700: '#161616',
		},
		contrastThreshold: 3,
		tonalOffset: 0.2,
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.6)',
			disabled: 'rgba(0, 0, 0, 0.38)',
		},
		divider: 'rgba(0, 0, 0, 0.12)',
		background: {
			paper: '#fff',
			default: '#fff',
		},
		action: {
			active: 'rgba(0, 0, 0, 0.54)',
			hover: 'rgba(0, 0, 0, 0.04)',
			hoverOpacity: 0.04,
			selected: 'rgba(0, 0, 0, 0.08)',
			selectedOpacity: 0.08,
			disabled: 'rgba(0, 0, 0, 0.26)',
			disabledBackground: 'rgba(0, 0, 0, 0.12)',
			disabledOpacity: 0.38,
			focus: 'rgba(0, 0, 0, 0.12)',
			focusOpacity: 0.12,
			activatedOpacity: 0.12,
		},
	},
	shape: {
		borderRadius: 4,
	},
	zIndex: {
		mobileStepper: 1000,
		fab: 1050,
		speedDial: 1050,
		appBar: 1100,
		drawer: 1200,
		modal: 1300,
		snackbar: 1400,
		tooltip: 1500,
	},
	typography: {
		fontFamily: 'MinSans',
		htmlFontSize: 12.8,

		fontSize: 11.2,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		h1: {
			fontWeight: 400,
			fontSize: '24.8px',
			lineHeight: 1.167,
			'@media (min-width:0px)': {
				fontSize: '24.8px',
			},
			'@media (min-width:600px)': {
				fontSize: '24.8px',
			},
			'@media (min-width:900px)': {
				fontSize: '24.8px',
			},
			'@media (min-width:1260px)': {
				fontSize: '24.8px',
			},
			'@media (min-width:1536px)': {
				fontSize: '24.8px',
			},
		},
		h2: {
			fontWeight: 400,
			fontSize: '22.4px',
			lineHeight: 1.167,
			'@media (min-width:0px)': {
				fontSize: '22.4px',
			},
			'@media (min-width:600px)': {
				fontSize: '22.4px',
			},
			'@media (min-width:900px)': {
				fontSize: '22.4px',
			},
			'@media (min-width:1260px)': {
				fontSize: '22.4px',
			},
			'@media (min-width:1536px)': {
				fontSize: '22.4px',
			},
		},
		h3: {
			fontWeight: 400,
			fontSize: '20px',
			lineHeight: 1.167,
			'@media (min-width:0px)': {
				fontSize: '20px',
			},
			'@media (min-width:600px)': {
				fontSize: '20px',
			},
			'@media (min-width:900px)': {
				fontSize: '20px',
			},
			'@media (min-width:1260px)': {
				fontSize: '20px',
			},
			'@media (min-width:1536px)': {
				fontSize: '20px',
			},
		},
		h4: {
			fontWeight: 400,
			fontSize: '16.8px',
			lineHeight: 1.235,
			'@media (min-width:0px)': {
				fontSize: '16.8px',
			},
			'@media (min-width:600px)': {
				fontSize: '16.8px',
			},
			'@media (min-width:900px)': {
				fontSize: '16.8px',
			},
			'@media (min-width:1260px)': {
				fontSize: '16.8px',
			},
			'@media (min-width:1536px)': {
				fontSize: '16.8px',
			},
		},
		h5: {
			fontWeight: 400,
			fontSize: '15.2px',
			lineHeight: 1.334,
			'@media (min-width:0px)': {
				fontSize: '15.2px',
			},
			'@media (min-width:600px)': {
				fontSize: '15.2px',
			},
			'@media (min-width:900px)': {
				fontSize: '15.2px',
			},
			'@media (min-width:1260px)': {
				fontSize: '15.2px',
			},
			'@media (min-width:1536px)': {
				fontSize: '15.2px',
			},
		},
		h6: {
			fontWeight: 500,
			fontSize: '12.8px',
			lineHeight: 1.6,
			'@media (min-width:0px)': {
				fontSize: '12.8px',
			},
			'@media (min-width:600px)': {
				fontSize: '12.8px',
			},
			'@media (min-width:900px)': {
				fontSize: '12.8px',
			},
			'@media (min-width:1260px)': {
				fontSize: '12.8px',
			},
			'@media (min-width:1536px)': {
				fontSize: '12.8px',
			},
		},
		subtitle1: {
			fontWeight: 400,
			fontSize: '9.6px',
			lineHeight: 1.75,
			'@media (min-width:0px)': {
				fontSize: '9.6px',
			},
			'@media (min-width:600px)': {
				fontSize: '9.6px',
			},
			'@media (min-width:900px)': {
				fontSize: '9.6px',
			},
			'@media (min-width:1260px)': {
				fontSize: '9.6px',
			},
			'@media (min-width:1536px)': {
				fontSize: '9.6px',
			},
		},
		subtitle2: {
			fontWeight: 500,
			fontSize: '8.8px',
			lineHeight: 1.1,
			'@media (min-width:0px)': {
				fontSize: '8.8px',
			},
			'@media (min-width:600px)': {
				fontSize: '8.8px',
			},
			'@media (min-width:900px)': {
				fontSize: '8.8px',
			},
			'@media (min-width:1260px)': {
				fontSize: '8.8px',
			},
			'@media (min-width:1536px)': {
				fontSize: '8.8px',
			},
		},
		body1: {
			fontWeight: 400,
			fontSize: '11px',
			lineHeight: 1.1,
			'@media (min-width:0px)': {
				fontSize: '11px',
			},
			'@media (min-width:600px)': {
				fontSize: '11px',
			},
			'@media (min-width:900px)': {
				fontSize: '11px',
			},
			'@media (min-width:1260px)': {
				fontSize: '11px',
			},
			'@media (min-width:1536px)': {
				fontSize: '11px',
			},
		},
		body2: {
			fontWeight: 400,
			fontSize: '10.4px',
			lineHeight: 1,
			'@media (min-width:0px)': {
				fontSize: '10.4px',
			},
			'@media (min-width:600px)': {
				fontSize: '10.4px',
			},
			'@media (min-width:900px)': {
				fontSize: '10.4px',
			},
			'@media (min-width:1260px)': {
				fontSize: '10.4px',
			},
			'@media (min-width:1536px)': {
				fontSize: '10.4px',
			},
		},
		button: {
			fontWeight: 500,
			fontSize: '9.6px',
			lineHeight: 1.75,
			textTransform: 'uppercase',
			'@media (min-width:0px)': {
				fontSize: '9.6px',
			},
			'@media (min-width:600px)': {
				fontSize: '9.6px',
			},
			'@media (min-width:900px)': {
				fontSize: '9.6px',
			},
			'@media (min-width:1260px)': {
				fontSize: '9.6px',
			},
			'@media (min-width:1536px)': {
				fontSize: '9.6px',
			},
		},
		caption: {
			fontWeight: 400,
			fontSize: '7px',
			lineHeight: 1.66,
			'@media (min-width:0px)': {
				fontSize: '7px',
			},
			'@media (min-width:600px)': {
				fontSize: '7px',
			},
			'@media (min-width:900px)': {
				fontSize: '7px',
			},
			'@media (min-width:1260px)': {
				fontSize: '7px',
			},
			'@media (min-width:1536px)': {
				fontSize: '7px',
			},
		},
		overline: {
			fontWeight: 400,
			lineHeight: 2.66,
			textTransform: 'uppercase',
		},
	},
	mixins: {
		toolbar: {
			minHeight: 56,
			'@media (min-width:0px)': {
				'@media (orientation: landscape)': {
					minHeight: 48,
				},
			},
			'@media (min-width:600px)': {
				minHeight: 64,
			},
		},
	},
	shadows: [
		'none',
		'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
		'0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
		'0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
		'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
		'0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
		'0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
		'0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
		'0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
		'0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
		'0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
		'0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
		'0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
		'0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
		'0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
		'0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
		'0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
		'0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
		'0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
		'0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
		'0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
		'0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
		'0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
		'0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
		'0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
	],
	transitions: {
		easing: {
			easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
			easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
			easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
			sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
		},
		duration: {
			shortest: 150,
			shorter: 200,
			short: 250,
			standard: 300,
			complex: 375,
			enteringScreen: 225,
			leavingScreen: 195,
		},
	},
});

// 화면 크기에 따라 MUI 반응형 글꼴을 설정합니다.
themeConfig = responsiveFontSizes(themeConfig);

export { themeConfig };
