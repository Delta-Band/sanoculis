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
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  },
  typography: {
    fontFamily: ['Rubik', 'Domaine'].join(','),
    lineHeight: '1.8em',
    allVariants: {
      color: '#06003B'
    },
    body1: {
      fontSize: 20,
      [breakpoints.down('xs')]: {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(24)
      }
    },
    p: {
      padding: 0
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
      containedPrimary: {
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
