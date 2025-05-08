
// // import React, { useEffect, useState } from 'react';
// // import { Box, Card, CardHeader, CardContent, Grid, TextField, Button, Avatar, Chip, Alert, Typography, CircularProgress, InputAdornment } from '@mui/material';
// // import { Mail as MailIcon, Phone as PhoneIcon } from 'lucide-react';
// // import { useUserProfile } from './Context/UserProfileContext';
// // import Layout from "../../src/Components/Layout/Layout";
// // import { useAxiosWithInterceptor } from './Api/Axios';
// // import { useAuth } from './Context/Context';
// // import EditIcon from '@mui/icons-material/Edit';
// // import toast from 'react-hot-toast';

// import React, { useEffect, useState } from 'react';
// import { 
//   Box, 
//   Card, 
//   CardHeader, 
//   CardContent, 
//   Grid, 
//   TextField, 
//   Button, 
//   Avatar, 
//   Chip, 
//   Alert, 
//   Typography, 
//   CircularProgress,
//   Paper,
//   Divider,
//   Container,
//   IconButton,
//   Stack,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import { InfoIcon, Mail as MailIcon, Phone as PhoneIcon } from 'lucide-react';
// import { useUserProfile } from './Context/UserProfileContext';
// import Layout from "../../src/Components/Layout/Layout";
// import { useAxiosWithInterceptor } from './Api/Axios';
// import { useAuth } from './Context/Context';
// import EditIcon from '@mui/icons-material/Edit';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import toast from 'react-hot-toast';
// import { textDecoration } from '@chakra-ui/react';
// import { Helmet } from 'react-helmet-async';
// import { MobileFriendly } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const EditProfile = () => {
//   const { userProfile, loading, getProfileDetails, error} = useUserProfile();
//   const [updatePhoneNumber,setUpdatePhoneNumber] = useState(userProfile?.phoneNumber.split('_')[0])
//   const [updateFirstName, setUpdateFirstName] = useState('');
//   const [updateLastName, setUpdateLastName] = useState('');
//   const [updateEmail, setUpdateEmail] = useState('');
//   const [resendAttemptsLeft, setResendAttemptsLeft] = useState(userProfile?.phoneNumberVerificationResendAttemtsLeft);
//   const [isEditable, setIsEditable] = useState(false);
//     const api = useAxiosWithInterceptor()
//     const {auth} = useAuth()
//     const navigate = useNavigate()

//     const firstLetter = userProfile?.firstName ? userProfile.firstName.charAt(0).toUpperCase() : '';


//     // form handling
//     useEffect(() => {
//         setUpdatePhoneNumber(userProfile?.googleUser ? '**********' : userProfile?.phoneNumber);
//         setUpdateFirstName(userProfile?.firstName || '');
//         setUpdateLastName(userProfile?.lastName || '');
//         setUpdateEmail(userProfile?.email || '');
//       }, [userProfile]);

//       const handleEdit = (e) => {
//         e.preventDefault(); 
//         setIsEditable(true); 
//       };


//     // const handleUpdateProfile = async () => {
//     //     // Check if any field has been altered
//     //     if (
//     //       updateFirstName === userProfile?.firstName &&
//     //       updateLastName === userProfile?.lastName &&
//     //       updateEmail === userProfile?.email &&
//     //       updatePhoneNumber === userProfile?.phoneNumber
//     //     ) {
//     //       toast.success("Details are up to date.", { duration: 3000, id: "details" });
//     //       return; 
//     //     }

//     //     // Track if confirmation is required for email or phone number
//     //     let showEmailConfirmation = false;
//     //     let showPhoneConfirmation = false;

//     //     // Determine which popups need to be shown
//     //     if (updateEmail !== userProfile?.email) {
//     //       showEmailConfirmation = true;
//     //     }

//     //     if (updatePhoneNumber !== userProfile?.phoneNumber) {
//     //       showPhoneConfirmation = true;
//     //     }

//     //     if (showEmailConfirmation && showPhoneConfirmation) {
//     //       // Show combined popup for both email and phone
//     //       const confirmation = await Swal.fire({
//     //         title: "Confirm Changes",
//     //         text: "You have updated your email and phone number. After the update, you will need to log in again and verify your details. Do you want to proceed?",
//     //         icon: "warning",
//     //         showCancelButton: true,
//     //         confirmButtonText: "Update",
//     //         cancelButtonText: "Cancel",
//     //       });

//     //       if (!confirmation.isConfirmed) {
//     //         setUpdateEmail(userProfile?.email);
//     //         setUpdatePhoneNumber(userProfile?.phoneNumber);
//     //         return; 
//     //       }
//     //     } else if (showEmailConfirmation) {
//     //       // Show popup for email only
//     //       const confirmation = await Swal.fire({
//     //         title: "Confirm Email Change",
//     //         text: "You have changed your email. After the update, your email requires re-login and verification of the new email. Do you want to continue?",
//     //         icon: "warning",
//     //         showCancelButton: true,
//     //         confirmButtonText: "Update",
//     //         cancelButtonText: "Cancel",
//     //       });

//     //       if (!confirmation.isConfirmed) {
//     //         setUpdateEmail(userProfile?.email);
//     //         return; 
//     //       }
//     //     } else if (showPhoneConfirmation) {
//     //       // Show popup for phone number only
//     //       const confirmation = await Swal.fire({
//     //         title: "Confirm Phone Number Change",
//     //         text: "You have changed your phone number. After the update, your phone number requires verification of the new number. Do you want to continue?",
//     //         icon: "warning",
//     //         showCancelButton: true,
//     //         confirmButtonText: "Update",
//     //         cancelButtonText: "Cancel",
//     //       });

