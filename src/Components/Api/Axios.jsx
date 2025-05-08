// import { useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../Context/Context';
// import { useNavigate } from 'react-router-dom';

// const api = axios.create({
//   // baseURL: 'https://ec2-3-1-118-2.ap-southeast-1.compute.amazonaws.com:8081',
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
//   withCredentials: true,
// });

// // // Request Interceptor to Attach Token
// // api.interceptors.request.use(
// //     (config) => {
// //       const token = auth?.accessToken;
// //       if (token) {
// //         config.headers.Authorization = token;
// //       }
// //       return config;
// //     },
// //     (error) => Promise.reject(error)
// //   );

// export const useAxiosWithInterceptor = () => {
//   const { auth = {}, updateAuth } = useAuth() || {};
//   const navigate = useNavigate();


//   useEffect(() => {
//     const interceptor = api.interceptors.response.use(
//       response => response,
//       async (error) => {
//         if (error.response && error.response.status === 401) {
//           console.log("Token expired. Attempting to refresh...");
//           try {
//             const refreshResponse = await axios.post(
//               `${import.meta.env.VITE_API_BASE_URL}/tsn/v1/token`,
//               { refreshToken: auth.refreshToken },
//               {
//                 headers: {
//                   Authorization: auth.accessToken,
//                 },
//                 withCredentials: true,
//               }
//             );

//             const newAccessToken = refreshResponse.headers['access_token'];
//             const newRefreshToken = refreshResponse.headers['refresh-token'];

//             if (newAccessToken && newRefreshToken) {
//               updateAuth({ accessToken: newAccessToken, refreshToken: newRefreshToken });

//               error.config.headers['Authorization'] = newAccessToken;
//               return api(error.config);
//             } else {
//               throw new Error("Unable to refresh token");
//             }
//           } catch (refreshError) {
//             console.error("Token refresh failed", refreshError);
//             if(refreshError.response.status === 400 && refreshError.response.data.message === "Refresh token has already expired."){
//               updateAuth({ accessToken: "", refreshToken: "" })
//               navigate('/signin');
//             }
//           }
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup function: Eject interceptor on component unmount
//     return () => {
//       api.interceptors.response.eject(interceptor);
//     };
//   }, [auth.accessToken, auth.refreshToken, updateAuth, navigate]);

//   return api;
// };
// export default api;


/////////////////////////////////////////////////////////////////////////////////////////

// import { useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../Context/Context';
// import { useNavigate } from 'react-router-dom';

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
//   withCredentials: true,
// });

// export const useAxiosWithInterceptor = () => {
//   const { auth = {}, updateAuth } = useAuth() || {};
//   const navigate = useNavigate();

//   useEffect(() => {
//     let isRefreshing = false; // Tracks if a token refresh is in progress
//     let failedQueue = []; // Queue to store failed requests while token refresh is in progress

//     const processQueue = (error, token = null) => {
//       failedQueue.forEach((prom) => {
//         if (error) {
//           prom.reject(error);
//         } else {
//           prom.resolve(token);
//         }
//       });
//       failedQueue = [];
//     };

//     const interceptor = api.interceptors.response.use(
//       (response) => response, // Successful response passthrough
//       async (error) => {
//         const originalRequest = error.config;
//         // If 401 (Unauthorized), handle token refresh logic
//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//           if (isRefreshing) {
//             // Add the failed request to the queue while token refresh is in progress
//             return new Promise((resolve, reject) => {
//               failedQueue.push({ resolve, reject });
//             })
//               .then((newToken) => {
//                 originalRequest.headers['Authorization'] = newToken;
//                 return api(originalRequest); // Retry the original request
//               })
//               .catch((err) => Promise.reject(err));
//           }

//           originalRequest._retry = true; // Mark the request to avoid infinite loop
//           isRefreshing = true;

//           try {
//             console.log("Token expired. Attempting to refresh...");
//             const refreshResponse = await axios.post(
//               `${import.meta.env.VITE_API_BASE_URL}/tsn/v1/token`,
//               { refreshToken: auth.refreshToken },
//               {
//                 headers: { Authorization: auth.accessToken },
//                 withCredentials: true,
//               }
//             );

//             const newAccessToken = refreshResponse.headers['access_token'];
//             const newRefreshToken = refreshResponse.headers['refresh-token'];

//             if (newAccessToken && newRefreshToken) {
//               // Update tokens in context
//               updateAuth({ accessToken: newAccessToken, refreshToken: newRefreshToken });

//               processQueue(null, newAccessToken); // Retry queued requests
//               isRefreshing = false;

//               // Retry the original failed request
//               originalRequest.headers['Authorization'] = newAccessToken;
//               return api(originalRequest);
//             } else {
//               throw new Error("Unable to refresh token");
//             }
//           } catch (refreshError) {
//             console.error("Token refresh failed", refreshError);

//             // Clear auth and navigate to signin if refresh fails
//             updateAuth({ accessToken: "", refreshToken: "" });
//             processQueue(refreshError, null);
//             isRefreshing = false;

