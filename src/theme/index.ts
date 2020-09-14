import { createMuiTheme } from '@material-ui/core';
import { indigo, yellow } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto Slab, Roboto, sans-serif, serif',
  },
  palette: {
    type: 'dark',
    primary: indigo,
    secondary: yellow,
  },
});

export default theme;
