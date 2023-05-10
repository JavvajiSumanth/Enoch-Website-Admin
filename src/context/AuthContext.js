import React, { useEffect, useRef, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Loader from "../Helpers/Loader";
import { collection, getDocs } from "firebase/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  // const location = useLocation();
  const timeout = useRef();
  console.log("AuthProvider", { isLoading });

  async function login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        navigate("/");
      }
      return true;
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      setErrorMessage("Invalid Email/Password");
      return false;
    }
  }

  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Sucessfull");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setIsAuthenticated(true);
        setUser({
          uid: user.uid,
          email: user.email,
          firstName: "Admin",
          lastName: "Admin",
          role: "ADMIN",
        });
      } else {
        setIsAuthenticated(false);
        console.log("😢 We are not authenticated!");
      }
      setIsLoading(false);
    });
    return () => {
      subscription();
      clearTimeout(timeout.current);
    };
  }, []);

  const setErrorMessage = (err) => {
    setError(err);
    if (timeout.current) {
      console.log(timeout.current);
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchedProperties = [];

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "properties"));
      querySnapshot.forEach((doc) => {
        fetchedProperties.push(doc.data());
      });
      setProperties(fetchedProperties);
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signOutUser,
        login,
        error,
        properties,
        setProperties,
        setErrorMessage,
      }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};
