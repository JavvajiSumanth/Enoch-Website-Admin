export default function themePalette(theme) {
  return {
    // mode: theme?.customization?.navType,
    mode: theme.mode,
    common: {
      black: theme.colors?.darkPaper,
    },
    ...getTheme(theme),
  };
}

const getTheme = (theme) => {
  if (theme.mode === 'light') {
    return {
      primary: {
        light: theme.colors?.primaryLight,
        main: theme.colors?.primaryMain,
        dark: theme.colors?.primaryDark,
        200: theme.colors?.primary200,
        800: theme.colors?.primary800,
      },
      secondary: {
        light: theme.colors?.secondaryLight,
        main: theme.colors?.secondaryMain,
        dark: theme.colors?.secondaryDark,
        200: theme.colors?.secondary200,
        800: theme.colors?.secondary800,
      },
      error: {
        light: theme.colors?.errorLight,
        main: theme.colors?.errorMain,
        dark: theme.colors?.errorDark,
      },
      orange: {
        light: theme.colors?.orangeLight,
        main: theme.colors?.orangeMain,
        dark: theme.colors?.orangeDark,
      },
      warning: {
        light: theme.colors?.warningLight,
        main: theme.colors?.warningMain,
        dark: theme.colors?.warningDark,
      },
      success: {
        light: theme.colors?.successLight,
        200: theme.colors?.success200,
        main: theme.colors?.successMain,
        dark: theme.colors?.successDark,
      },
      grey: {
        50: theme.colors?.grey50,
        100: theme.colors?.grey100,
        500: theme.darkTextSecondary,
        600: theme.heading,
        700: theme.darkTextPrimary,
        900: theme.textDark,
      },
      dark: {
        light: theme.colors?.darkTextPrimary,
        main: theme.colors?.darkLevel1,
        dark: theme.colors?.darkLevel2,
        800: theme.colors?.darkBackground,
        900: theme.colors?.darkPaper,
      },
      text: {
        primary: theme.darkTextPrimary,
        secondary: theme.darkTextSecondary,
        dark: theme.textDark,
        hint: theme.colors?.grey100,
      },
      background: {
        paper: theme.paper,
        default: theme.backgroundDefault,
      },
    };
  } else {
    return {
      primary: {
        light: theme.colors?.darkPrimaryLight,
        main: theme.colors?.darkPrimaryMain,
        dark: theme.colors?.darkPrimaryDark,
        200: theme.colors?.darkPrimary200,
        800: theme.colors?.darkPrimary800,
      },
      secondary: {
        light: theme.colors?.darkSecondaryLight,
        main: theme.colors?.darkSecondaryMain,
        dark: theme.colors?.darkSecondaryDark,
        200: theme.colors?.darkSecondary200,
        800: theme.colors?.darkSecondary800,
      },
      error: {
        light: theme.colors?.errorLight,
        main: theme.colors?.errorMain,
        dark: theme.colors?.errorDark,
      },
      orange: {
        light: theme.colors?.orangeLight,
        main: theme.colors?.orangeMain,
        dark: theme.colors?.orangeDark,
      },
      warning: {
        light: theme.colors?.warningLight,
        main: theme.colors?.warningMain,
        dark: theme.colors?.warningDark,
      },
      success: {
        light: theme.colors?.successLight,
        200: theme.colors?.success200,
        main: theme.colors?.successMain,
        dark: theme.colors?.successDark,
      },
      grey: {
        50: theme.colors?.grey50,
        100: theme.colors?.grey100,
        500: theme.darkTextSecondary,
        600: theme.heading,
        700: theme.darkTextPrimary,
        900: theme.textDark,
      },
      dark: {
        light: theme.colors?.darkTextPrimary,
        main: theme.colors?.darkLevel1,
        dark: theme.colors?.darkLevel2,
        800: theme.colors?.darkBackground,
        900: theme.colors?.darkPaper,
      },
      text: {
        primary: theme.darkTextPrimary,
        secondary: theme.darkTextSecondary,
        dark: theme.textDark,
        hint: theme.colors?.grey100,
      },
      background: {
        paper: theme.colors?.darkPaper,
        default: theme.colors?.darkBackground,
      },
    };
  }
};