//     //       if (!confirmation.isConfirmed) {
//     //         setUpdatePhoneNumber(userProfile?.phoneNumber);
//     //         return; 
//     //       }
//     //     }

//     //     // Proceed with the API call
//     //     try {
//     //       const isEmailUpdated = updateEmail !== userProfile?.email;

//     //       const response = await api.put(
//     //         '/tsn/v1/user/update-user-profile',
//     //         {
//     //           firstName: updateFirstName,
//     //           lastName: updateLastName,
//     //           email: updateEmail,
//     //           phoneNumber: updatePhoneNumber,
//     //         },
//     //         {
//     //           headers: {
//     //             "Content-Type": "application/json",
//     //             Authorization: auth.accessToken,
//     //           },
//     //         }
//     //       );

//     //       // Success message
//     //       Swal.fire({
//     //         title: "Success",
//     //         text: "Profile updated successfully!",
//     //         icon: "success",
//     //       });

//     //       setIsEditable(false); // Lock the fields after successful update

//     //       // Log out the user if only the email was updated
//     //       if (isEmailUpdated) {
//     //         Swal.fire({
//     //           title: "Email Updated",
//     //           text: "Your email has been updated. You will be logged out now to verify your new email.",
//     //           icon: "info",
//     //         }).then(() => {
//     //           console.log("user logged out because new emmail updated")
//     //         });
//     //       }
//     //     } catch (error) {
//     //       Swal.fire({
//     //         title: "Error",
//     //         text: error.response?.data?.message || "An unknown error occurred. Please try again.",
//     //         icon: "error",
//     //       });
//     //     }
//     //   };

//     const handleUpdateProfile = async () => {
//       // Check if any field has been altered
//       if (
//         updateFirstName === userProfile?.firstName &&
//         updateLastName === userProfile?.lastName &&
//         updateEmail === userProfile?.email &&
//         updatePhoneNumber === userProfile?.phoneNumber
//       ) {
//         toast.success("Details are up to date.", { duration: 3000, id: "details" });
//         return;
//       }

//       // Track if confirmation is required for email or phone number
//       let showEmailConfirmation = false;
//       let showPhoneConfirmation = false;

//       // Determine which popups need to be shown
//       if (updateEmail !== userProfile?.email) {
//         showEmailConfirmation = true;
//       }

//       if (updatePhoneNumber !== userProfile?.phoneNumber) {
//         showPhoneConfirmation = true;
//       }

//       try {
//         // Handle combined email and phone confirmation
//         if (showEmailConfirmation && showPhoneConfirmation) {
//           const confirmation = await Swal.fire({
//             title: "Confirm Changes",
//             text: "You have updated your email and phone number. After the update, you will need to log in again and verify your details. Do you want to proceed?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Update",
//             cancelButtonText: "Cancel",
//           });

//           if (!confirmation.isConfirmed) {
//             setUpdateEmail(userProfile?.email);
//             setUpdatePhoneNumber(userProfile?.phoneNumber);
//             return;
//           }
//         } else if (showEmailConfirmation) {
//           const confirmation = await Swal.fire({
//             title: "Confirm Email Change",
//             text: "You have changed your email. After the update, your email requires re-login and verification of the new email. Do you want to continue?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Update",
//             cancelButtonText: "Cancel",
//           });

//           if (!confirmation.isConfirmed) {
//             setUpdateEmail(userProfile?.email);
//             return;
//           }
//         } else if (showPhoneConfirmation) {
//           const confirmation = await Swal.fire({
//             title: "Confirm Phone Number Change",
//             text: "You have changed your phone number. After the update, your phone number requires verification of the new number. Do you want to continue?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Update",
//             cancelButtonText: "Cancel",
//           });

//           if (!confirmation.isConfirmed) {
//             setUpdatePhoneNumber(userProfile?.phoneNumber);
//             return;
//           }
//         }

//         // Show loader while making the API call
//         Swal.fire({
//           title: "Processing...",
//           text: "Please wait while we update your profile.",
//           allowOutsideClick: false,
//           allowEscapeKey: false,
//           showConfirmButton: false,
//           didOpen: () => {
//             Swal.showLoading();
//           },
//         });

//         // Proceed with the API call
//         const isEmailUpdated = updateEmail !== userProfile?.email;
//         const response = await api.put(
//           "/tsn/v1/user/update-user-profile",
//           {
//             firstName: updateFirstName,
//             lastName: updateLastName,
//             email: updateEmail,
//             phoneNumber: updatePhoneNumber,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: auth.accessToken,
//             },
//           }
//         );

//         // Close the loader and show success message
//         Swal.close();
//         Swal.fire({
//           title: "Success",
//           text: "Profile updated successfully!",
//           icon: "success",
//         });
//         getProfileDetails()
//         setIsEditable(false); // Lock the fields after a successful update

//         // Log out the user if only the email was updated
//         if (isEmailUpdated) {
//           Swal.fire({
//             title: "Email Updated",
//             text: "Your email has been updated. You will be logged out now to verify your new email.",
//             icon: "info",
//           }).then(() => {
//             // handleLogout()
//             localStorage.removeItem("token")
//             localStorage.removeItem("refreshToken")
//             navigate("/signin")

//           });
//         }
//       } catch (error) {
//         // Close the loader and show an error message
//         Swal.close();
//         Swal.fire({
//           title: "Error",
//           text: error.response?.data?.message || "An unknown error occurred. Please try again.",
//           icon: "error",
//         });
//       }
//     };



