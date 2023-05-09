import logo from "../assets/images/logo.png";

const Logo = ({ size }) => {
  return <img loading="lazy" src={logo} alt="Berry" width={size} />;
};

export default Logo;
