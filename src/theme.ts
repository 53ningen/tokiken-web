import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F06071',
    },
    secondary: {
      main: '#F4C2C3',
    },
    background: {
      default: '#fff',
    },
    error: {
      main: '#FD526C',
    },
    info: {
      main: '#535F75',
      contrastText: '#ffffff',
    },
    twitter: {
      main: '#26a7de',
      contrastText: '#ffffff',
    },
    amazon: {
      main: '#DE8E78',
      contrastText: '#ffffff',
    },
    tokisen: {
      main: '#F19937',
      contrastText: '#ffffff',
    },
    kanami: {
      main: '#69B0CB',
      contrastText: '#ffffff',
    },
    julia: {
      main: '#8E5AB4',
      contrastText: '#ffffff',
    },
    hitoka: {
      main: '#D75750',
      contrastText: '#ffffff',
    },
    haruka: {
      main: '#E292B4',
      contrastText: '#ffffff',
    },
    aki: {
      main: '#E9CC48',
      contrastText: '#ffffff',
    },
    hiyori: {
      main: '#5D9767',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontSize: 14,
    fontWeightRegular: 500,
    fontFamily: ['Noto Sans JP'].join(','),
    h1: {
      fontSize: 22,
      fontWeight: 700,
      overflowWrap: 'anywhere',
    },
    h2: {
      fontSize: 20,
      fontWeight: 700,
      overflowWrap: 'anywhere',
    },
    h3: {
      fontSize: 18,
      fontWeight: 700,
      overflowWrap: 'anywhere',
    },
    h4: {
      fontSize: 16,
      fontWeight: 700,
      overflowWrap: 'anywhere',
    },
    h5: {
      fontSize: 16,
      fontWeight: 500,
      overflowWrap: 'anywhere',
    },
    h6: {
      fontSize: 14,
      fontWeight: 500,
      overflowWrap: 'anywhere',
    },
    body1: {
      overflowWrap: 'anywhere',
    },
    button: {
      textTransform: 'none',
    },
    caption: {
      fontSize: 12,
      color: 'GrayText',
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 700,
      wordBreak: 'break-word',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiListItem: {
      defaultProps: {
        style: {
          paddingLeft: 0,
        },
      },
    },
    MuiListSubheader: {
      defaultProps: {
        style: {
          paddingLeft: 0,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        square: false,
        variant: 'outlined',
        elevation: 0,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
})

export default theme
