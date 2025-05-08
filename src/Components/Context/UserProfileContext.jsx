import React, { createContext, useContext, useState } from 'react';
import { useAxiosWithInterceptor } from '../Api/Axios';
import { useAuth } from './Context';

const UserProfileContext = createContext();

export const useUserProfile = () => useContext(UserProfileContext);

const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { auth = {} } = useAuth() || {};
  const api = useAxiosWithInterceptor();

  const getProfileDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/tsn/v1/user/user-info', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const userInfo = response.data.info;
      setUserProfile(userInfo);
    } catch (err) {
      console.error('Error fetching profile details:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        loading,
        error,
        getProfileDetails,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useAxiosWithInterceptor } from '../Api/Axios';
// import { useAuth } from './Context';

// const UserProfileContext = createContext();

// export const useUserProfile = () => useContext(UserProfileContext);

// const UserProfileProvider = ({ children }) => {
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const { auth = {} } = useAuth() || {};
//   const api = useAxiosWithInterceptor();

//   // Fetch user profile details from the API
//   const fetchUserProfile = async () => {
//     try {
//       if (!auth.accessToken) return;

//       setLoading(true);
//       setError(null);

//       const response = await api.get("/tsn/v1/user/user-info", {
//         headers: {
//           Authorization: auth.accessToken,
//         },
//       });

//       const userInfo = response.data.info;
//       console.log("Fetched User Profile Details:", userInfo);
//       setUserProfile(userInfo);
//     } catch (err) {
//       console.error("Error fetching user profile:", err);
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Effect to update the profile when `auth` context changes
//   useEffect(() => {
//     if (auth.userProfile) {
//       // If `auth` context already has the profile, update state directly
//       console.log("Updating profile from auth context");
//       setUserProfile(auth.userProfile);
//     } else if (auth.accessToken && !userProfile) {
//       // Fetch profile only if it's not already set
//       console.log("Fetching profile as it's not set");
//       fetchUserProfile();
//     }
//   }, [auth, userProfile]);

//   return (
//     <UserProfileContext.Provider
//       value={{
//         userProfile,
//         setUserProfile,
//         loading,
//         error,
//         fetchUserProfile,
//       }}
//     >
//       {children}
//     </UserProfileContext.Provider>
//   );
// };

// export default UserProfileProvider;


