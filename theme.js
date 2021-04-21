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
      main: '#5667FF',
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
      fontSize: pxToRem(16),
      lineHeight: pxToRem(28),
      [breakpoints.down('xs')]: {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(24)
      }
    },
    p: {
      padding: 0,
      fontFamily: 'Rubik'
    },
    h1: {
      fontSize: pxToRem(42),
      fontFamily: 'Rubik'
    },
    h2: {
      fontSize: pxToRem(42),
      fontFamily: 'Domaine',
      fontWeight: 'bold',
      [breakpoints.down('xs')]: {
        fontSize: pxToRem(28)
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
        fontSize: 16
      },
      contained: {
        borderRadius: 25,
        '&:hover': {
          backgroundColor: '#4452bf'
        }
      }
      // contained: {
      //   '&:hover': {
      //     backgroundColor: 'rgba(86, 104, 255, 0.5)'
      //   }
      // }
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
      input: {
        // backgroundColor: 'white'
      }
    },
    MuiInputLabel: {
      outlined: {
        color: '#5668FF'
      }
    }
  },
  transition: '1s cubic-bezier(.21,.47,.49,.92)',
  mobileGutter: defaultTheme.spacing(5),
  fastTransition: '0.4s cubic-bezier(.21,.47,.49,.92)'
});

export default theme;
