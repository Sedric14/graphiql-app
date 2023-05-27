import { createTheme } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#e1e1e1' },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: '600',
          ':hover': {
            color: '#052157',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, .5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff00',
          fontWeight: '600',
          color: '#1c1c1c',
          border: '3px solid #1c1c1c',
          ':hover': {
            backgroundColor: '#ffffff00',
            color: '#083a96',
            border: '3px solid #083a96',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: '3px solid #000000',
          color: '#041e4f',
          fontWeight: 600,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: '#000000',
          border: '3px solid #1c1c1c',
          ':hover': {
            color: '#083a96',
            border: '3px solid #083a96',
          },
        },
      },
    },
  },
});

export default lightTheme;