//             if (
//               refreshError.response &&
//               refreshError.response.status === 400 &&
//               refreshError.response.data.message === "Refresh token has already expired."
//             ) {
//               navigate('/signin');
//             }
//           }
//         }

//         // For errors other than 401 or refresh failure, reject the promise
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup function: Eject interceptor on component unmount
//     return () => {
//       api.interceptors.response.eject(interceptor);
//     };
//   }, [auth.accessToken, auth.refreshToken, updateAuth, navigate]);

//   return api;
// };

// export default api;


////////////////////////////////////////////////////////////////////////////////////////////
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useAuth } from '../Context/Context';
// import { useNavigate } from 'react-router-dom';

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
//   withCredentials: true,
// });

// export const useAxiosWithInterceptor = () => {
//   const { auth, updateAuth } = useAuth() || {};
//   const navigate = useNavigate();

//   useEffect(() => {
//     let isRefreshing = false;
//     let failedQueue = [];

//     const processQueue = (error, token = null) => {
//       failedQueue.forEach((prom) => {
//         if (error) {
//           prom.reject(error);
//         } else {
//           prom.resolve(token);
//         }
//       });
//       failedQueue = [];
//     };

//     const addAuthHeader = (config, token) => {
//       if (token) {
//         config.headers['Authorization'] = ` ${token}`;
//       }
//       return config;
//     };

//     const interceptor = api.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//           if (!auth?.refreshToken) {
//             return Promise.reject(error);
//           }

//           if (isRefreshing) {
//             // Queue the failed requests until token is refreshed
//             return new Promise((resolve, reject) => {
//               failedQueue.push({ resolve, reject });
//             })
//               .then((newToken) => {
//                 // Retry the original request with the new token
//                 return api(addAuthHeader(originalRequest, newToken));
//               })
//               .catch((err) => Promise.reject(err));
//           }

//           originalRequest._retry = true;
//           isRefreshing = true;

//           try {
//             // Refresh the token
//             const refreshResponse = await axios.post(
//               `${import.meta.env.VITE_API_BASE_URL}/tsn/v1/token`,
//               { refreshToken: auth.refreshToken },
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//               }
//             );

//             const newAccessToken = refreshResponse.headers['access_token'];
//             const newRefreshToken = refreshResponse.headers['refresh-token'];

//             if (newAccessToken && newRefreshToken) {
//               // Update auth state with new tokens
//               updateAuth({ accessToken: newAccessToken, refreshToken: newRefreshToken });

//               // Process queued requests with the new token
//               processQueue(null, newAccessToken);
//               isRefreshing = false;

//               // Retry the original request with the new token
//               return api(addAuthHeader(originalRequest, newAccessToken));
//             } else {
//               throw new Error("Token refresh failed: no tokens returned");
//             }
//           } catch (refreshError) {
//             console.error("Token refresh failed", refreshError);

//             // Process queued requests with an error
//             processQueue(refreshError, null);
//             isRefreshing = false;

//             // Log out the user
//             updateAuth({ accessToken: "", refreshToken: "" });
//             navigate('/signin');
//             return Promise.reject(refreshError);
//           }
//         }

//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       api.interceptors.response.eject(interceptor);
//     };
//   }, [auth, updateAuth, navigate]);

//   return api;
// };

// export default api;

/////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
});

export const useAxiosWithInterceptor = () => {
  const { auth, updateAuth } = useAuth() || {};
  const navigate = useNavigate();

  useEffect(() => {
    let isRefreshing = false;
    let failedQueue = [];

    const processQueue = (error, token = null) => {
      failedQueue.forEach((prom) => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });
      failedQueue = [];
    };

    const addAuthHeader = (config, token) => {
      if (token) {
        config.headers['Authorization'] = ` ${token}`;
      }
      return config;
    };

    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Check if it's a logout request and prevent retry
        if (originalRequest.isLogoutRequest) {
          return Promise.reject(error);  // Don't retry logout requests
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (!auth?.refreshToken) {
            return Promise.reject(error);
          }

          if (isRefreshing) {
            // Queue the failed requests until token is refreshed
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((newToken) => {
                // Retry the original request with the new token
                return api(addAuthHeader(originalRequest, newToken));
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            // Refresh the token
            const refreshResponse = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/tsn/v1/token`,
              { refreshToken: auth.refreshToken },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            const newAccessToken = refreshResponse.headers['access_token'];
            const newRefreshToken = refreshResponse.headers['refresh-token'];

            if (newAccessToken && newRefreshToken) {
              // Update auth state with new tokens
              updateAuth({ accessToken: newAccessToken, refreshToken: newRefreshToken });

              // Process queued requests with the new token
              processQueue(null, newAccessToken);
              isRefreshing = false;

              // Retry the original request with the new token
              return api(addAuthHeader(originalRequest, newAccessToken));
            } else {
              throw new Error("Token refresh failed: no tokens returned");
            }
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);

            // Process queued requests with an error
            processQueue(refreshError, null);
            isRefreshing = false;

            // Log out the user
            updateAuth({ accessToken: "", refreshToken: "" });
            navigate('/signin');
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [auth, updateAuth, navigate]);

  return api;
};

export default api;


