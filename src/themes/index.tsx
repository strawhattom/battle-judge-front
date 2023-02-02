import { createTheme } from '@mui/material/styles';

/*
 * Le type Theme vient avec des propriétés de bases, on utilise la syntaxe en dessous
 * pour ajouter des propriétés (status...)
 */
declare module '@mui/material/styles' {
  interface Theme {
    status?: {
      orange?: string;
      black?: string;
      white?: string;
      green?: string;
      link?: string;
      red?: string;
      grey?: string;
    };
  }

  interface ThemeOptions {
    status?: {
      orange?: string;
      black?: string;
      white?: string;
      green?: string;
      link?: string;
      red?: string;
      grey?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ECECEC'
    },
    secondary: {
      main: '#000000'
    }
  },
  status: {
    orange: '#F67300',
    black: '#000000',
    white: '#FFFFFF',
    green: '#40CE4E',
    link: '#5CB5E8',
    red: '#D92D2D',
    grey: '#ECECEC'
  }
});

export default theme;