//   const sendEmailVerification = async () => {
//     console.log("Sending email verification link...");
//     try {
//         const response = await api.post(
//             `/tsn/v1/email/send-verification-mail`,
//             {}, 
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: auth.accessToken,
//                 }
//             }
//         );
//         console.log("User response:", response);
//     } catch (error) {
//         console.error("Error sending verification email:", error);
//         if (error.response) {
//             console.log("Status:", error.response.status); 
//             console.log("Data:", error.response.data);
//         }
//     }
// };


//     const sendMobileVerification = async () => {  
//         try {
//             // Sending OTP request to the backend
//             const response = await api.post(
//                 `/tsn/v1/otp/send-otp`,
//                 {},
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization:auth?.accessToken
//                     }
//                 }
//             );
//             console.log("OTP sent successfully:", response);

//             // Prompt user for OTP input
//             Swal.fire({
//                 title: "Enter OTP",
//                 input: "text",
//                 inputAttributes: {
//                     autocapitalize: "off",
//                 },
//                 showCancelButton: true,
//                 confirmButtonText: "Verify",
//                 showLoaderOnConfirm: true,
//                 preConfirm: async (otp) => {
//                     try {
//                         // Here, replace with an actual OTP verification API call
//                         const verifyResponse = await api.put(
//                             `/tsn/v1/otp/verify-otp`,
//                             { otp },
//                             {
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                     // Authorization:auth?.accessToken
//                                 }
//                             }
//                         );
//                         console.log("OTP verification successful:", verifyResponse);
//                         getProfileDetails()
//                         return verifyResponse.data;
//                     } catch (error) {
//                         Swal.showValidationMessage(`Verification failed: ${error.message}`);
//                     }
//                 },
//                 allowOutsideClick: () => !Swal.isLoading(),
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     Swal.fire({
//                         title: "OTP Verified Successfully!",
//                         icon: "success",
//                     });
//                 } else {
//                     Swal.fire({
//                         title: "OTP Verification Cancelled",
//                         icon: "info",
//                     });
//                 }
//             });
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             Swal.fire({
//                 title: "Error",
//                 text: error.response?.data?.message,
//                 icon: "error",
//             });
//         }
//     };

//     return (
//       <Layout>
//         <Helmet>
//         <title>My profile</title>
//       </Helmet>
//       <Box 
//         sx={{ 
//           bgcolor: '#f5f5f5',
//           minHeight: '100vh',
//           py: 4
//         }}
//       >
//         <Container maxWidth="lg">
//           {/* Page Header */}
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="h4" sx={{ fontWeight: 600, color: '#2c3e50' }}>
//               Profile Settings
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
//               Manage your account settings and verification status
//             </Typography>
//           </Box>

//           <Grid container spacing={3}>
//             {/* Left Column - Profile Overview */}
//             <Grid item xs={12} md={4}>
//               <Card 
//                 elevation={0} 
//                 sx={{ 
//                   bgcolor: 'white',
//                   borderRadius: 3,
//                   height: '100%',
//                   border: '1px solid',
//                   borderColor: 'divider'
//                 }}
//               >
//                 <Box
//                   sx={{
//                     p: 3,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     borderBottom: '1px solid',
//                     borderColor: 'divider',
//                     bgcolor: (theme) => theme.palette.primary.main,
//                     borderRadius: '12px 12px 0 0',
//                     color: 'white'
//                   }}
//                 >
//                   {/* <Avatar
//                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//                     alt="User Avatar"
//                     sx={{
//                       width: 120,
//                       height: 120,
//                       border: '4px solid white',
//                       boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                       mb: 2
//                     }}
//                     hiii
//                   /> */}
//         <Avatar
//           sx={{
//             width: 120,
//             height: 120,
//             border: '4px solid white',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//             mb: 1,
//             fontSize:"75px",
//             background:"#1F509A"
//           }}
//         >
//           { userProfile?.profilePicLink ? <img className="w-100" src={userProfile?.profilePicLink} alt='user_profile'/> : firstLetter }
//         </Avatar>
//                   <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
//                     {userProfile?.firstName} {userProfile?.lastName}
//                   </Typography>
//                   <Chip
//                     label={!userProfile?.phoneNumberVerified || !userProfile?.emailVerified ? 'Unverified Account' : 'Verified Account'}
//                     color={!userProfile?.phoneNumberVerified || !userProfile?.emailVerified ? 'error' : 'success'}
//                     icon={<VerifiedUserIcon />}
//                     sx={{ 
//                       borderRadius: '16px',
//                       px: 1,
//                       '& .MuiChip-icon': { color: 'inherit' }
//                     }}
//                   />
//                 </Box>

//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//                     Verification Status
//                   </Typography>
//                   <Stack spacing={2}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <MailIcon size={20} />
//                       <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                         Email Status
//                       </Typography>

//                       <Chip
//                         size="small"
//                         label={userProfile?.emailVerified ? 'Verified' : 'unverified'}
//                         color={userProfile?.emailVerified ? 'success' : 'error'}
//                       />
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <PhoneIcon size={20} />
//                       <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                         Phone Status
//                       </Typography>


//                       <Chip
//                         size="small"
//                         label={userProfile?.phoneNumberVerified ? 'Verified' : 'unverified'}
//                         color={userProfile?.phoneNumberVerified ? 'success' : 'error'}
//                       />
//                     </Box>
//                   </Stack>
//                 </Box>
//               </Card>
//             </Grid>

//             {/* Right Column - Edit Form */}
//             <Grid item xs={12} md={8}>
//               {loading ? (
//                 <Card 
//                   elevation={0}
//                   sx={{ 
//                     p: 4, 
//                     display: 'flex', 
//                     justifyContent: 'center', 
//                     alignItems: 'center',
//                     minHeight: 400,
//                     borderRadius: 3,
//                     border: '1px solid',
//                     borderColor: 'divider'
//                   }}
//                 >
//                   <Box sx={{ textAlign: 'center' }}>
//                     <CircularProgress size={60} thickness={4} />
//                     <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
//                       Loading your profile...
//                     </Typography>
//                   </Box>
//                 </Card>
//               ) : (
//                 <Stack spacing={3}>
//                   {/* Profile Information Card */}
//                   <Card 
//                     elevation={0}
//                     sx={{ 
//                       borderRadius: 3,
//                       border: '1px solid',
//                       borderColor: 'divider'
//                     }}
//                   >
//                     <CardHeader
//                       title={
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <AccountCircleIcon color="primary" />
//                           <Typography variant="h6">Personal Information</Typography>
//                         </Box>
//                       }
//                       action={
//                         <IconButton 
//                           onClick={handleEdit}
//                           color="primary"
//                           sx={{ 
//                             bgcolor: 'action.selected',
//                             '&:hover': { bgcolor: 'action.hover' }
//                           }}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       }
//                     />
//                     <Divider />
//                     <CardContent sx={{ p: 3 }}>
//                       <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6}>
//                           <TextField
//                             label="First Name"
//                             value={updateFirstName}
//                             fullWidth
//                             InputProps={{ 
//                               readOnly: !isEditable,
//                               sx: { borderRadius: 2 }
//                             }}
//                             onChange={(e) => setUpdateFirstName(e.target.value)}
//                           />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                           <TextField
//                             label="Last Name"
//                             value={updateLastName}
//                             fullWidth
//                             InputProps={{ 
//                               readOnly: !isEditable,
//                               sx: { borderRadius: 2 }
//                             }}
//                             onChange={(e) => setUpdateLastName(e.target.value)}
//                           />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                           <TextField
//                             label="Email Address"
//                             value={updateEmail}
//                             fullWidth
//                             InputProps={{ 
//                               readOnly: !isEditable,
//                               sx: { borderRadius: 2 }
//                             }}
//                             onChange={(e) => setUpdateEmail(e.target.value)}
//                           />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                           <TextField
//                             label="Phone Number"
//                             value={updatePhoneNumber}
//                             fullWidth
//                             InputProps={{ 
//                               readOnly: !isEditable,
//                               sx: { borderRadius: 2 }
//                             }}
//                             onChange={(e) => setUpdatePhoneNumber(e.target.value)}
//                           />
//                         </Grid>
//                       </Grid>

//                       <Button
//                         variant="contained"
//                         fullWidth
//                         size="large"
//                         onClick={handleUpdateProfile}
//                         disabled={!isEditable}
//                         sx={{ 
//                           mt: 4,
//                           borderRadius: 2,
//                           py: 1.5,
//                           boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                         }}
//                       >
//                         Save Changes
//                       </Button>
//                     </CardContent>
//                   </Card>

//                   {/* Verification Actions Card */}
//                   <Card 
//                     elevation={0}
//                     sx={{ 
//                       borderRadius: 3,
//                       border: '1px solid',
//                       borderColor: 'divider'
//                     }}
//                   >
//                     <CardHeader
//                       title={
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <VerifiedUserIcon color="primary" />
//                           <Typography variant="h6">Verification Actions</Typography>
//                         </Box>
//                       }
//                     />
//                     <Divider />
//                     <CardContent sx={{ p: 2 }}>
//                     {
//   userProfile?.googleUser ? (
//     !userProfile?.phoneNumberVerified ? (
//       <Alert
//         severity="info"
//         sx={{ mb: 3, borderRadius: 2 }}
//         icon={<InfoIcon />}
//       >
//       {`Your phone number needs verification. Please verify to access all features. replace it with valid phone number`}
//       </Alert>
//     ) : (
//       <Alert
//         severity="success"
//         sx={{ mb: 3, borderRadius: 2 }}
//         icon={<InfoIcon />}
//       >
//         Phone number and Email verified
//       </Alert>
//     )
//   ) : (
//     !userProfile?.phoneNumberVerified || !userProfile?.emailVerified ? (
//       <Alert
//         severity="info"
//         sx={{ mb: 3, borderRadius: 2 }}
//         icon={<InfoIcon />}
//       >
//         Your email address and phone number need verification. Please verify to access all features.
//       </Alert>
//     ) : (
//       <Alert
//         severity="success"
//         sx={{ mb: 3, borderRadius: 2 }}
//         icon={<MailIcon />}
//       >
//         Mobile number and email verified
//       </Alert>
//     )
//   )
// }


//                       <Stack spacing={3}>
//                         {/* Email Verification */}
//                         {
//   userProfile?.emailVerificationPending ? (
//     <Alert
//       severity="warning"
//       icon={<MailIcon />}
//       sx={{ borderRadius: 2 }}
//     >
//       Email verification pending. Please verify your email address.
//     </Alert>
//   ) : !userProfile?.emailVerified ? (
//     <Button
//       variant="outlined"
//       onClick={sendEmailVerification}
//       startIcon={<MailIcon />}
//       sx={{
//         borderRadius: 2,
//         py: 1.5,
//         borderColor: 'warning.main',
//         color: 'warning.main',
//         '&:hover': {
//           borderColor: 'warning.dark',
//           bgcolor: 'warning.light',
//         },
//       }}
//     >
//       Verify Email Address
//     </Button>
//   ) : (
//     <Alert
//       severity="success"
//       icon={<MailIcon />}
//       sx={{ borderRadius: 2 }}
//     >
//       Email verified: {userProfile.email}
//     </Alert>
//   )
// }

//                         {/* Phone Verification */}
//                         {
//                         userProfile?.phoneNumberVerificationPending ? (
//                           <Alert
//                             severity="warning"
//                             icon={<PhoneIcon />}
//                             sx={{ borderRadius: 2 }}
//                           >
//                             Phone number verification pending <span><button className='mx-1' style={{background: "none", border: "none", padding: 0, textDecoration: "underline", color: "blue", cursor: "pointer",}} onClick={"handleResendOtp"}> Resend OTP  </button>

//                             </span>
//                             ( {userProfile.phoneNumberVerificationResendAttemtsLeft === -1 ? ' 0': userProfile.phoneNumberVerificationResendAttemtsLeft} attempts left )
//                           </Alert>
//                         ) :
//                         !userProfile?.phoneNumberVerified ? (
//                           <Button
//                             variant="outlined"
//                             onClick={sendMobileVerification}
//                             startIcon={<PhoneIcon />}
//                             sx={{
//                               borderRadius: 2,
//                               py: 1.5,
//                               borderColor: '#AE445A',
//                               color: '#AE445A',
//                               '&:hover': {
//                                 borderColor: '#933d4e',
//                                 bgcolor: '#AE445A22',
//                               },
//                             }}
//                           >
//                             Verify Phone Number
//                             {userProfile?.phoneNumberVerificationResendAttemtsLeft && (
//                               <Typography 
//                                 component="span" 
//                                 variant="caption" 
//                                 sx={{ ml: 1 }}
//                               >
//                               </Typography>
//                             )}
//                           </Button>
//                         ) : (
//                           <Alert 
//                             severity="success"
//                             icon={<PhoneIcon />}
//                             sx={{ borderRadius: 2 }}
//                           >
//                             Phone verified: {userProfile?.phoneNumber.split('_')[0]}
//                           </Alert>
//                         )}
//                       </Stack>
//                     </CardContent>
//                   </Card>
//                 </Stack>
//               )}
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Layout>
//     );
// };

// export default EditProfile;





import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Chip,
  Alert,
  Typography,
  CircularProgress,
  Divider,
  Container,
  IconButton,
  Stack,
} from '@mui/material';
import { InfoIcon, Mail as MailIcon, Phone as PhoneIcon } from 'lucide-react';
import { useUserProfile } from './Context/UserProfileContext';
import Layout from "../../src/Components/Layout/Layout";
import { useAxiosWithInterceptor } from './Api/Axios';
import { useAuth } from './Context/Context';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProfile = () => {
  const { userProfile, loading, getProfileDetails } = useUserProfile();
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState(userProfile?.phoneNumber.split('_')[0])
  const [updateFirstName, setUpdateFirstName] = useState('');
  const [updateLastName, setUpdateLastName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [PhoneNumberUpdateForGoogleUser, setPhoneNumberUpdateForGoogleUser] = useState('');
  // const [resendAttemptsLeft, setResendAttemptsLeft] = useState(userProfile?.phoneNumberVerificationResendAttemtsLeft);
  const [isEditable, setIsEditable] = useState(false);
  const api = useAxiosWithInterceptor()
  const { auth, updateAuth } = useAuth()
  const navigate = useNavigate()

  const firstLetter = userProfile?.firstName ? userProfile.firstName.charAt(0).toUpperCase() : '';

  // const isPhoneVerificationPending = userProfile?.phoneNumberVerificationPending;
  // const isPhoneNotVerified = !userProfile?.phoneNumberVerified;
  // const isPhoneVerified = userProfile?.phoneNumberVerified;


  // form handling
  useEffect(() => {
    setUpdatePhoneNumber(userProfile?.phoneNumber.includes('_RANDOM') ? '**********' : userProfile?.phoneNumber);
    setUpdateFirstName(userProfile?.firstName || '');
    setUpdateLastName(userProfile?.lastName || '');
    setUpdateEmail(userProfile?.email || '');
    setPhoneNumberUpdateForGoogleUser('0000000000')
  }, [userProfile]);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };

  const handlePhoneNumberChange = async (newPhoneNumber) => {
    const confirmation = await Swal.fire({
      title: "Confirm Phone Number Update",
      text: "Are you sure you want to update your phone number?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
    });

    if (confirmation.isConfirmed) {
      setUpdatePhoneNumber(newPhoneNumber);
    }
  };

  const handleUpdateProfile = async () => {
    const phoneNumberToSend = userProfile?.googleUser ? "0000000000" : updatePhoneNumber;

    if (
      updateFirstName === userProfile?.firstName &&
      updateLastName === userProfile?.lastName &&
      updateEmail === userProfile?.email &&
      phoneNumberToSend === userProfile?.phoneNumber
    ) {
      Swal.fire({
        title: "Details are up to date.",
        icon: "info",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    let showEmailConfirmation = false;

    if (updateEmail !== userProfile?.email) {
      showEmailConfirmation = true;
    }

    try {
      if (showEmailConfirmation) {
        const confirmation = await Swal.fire({
          title: "Confirm Email Change",
          text: "You have updated your email. After the update, you will need to verify your new email. Do you want to proceed?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Update",
          cancelButtonText: "Cancel",
        });

        if (!confirmation.isConfirmed) {
          setUpdateEmail(userProfile?.email);
          return;
        }
      }

      Swal.fire({
        title: "Processing...",
        text: "Please wait while we update your profile.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
      });

      const isEmailUpdated = updateEmail !== userProfile?.email;
      await api.put(
        "/tsn/v1/user/update-user-profile",
        {
          firstName: updateFirstName,
          lastName: updateLastName,
          email: updateEmail,
          phoneNumber: phoneNumberToSend,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.accessToken,
          },
        }
      );
      Swal.close();
      Swal.fire({
        title: "Success",
        text: "Profile updated successfully!",
        icon: "success",
      });
      getProfileDetails();
      setIsEditable(false);

      if (isEmailUpdated) {
        Swal.fire({
          title: "Email Updated",
          text: "You will be logged out, Please sigin again with New email and verify your new email.",
          icon: "info",
        }).then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          updateAuth({ accessToken: "", refreshToken: "" })
          navigate("/signin");
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "An unknown error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  // const handleUpdateProfile = async () => {
  //   // Check if any field has been altered
  //   if (
  //     updateFirstName === userProfile?.firstName &&
  //     updateLastName === userProfile?.lastName &&
  //     updateEmail === userProfile?.email &&
  //     updatePhoneNumber === userProfile?.phoneNumber
  //   ) {
  //     toast.success("Details are up to date.", { duration: 3000, id: "details" });
  //     return;
  //   }

  //   // Track if confirmation is required for email or phone number
  //   let showEmailConfirmation = false;
  //   let showPhoneConfirmation = false;

  //   // Determine which popups need to be shown
  //   if (updateEmail !== userProfile?.email) {
  //     showEmailConfirmation = true;
  //   }

  //   if (updatePhoneNumber !== userProfile?.phoneNumber) {
  //     showPhoneConfirmation = true;
  //   }

  //   try {
  //     // Handle combined email and phone confirmation
  //     if (showEmailConfirmation && showPhoneConfirmation) {
  //       const confirmation = await Swal.fire({
  //         title: "Confirm Changes",
  //         text: "You have updated your email and phone number. After the update, you will need to log in again and verify your details. Do you want to proceed?",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Update",
  //         cancelButtonText: "Cancel",
  //       });

  //       if (!confirmation.isConfirmed) {
  //         setUpdateEmail(userProfile?.email);
  //         setUpdatePhoneNumber(userProfile?.phoneNumber);
  //         return;
  //       }
  //     } else if (showEmailConfirmation) {
  //       const confirmation = await Swal.fire({
  //         title: "Confirm Email Change",
  //         text: "You have changed your email. After the update, your email requires re-login and verification of the new email. Do you want to continue?",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Update",
  //         cancelButtonText: "Cancel",
  //       });

  //       if (!confirmation.isConfirmed) {
  //         setUpdateEmail(userProfile?.email);
  //         return;
  //       }
  //     } else if (showPhoneConfirmation) {
  //       const confirmation = await Swal.fire({
  //         title: "Confirm Phone Number Change",
  //         text: "You have changed your phone number. After the update, your phone number requires verification of the new number. Do you want to continue?",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Update",
  //         cancelButtonText: "Cancel",
  //       });

  //       if (!confirmation.isConfirmed) {
  //         setUpdatePhoneNumber(userProfile?.phoneNumber);
  //         return;
  //       }
  //     }

  //     // Show loader while making the API call
  //     Swal.fire({
  //       title: "Processing...",
  //       text: "Please wait while we update your profile.",
  //       allowOutsideClick: false,
  //       allowEscapeKey: false,
  //       showConfirmButton: false,
  //       didOpen: () => {
  //         Swal.showLoading();
  //       },
  //     });

  //     // Proceed with the API call
  //     const isEmailUpdated = updateEmail !== userProfile?.email;
  //     const response = await api.put(
  //       "/tsn/v1/user/update-user-profile",
  //       {
  //         firstName: updateFirstName,
  //         lastName: updateLastName,
  //         email: updateEmail,
  //         phoneNumber: updatePhoneNumber,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: auth.accessToken,
  //         },
  //       }
  //     );

  //     // Close the loader and show success message
  //     Swal.close();
  //     Swal.fire({
  //       title: "Success",
  //       text: "Profile updated successfully!",
  //       icon: "success",
  //     });
  //     getProfileDetails()
  //     setIsEditable(false); // Lock the fields after a successful update

  //     // Log out the user if only the email was updated
  //     if (isEmailUpdated) {
  //       Swal.fire({
  //         title: "Email Updated",
  //         text: "Your email has been updated. You will be logged out now to verify your new email.",
  //         icon: "info",
  //       }).then(() => {
  //         // handleLogout()
  //         localStorage.removeItem("token")
  //         localStorage.removeItem("refreshToken")
  //         navigate("/signin")

  //       });
  //     }
  //   } catch (error) {
  //     // Close the loader and show an error message
  //     Swal.close();
  //     Swal.fire({
  //       title: "Error",
  //       text: error.response?.data?.message || "An unknown error occurred. Please try again.",
  //       icon: "error",
  //     });
  //   }
  // };

  const sendEmailVerification = async () => {
    console.log("Sending email verification link...");
    try {
      const response = await api.post(
        `/tsn/v1/email/send-verification-mail`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.accessToken,
          }
        }
      );
      console.log("User response:", response);
    } catch (error) {
      console.error("Error sending verification email:", error);
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }
    }
  };

  const sendMobileVerification = async () => {
    try {
      // Sending OTP request to the backend
      const response = await api.post(
        `/tsn/v1/otp/send-otp`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.accessToken
          }
        }
      );
      console.log("OTP sent successfully:", response);

      // Prompt user for OTP input
      Swal.fire({
        title: "Enter OTP",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Verify",
        showLoaderOnConfirm: true,
        preConfirm: async (otp) => {
          try {
            // Here, replace with an actual OTP verification API call
            const verifyResponse = await api.put(
              `/tsn/v1/otp/verify-otp`,
              { otp },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: auth?.accessToken
                }
              }
            );
            console.log("OTP verification successful:", verifyResponse);
            getProfileDetails()
            return verifyResponse.data;
          } catch (error) {
            Swal.showValidationMessage(`Verification failed: ${error.message}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "OTP Verified Successfully!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "OTP Verification Cancelled",
            icon: "info",
          });
        }
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message,
        icon: "error",
      });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>My profile</title>
      </Helmet>
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          minHeight: '100vh',
          py: 4
        }}
      >
        <Container maxWidth="lg">
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#2c3e50' }}>
              Profile Settings
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Manage your account settings and verification status
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Left Column - Profile Overview */}
            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: (theme) => theme.palette.primary.main,
                    borderRadius: '12px 12px 0 0',
                    color: 'white'
                  }}
                >
                  {/* <Avatar
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="User Avatar"
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid white',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      mb: 2
                    }}
                    hiii
                  /> */}
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid white',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      mb: 1,
                      fontSize: "75px",
                      background: "#1F509A"
                    }}
                  >
                    {userProfile?.profilePicLink ? <img className="w-100" src={userProfile?.profilePicLink} alt='user_profile' /> : firstLetter}
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {userProfile?.firstName} {userProfile?.lastName}
                  </Typography>
                  <Chip
                    label={!userProfile?.phoneNumberVerified || !userProfile?.emailVerified ? 'Unverified Account' : 'Verified Account'}
                    color={!userProfile?.phoneNumberVerified || !userProfile?.emailVerified ? 'error' : 'success'}
                    icon={<VerifiedUserIcon />}
                    sx={{
                      borderRadius: '16px',
                      px: 1,
                      '& .MuiChip-icon': { color: 'inherit' }
                    }}
                  />
                </Box>

                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Verification Status
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MailIcon size={20} />
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        Email Status
                      </Typography>

                      <Chip
                        size="small"
                        label={userProfile?.emailVerified ? 'Verified' : 'unverified'}
                        color={userProfile?.emailVerified ? 'success' : 'error'}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon size={20} />
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        Phone Status
                      </Typography>


                      <Chip
                        size="small"
                        label={userProfile?.phoneNumberVerified ? 'Verified' : 'unverified'}
                        color={userProfile?.phoneNumberVerified ? 'success' : 'error'}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Card>
            </Grid>

            {/* Right Column - Edit Form */}
            <Grid item xs={12} md={8}>
              {loading ? (
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 400,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={60} thickness={4} />
                    <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                      Loading your profile...
                    </Typography>
                  </Box>
                </Card>
              ) : (
                <Stack spacing={3}>
                  {/* Profile Information Card */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <CardHeader
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccountCircleIcon color="primary" />
                          <Typography variant="h6">Personal Information</Typography>
                        </Box>
                      }
                      action={
                        <IconButton
                          onClick={handleEdit}
                          color="primary"
                          sx={{
                            bgcolor: 'action.selected',
                            '&:hover': { bgcolor: 'action.hover' }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      }
                    />
                    <Divider />
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="First Name"
                            value={updateFirstName}
                            fullWidth
                            InputProps={{
                              readOnly: !isEditable,
                              sx: { borderRadius: 2 }
                            }}
                            onChange={(e) => setUpdateFirstName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Last Name"
                            value={updateLastName}
                            fullWidth
                            InputProps={{
                              readOnly: !isEditable,
                              sx: { borderRadius: 2 }
                            }}
                            onChange={(e) => setUpdateLastName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Email Address"
                            value={updateEmail}
                            fullWidth
                            InputProps={{
                              readOnly: !isEditable,
                              sx: { borderRadius: 2 }
                            }}
                            onChange={(e) => setUpdateEmail(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Phone Number"
                            value={updatePhoneNumber}
                            fullWidth
                            InputProps={{
                              readOnly: !isEditable,
                              sx: { borderRadius: 2 },
                            }}
                            onBlur={async () => {
                              if (updatePhoneNumber !== userProfile?.phoneNumber && isEditable) {
                                const confirmation = await Swal.fire({
                                  title: "Confirm Phone Number Update",
                                  text: "Are you sure you want to update your phone number?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonText: "Yes, update",
                                  cancelButtonText: "Cancel",
                                });

                                if (confirmation.isConfirmed) {
                                  try {
                                    Swal.fire({
                                      title: "Processing...",
                                      text: "Please wait while we update your profile.",
                                      allowOutsideClick: false,
                                      allowEscapeKey: false,
                                      showConfirmButton: false,
                                      didOpen: () => {
                                        Swal.showLoading();
                                      },
                                    });

                                    const response = await api.put(
                                      "/tsn/v1/user/update-user-profile",
                                      {
                                        phoneNumber: updatePhoneNumber,
                                        firstName: updateFirstName,
                                        lastName: updateLastName,
                                        email: updateEmail,
                                      },
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization: auth.accessToken,
                                        },
                                      }
                                    );

                                    Swal.close();
                                    Swal.fire({
                                      title: "Success",
                                      text: "Your phone number has been updated successfully!",
                                      icon: "success",
                                    });

                                    // Update the local userProfile state with the new phone number
                                    getProfileDetails(); // Fetch the updated profile details
                                  } catch (error) {
                                    Swal.close();
                                    Swal.fire({
                                      title: "Error",
                                      text: error.response?.data?.message || "Failed to update your phone number.",
                                      icon: "error",
                                    });

                                    // Optionally revert to the old phone number on error
                                    setUpdatePhoneNumber(userProfile?.phoneNumber || "");
                                  }
                                } else {
                                  // If the user cancels the confirmation, reset to the original value
                                  setUpdatePhoneNumber(userProfile?.phoneNumber || "");
                                }
                              }
                            }}
                            onChange={(e) => setUpdatePhoneNumber(e.target.value)} // Allow editing the value
                          />
                        </Grid>

                      </Grid>

                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleUpdateProfile}
                        disabled={!isEditable}
                        sx={{
                          mt: 4,
                          borderRadius: 2,
                          py: 1.5,
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }}
                      >
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Verification Actions Card */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <CardHeader
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <VerifiedUserIcon color="primary" />
                          <Typography variant="h6">Verification Actions</Typography>
                        </Box>
                      }
                    />
                    <Divider />
                    <CardContent sx={{ p: 2 }}>
                      {
                        userProfile?.googleUser ? (
                          !userProfile?.phoneNumberVerified ? (
                            <Alert
                              severity="info"
                              sx={{ mb: 3, borderRadius: 2 }}
                              icon={<InfoIcon />}
                            >
                              {`Your phone number needs verification. Please verify to access all features. replace it with valid phone number`}
                            </Alert>
                          ) : (
                            <Alert
                              severity="success"
                              sx={{ mb: 3, borderRadius: 2 }}
                              icon={<InfoIcon />}
                            >
                              Phone number and Email verified
                            </Alert>
                          )
                        ) : (
                          !userProfile?.phoneNumberVerified || !userProfile?.emailVerified ? (
                            <Alert
                              severity="info"
                              sx={{ mb: 3, borderRadius: 2 }}
                              icon={<InfoIcon />}
                            >
                              Your email address and phone number need verification. Please verify to access all features.
                            </Alert>
                          ) : (
                            <Alert
                              severity="info"
                              sx={{ mb: 3, borderRadius: 2 }}
                              icon={<InfoIcon />}
                            >
                              Mobile number and email verified
                            </Alert>
                          )
                        )
                      }
                      <Stack spacing={3}>
                        {/* Email Verification */}
                        {
                          userProfile?.emailVerificationPending ? (
                            <Alert
                              severity="warning"
                              icon={<MailIcon />}
                              sx={{ borderRadius: 2 }}
                            >
                              Email verification pending. Please verify your email address.
                            </Alert>
                          ) : !userProfile?.emailVerified ? (
                            <Button
                              variant="outlined"
                              onClick={sendEmailVerification}
                              startIcon={<MailIcon />}
                              sx={{
                                borderRadius: 2,
                                py: 1.5,
                                borderColor: 'warning.main',
                                color: 'warning.main',
                                '&:hover': {
                                  borderColor: 'warning.dark',
                                  bgcolor: 'warning.light',
                                },
                              }}
                            >
                              Verify Email Address
                            </Button>
                          ) : (
                            <Alert
                              severity="success"
                              icon={<MailIcon />}
                              sx={{ borderRadius: 2 }}
                            >
                              Email verified: {userProfile.email}
                            </Alert>
                          )
                        }
                        {/* Phone Verification */}
                        {
                          userProfile?.phoneNumberVerificationPending ? (
                            <Alert
                              severity="warning"
                              icon={<PhoneIcon />}
                              sx={{ borderRadius: 2 }}
                            >
                              Phone number verification pending
                              <span>
                                <button
                                  className="mx-1"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    textDecoration: "underline",
                                    color: "blue",
                                    cursor: "pointer",
                                  }}
                                  onClick={"handleResendOtp"}
                                >
                                  Resend OTP
                                </button>
                              </span>
                              ({userProfile.phoneNumberVerificationResendAttemtsLeft === -1 ? '0' : userProfile.phoneNumberVerificationResendAttemtsLeft} attempts left)
                            </Alert>
                          ) : !userProfile?.phoneNumberVerified ? (
                            <Button
                              variant="outlined"
                              onClick={sendMobileVerification}
                              startIcon={<PhoneIcon />}
                              sx={{
                                borderRadius: 2,
                                py: 1.5,
                                borderColor: '#AE445A',
                                color: '#AE445A',
                                '&:hover': {
                                  borderColor: '#933d4e',
                                  bgcolor: '#AE445A22',
                                },
                              }}
                            >
                              Verify Phone Number
                              {userProfile?.phoneNumberVerificationResendAttemtsLeft && (
                                <Typography
                                  component="span"
                                  variant="caption"
                                  sx={{ ml: 1 }}
                                ></Typography>
                              )}
                            </Button>
                          ) : (
                            <Alert
                              severity="success"
                              icon={<PhoneIcon />}
                              sx={{ borderRadius: 2 }}
                            >
                              {userProfile?.isGoogleUser ? (
                                // If the user is a Google user, the phone is automatically verified.
                                "Phone verified: **********"
                              ) : userProfile?.phoneNumber.includes("_RANDOM") ? (
                                // If the phone number includes '_RANDOM', show stars.
                                "Phone verified: **********"
                              ) : (
                                // If verified and phone number does not include '_RANDOM', show the actual phone number.
                                `Phone verified: ${userProfile?.phoneNumber}`
                              )}
                            </Alert>
                          )
                        }
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default EditProfile;



































