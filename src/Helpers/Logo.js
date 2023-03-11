// material-ui
import { useTheme } from "@mui/material/styles";

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
import logo from "../assets/pictures/logo.svg";

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  return <img loading="lazy" src={logo} alt="Berry" width="50" />;
};

export default Logo;
