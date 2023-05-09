import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
import Logo from "../../../Helpers/Logo";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <ButtonBase disableRipple component={Link} to={"/"}>
    <Logo size={150} />
  </ButtonBase>
);

export default LogoSection;
