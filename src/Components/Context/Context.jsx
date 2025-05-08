import React, { useState, useEffect, useContext, createContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { useUserProfile } from "../Context/UserProfileContext";
import { useAxiosWithInterceptor } from "../Api/Axios";
import Snackbar from "awesome-snackbar";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const api = useAxiosWithInterceptor()
  const isInitialMount = useRef(true);
  const prevTokenRef = useRef("");

  const { setUserProfile } = useUserProfile() || {};  // Safe check if undefined

  const [auth, setAuth] = useState(() => {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    let decodedToken = null;

    // parsing the jwt token using jwtDecode
    try {
      if (accessToken) {
        decodedToken = jwtDecode(accessToken);
        console.log(decodedToken)
      }
    } catch (error) {
      console.error("Error decoding token", error);
    }

    // Extract necessary fields from the decoded token
    return {
      accessToken: accessToken || "",
      refreshToken: refreshToken || "",
      email: decodedToken?.email || "",
      username: decodedToken?.username || "",
      authorities: decodedToken?.authorities || [],
    };
  });

  // useEffect(() => {
  //   if (auth.accessToken) {
  //     axios.defaults.headers.common["Authorization"] = `${auth.accessToken}`;
  //     fetchUserProfile();
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  // }, [auth.accessToken]);

  useEffect(() => {
    if (auth.accessToken) {
      axios.defaults.headers.common["Authorization"] = `${auth.accessToken}`;
      
      // Fetch profile if it's initial mount OR if we're getting a new token after having no token
      if (isInitialMount.current || (!prevTokenRef.current && auth.accessToken)) {
        console.log("Fetching profile - new login or initial mount");
        fetchUserProfile();
        isInitialMount.current = false;
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    
    // Update previous token reference
    prevTokenRef.current = auth.accessToken;
  }, [auth.accessToken]);

  const fetchUserProfile = async () => {
    try {
      if (!auth.accessToken) return;

      const response = await api.get("/tsn/v1/user/user-info", {
        headers: {
          Authorization: auth.accessToken,
        },
      });

      console.log("Context response for fetching user details:", response);

      const userInfo = response.data.info;

      if (typeof setUserProfile === "function") {
        setUserProfile(userInfo);
      } else {
        // Optional: Handle case where setUserProfile is not a function
      }
    } catch (error) {
      console.error("Error fetching user profile in context:", error);
    }
  };

  const updateAuth = (newAuth) => {
    setAuth(prevAuth => {
      const updatedAuth = {
        ...prevAuth,
        ...newAuth,
      };

      if (newAuth.accessToken) {
        localStorage.setItem("token", newAuth.accessToken);
        // // try {
        // //   const decoded = jwtDecode(newAuth.accessToken);
        // //   updatedAuth.email = decoded?.email;
        // //   updatedAuth.username = decoded?.username;
        // //   updatedAuth.authorities = decoded?.authorities || [];
        // // } catch (error) {
        // //   console.error("Error decoding token", error);
        // }
      } else {
        localStorage.removeItem("token");
      }

      if (newAuth.refreshToken) {
        localStorage.setItem("refreshToken", newAuth.refreshToken);
      } else {
        localStorage.removeItem("refreshToken");
      }
      return updatedAuth;
    });
  };


  const handleLogout = async () => {
    try {
      const response = await api.post(
        `/tsn/v1/user/signOut`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": auth.accessToken,
          },
        }
      );
      if (response.status === 200) {
        updateAuth({ accessToken: "", refreshToken: "" });
        new Snackbar(`Log out successful`, {
          position: 'top-center', timeout: 1000,
          style: {
            container: [
              ['background-color', '#D91656'],
              ['border-radius', '5px']
            ],
          }
        });
        navigate("/");
      }
      setUserProfile("")
    } catch (error) {
      console.error("Logout error:", error);
      if (error.response) {
        alert("Error logging out. Please try again.");
      } else if (error.request) {
        alert("Network error. Please check your connection.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  
  return (
    <AuthContext.Provider value={{ auth, updateAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };


