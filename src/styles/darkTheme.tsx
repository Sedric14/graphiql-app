import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#000' },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: '600',
          ':hover': {
            color: '#b0c9fa',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(100, 100, 100, .5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff00',
          color: 'white',
          border: '3px solid white',
          ':hover': {
            backgroundColor: '#ffffff00',
            color: '#6495ed',
            border: '3px solid #6495ed',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#6495ed',
          border: '2px solid white',
          backgroundColor: '#ffffff18',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'white',
          border: '3px solid white',
          textDecorationColor: '#ffffff00',
          ':hover': {
            color: '#6495ed',
            border: '3px solid #6495ed',
          },
        },
      },
    },
  },
});

export default darkTheme;
