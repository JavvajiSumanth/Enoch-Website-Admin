import { createTheme } from '@mui/material/styles';

// assets
import colors from '../assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

export const setTheme = (mode) => {
  const themeOption = {
    ...parseColors(mode),
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '10px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default setTheme;

const parseColors = (mode) => {
  const color = colors;

  if (mode === 'light') {
    return {
      colors: color,
      heading: color.grey900,
      paper: color.paper,
      backgroundDefault: color.paper,
      background: color.primaryLight,
      darkTextPrimary: color.grey700,
      darkTextSecondary: color.grey500,
      textDark: color.grey900,
      menuSelected: color.secondaryDark,
      menuSelectedBack: color.secondaryLight,
      divider: color.grey200,
      mode,
    };
  } else {
    return {
      colors: color,
      heading: color.darkGrey900,
      paper: color.darkPaper,
      backgroundDefault: color.darkPaper,
      background: color.darkPrimaryLight,
      darkTextPrimary: color.darkGrey700,
      darkTextSecondary: color.darkGrey500,
      textDark: color.darkGrey900,
      menuSelected: color.darkSecondaryDark,
      menuSelectedBack: color.darkSecondaryLight,
      divider: color.darkGrey200,
      mode,
    };
  }
};
