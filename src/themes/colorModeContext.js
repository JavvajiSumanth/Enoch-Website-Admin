import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import setTheme from ".";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function ColorModeContextProvider({ children }) {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => {
    return setTheme(mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </ColorModeContext.Provider>
  );
}
