import React from "react";
import ColorModeContextProvider from "./themes/colorModeContext";
import Routes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import NavigationScroll from "./Helpers/NavigationScroll";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ColorModeContextProvider>
      <AuthProvider>
        <NavigationScroll>
          <Toaster
            toastOptions={{
              duration: 5000,
            }}
          />
          <Routes />{" "}
        </NavigationScroll>
      </AuthProvider>
    </ColorModeContextProvider>
  );
}

export default App;
