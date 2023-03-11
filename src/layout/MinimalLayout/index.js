import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// project imports
// import Customization from "../Customization";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};

export default MinimalLayout;
