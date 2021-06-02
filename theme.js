import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();
const {
  breakpoints,
  typography: { pxToRem }
} = defaultTheme;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#6172FF',
      dark: '#07003C',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#FFF',
      dark: '#FFDACE',
      contrastText: '#07003C'
    }
  },
  typography: {
    fontFamily: ['Rubik', 'Domaine'].join(','),
    lineHeight: '1.8em',
    allVariants: {
      color: '#07003C',
      fontFamily: 'Rubik'
    },
    body1: {
      fontSize: 16,
      lineHeight: '24px',
      [breakpoints.up('sm')]: {
        fontSize: 17,
        lineHeight: '26px'
      },
      [breakpoints.up('xl')]: {
        fontSize: 19,
        lineHeight: '28px'
      }
    },
    body2: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(20)
    },
    p: {
      padding: 0,
      fontFamily: 'Rubik'
    },
    h1: {
      fontSize: 42,
      fontFamily: 'Rubik'
    },
    h2: {
      fontSize: 28,
      fontFamily: 'Domaine',
      fontWeight: 'bold',
      [breakpoints.up('xl')]: {
        fontSize: 42
      }
    },
    h3: {
      fontSize: '30px',
      lineHeight: '44px',
      fontFamily: 'Rubik',
      fontWeight: 500,
      [breakpoints.up('sm')]: {
        fontSize: '34px',
        lineHeight: '48px'
      }
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Rubik']
      }
    },
    MuiLink: {
      underlineHover: {
        textDecoration: 'underline'
      }
    },
    MuiButton: {
      label: {
        fontSize: 14,
        fontWeight: 400,
        [breakpoints.up('sm')]: {
          fontSize: 16
        }
      },
      contained: {
        borderRadius: 25,
        '&:hover': {
          backgroundColor: '#4452bf'
        }
      },
      outlined: {
        borderRadius: 25
      },
      containedSizeLarge: {
        paddingLeft: 20,
        paddingRight: 20,
        [breakpoints.up('sm')]: {
          paddingLeft: 50,
          paddingRight: 50
        }
      }
      // contained: {
      //   '&:hover': {
      //     backgroundColor: 'rgba(86, 104, 255, 0.5)'
      //   }
      // }
    },
    MuiFilledInput: {
      root: {
        // backgroundColor: '#FFF',
        borderRadius: 0,
        '&:hover': {
          // backgroundColor: '#FFF !important'
        }
      }
    },
    MuiTextField: {
      root: {
        // backgroundColor: '#FFF',
        borderRadius: 0
      }
    },
    MuiRadio: {
      root: {
        color: 'white'
      },
      colorPrimary: {
        color: 'white !important'
      }
    },
    MuiFormControlLabel: {
      label: {
        color: 'white'
      }
    },
    MuiOutlinedInput: {
      root: {
        // backgroundColor: '#FFF'
      }
    },
    MuiInputLabel: {
      outlined: {
        // color: '#5668FF'
      }
    },
    MuiAccordionSummary: {
      root: {
        backgroundColor: '#FFDACE',
        '&.Mui-expanded': {
          minHeight: 48
        }
      },
      content: {
        '&.Mui-expanded': {
          margin: '12px 0'
        }
      }
    },
    MuiAccordionDetails: {
      root: {
        backgroundColor: '#FFDACE'
      }
    }
  },
  transition: '1s cubic-bezier(.21,.47,.49,.92)',
  mobileGutter: defaultTheme.spacing(5),
  fastTransition: '0.4s cubic-bezier(.21,.47,.49,.92)'
});

export default theme;
