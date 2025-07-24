import  { useState, useEffect } from 'react';
import { Drawer, IconButton, Button, Box, Typography, Menu, MenuItem, List, ListItem, ListItemText, Alert, Badge, Divider, Tooltip, Avatar } from '@mui/material';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/Context/Context';
import MenuIcon from '@mui/icons-material/Menu';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-ui-kit/css/mdb.min.css';
// import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAxiosWithInterceptor } from '../Api/Axios';
// import toast from 'react-hot-toast';
import { Dashboard, History, PasswordOutlined, Settings } from '@mui/icons-material';
import { MailIcon, PhoneIcon } from 'lucide-react';
import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
// import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SupportIcon from '@mui/icons-material/Support';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CloseIcon from '@mui/icons-material/Close';
import { useUserProfile } from '../Context/UserProfileContext';
import { CheckCircle, Error } from '@mui/icons-material';



const Header = () => {
    const location = useLocation();
    const { auth, updateAuth, handleLogout } = useAuth();
    const navigate = useNavigate(); // Use navigate for redirection
    const api = useAxiosWithInterceptor()

    // userInfocontext Custom hook
    const { userProfile, error } = useUserProfile();

    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const open = Boolean(anchorEl);
    const [activeLink, setActiveLink] = useState('home'); // Default active link

    // account verify states
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [isEmailVerificationPending, setIsEmailVerificationPending] = useState(userProfile?.emailVerificationPending);
    const [isPhoneVerificationPending, setIsPhoneVerificationPending] = useState(userProfile?.phoneNumberVerificationPending);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false)

    const firstLetter = userProfile?.firstName ? userProfile.firstName.charAt(0).toUpperCase() : '';


    const handleSetActive = (link) => {
        setActiveLink(link);
    };

    useEffect(() => {
        // Initialize MDB UI kit if needed
    }, [location.pathname]);

    const toggleTheme = () => {};
const themeMode = "light";

// const listItemStyle = {
//   borderRadius: 2,
//   mb: 0.5,
//   "&:hover": { bgcolor: "#eaf1fb" },
// };

    // Logout function
    // const handleLogout = async () => {
    //     try {
    //         console.log("Logging out with token:", auth.accessToken);

    //         const response = await api.post(
    //             `/tsn/v1/user/signOut`,
    //             {},
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": auth.accessToken,
    //                 },
    //             }
    //         );
    //         if (response.status === 200) {
    //             updateAuth({ accessToken: "", refreshToken: "" });
    //             navigate("/");
    //             toast.success("Log out successful", {
    //                 duration: 3000
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Logout error:", error);
    //         if (error.response) {
    //             alert("Error logging out. Please try again.");
    //         } else if (error.request) {
    //             alert("Network error. Please check your connection.");
    //         } else {
    //             alert("An unexpected error occurred. Please try again.");
    //         }
    //     }
    // };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const listItemStyle = {
        borderRadius: '10px',
        marginBottom: '8px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary sticky-top">

                <div className="container">

                    {/* Mobile Menu Button */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { xs: 'block', lg: 'none' } }}
                        onClick={toggleDrawer(true)}
                        className='mx-2'
                    >
                        <MenuIcon style={{ fontSize: "30px", color: "#0a4275" }} />
                    </IconButton>

                     <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "350px",
          background: "linear-gradient(115deg,#f4f6ff 60%,#eef2fb 100%)",
          boxShadow: "0 8px 36px 0 rgba(31,80,154,0.13)",
          borderTopLeftRadius: 18,
          borderBottomLeftRadius: 18,
          minHeight: "100vh",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              bgcolor: "#f4f8fc",
              "&:hover": { bgcolor: "#eceef7" },
              boxShadow: "0 2px 8px rgba(31,80,154,0.07)",
              width: 40,
              height: 40,
            }}
          >
            <CloseIcon sx={{ fontSize: 24, color: "#1F509A" }} />
          </IconButton>
        </Box>

        {/* Profile Section */}
        <Box
  sx={{
    padding: 4,
    textAlign: 'center',
    background: 'linear-gradient(117deg, #e1eafe 60%, #cfd8fc 100%)',
    borderBottom: '1.5px solid #d1dcfa',
    boxShadow: '0 4px 24px rgba(31, 80, 154, 0.07)',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    mb: 3,
    position: 'relative'
  }}
>
  <Avatar
    sx={{
      width: 96,
      height: 96,
      mx: 'auto',
      mb: 2,
      bgcolor: 'linear-gradient(135deg, #3156ad 78%, #4fa5fa 100%)',
      fontSize: 38,
      boxShadow: '0 8px 28px 0 rgba(49,86,173,0.13)',
      border: '4px solid #cfd8fc',
      transition: 'transform .2s',
      background: 'linear-gradient(135deg, #3156ad 70%, #4fa5fa 100%)',
      '&:hover': {
        transform: 'scale(1.06)'
      }
    }}
    src={userProfile?.profilePicLink || undefined}
  >
    {!userProfile?.profilePicLink && firstLetter}
  </Avatar>

  <Typography
    variant="h5"
    sx={{
      fontWeight: 700,
      color: '#263868',
      mb: 0.5,
      letterSpacing: '0.8px'
    }}
  >
    Welcome!
  </Typography>

  <Typography
    variant="body1"
    sx={{
      color: '#39536b',
      opacity: 0.82,
      mb: 1,
      wordBreak: 'break-word',
      fontSize: '1.09rem'
    }}
  >
    {userProfile?.email || userProfile?.error}
  </Typography>

  <Box display="flex" justifyContent="center" alignItems="center" mb={2} mt={1}>
    {!userProfile?.emailVerified || !userProfile?.phoneNumberVerified ? (
      <Tooltip title="Complete your profile verification">
        <Typography
          component="span"
          variant="body2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(90deg, #fae8e8 50%, #ffe5ed 100%)',
            px: 2,
            py: 0.7,
            color: "#e34444",
            fontWeight: 600,
            borderRadius: "30px",
            fontSize: '0.97rem',
            boxShadow: '0 1px 3px rgba(255,0,29,0.09)'
          }}
        >
          <Error sx={{ fontSize: '1rem', mr: 1, color: "#e34444" }} />
          Unverified Account
        </Typography>
      </Tooltip>
    ) : (
      <Typography
        component="span"
        variant="body2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(93deg, #e2fbec 60%, #d2ffe2 100%)',
          px: 2,
          py: 0.7,
          color: "#289c4d",
          fontWeight: 600,
          borderRadius: "30px",
          fontSize: '0.97rem',
          boxShadow: '0 1px 3px rgba(44,255,29,0.07)'
        }}
      >
        <CheckCircle sx={{ fontSize: '1rem', mr: 1, color: "#289c4d" }} />
        Verified Account
      </Typography>
    )}
  </Box>
</Box>



        {/* Email & Phone Section */}
        {auth?.accessToken && (
          <Box sx={{ px: 2, mb: 2 }}>
            {/* Email */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "10px",
                p: 2,
                mb: 1,
                boxShadow: "0 3px 7px rgba(27,51,97,0.03)",
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  mr: 2,
                  bgcolor: "#1F509A",
                  fontSize: 20,
                }}
              >
                <MailIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Box flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  Email Address
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userProfile?.email || "Not available"}
                  {!userProfile?.emailVerified && (
                    <Tooltip title="Please verify your email">
                      <Error
                        color="error"
                        sx={{
                          fontSize: "16px",
                          ml: 0.5,
                          verticalAlign: "middle",
                        }}
                      />
                    </Tooltip>
                  )}
                </Typography>
              </Box>
            </Box>
            {/* Phone */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "10px",
                p: 2,
                boxShadow: "0 3px 7px rgba(27,51,97,0.03)",
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  mr: 2,
                  bgcolor: "#1F509A",
                  fontSize: 20,
                }}
              >
                <PhoneIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Box flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  Phone Number
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userProfile?.googleUser ? userProfile?.phoneNumber : ""}
                  {!userProfile?.phoneNumberVerified && (
                    <Tooltip title="Please verify your phone number">
                      <Error
                        color="error"
                        sx={{
                          fontSize: "16px",
                          ml: 0.5,
                          verticalAlign: "middle",
                        }}
                      />
                    </Tooltip>
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Navigation List with partitions */}
        <List sx={{ flex: 1, px: 2, pt: 0.5 }}>
          {/* Main partition */}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "#63688e",
              letterSpacing: 1.1,
              ml: 1.5,
              mt: 0.5,
              mb: 0.1,
              textTransform: "uppercase",
            }}
          >
            General
          </Typography>
          <ListItem button component={Link} to="/" sx={listItemStyle}>
            <HomeIcon sx={{ mr: 2, color: "#5671c6", fontSize: 25 }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/about" sx={listItemStyle}>
            <InfoIcon sx={{ mr: 2, color: "#5671c6", fontSize: 25 }} />
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="/contact" sx={listItemStyle}>
            <ContactMailIcon sx={{ mr: 2, color: "#5671c6", fontSize: 25 }} />
            <ListItemText primary="Contact" />
          </ListItem>
          <Divider sx={{ my: 1.3, opacity: 0.55 }} />

          {/* Account partition */}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "#63688e",
              letterSpacing: 1.1,
              ml: 1.5,
              mt: 0.5,
              mb: 0.1,
              textTransform: "uppercase",
            }}
          >
            Account
          </Typography>
          <ListItem button component={Link} to="/editProfile" sx={listItemStyle}>
            <Settings sx={{ mr: 2, color: "#5671c6", fontSize: 25 }} />
            <ListItemText primary="Settings" />
          </ListItem>
          <Divider sx={{ my: 1.3, opacity: 0.5 }} />

          {/* Tickets partition */}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "#63688e",
              letterSpacing: 1.1,
              ml: 1.5,
              mt: 0.5,
              mb: 0.1,
              textTransform: "uppercase",
            }}
          >
            Tickets
          </Typography>
          <ListItem button component={Link} to="/ticketHistory" sx={listItemStyle}>
            <History sx={{ mr: 2, color: "#5671c6", fontSize: 25 }} />
            <ListItemText primary="Ticket History" />
          </ListItem>
          <ListItem button component={Link} to="/bookTickets" sx={listItemStyle}>
            <ConfirmationNumberIcon sx={{ mr: 2, color: "#5671c6", fontSize: 25 }} />
            <ListItemText primary="Purchase Ticket" />
          </ListItem>
          {auth.accessToken && (
            <ListItem button component={Link} to="/bookedTicket" sx={listItemStyle}>
              <ReceiptIcon sx={{ mr: 2, color: "#5671c6", fontSize: 25 }} />
              <ListItemText primary="Recent Ticket" />
            </ListItem>
          )}
          {!auth.accessToken && (
            <Box sx={{ px: 2, mt: 2 }}>
              <Button
                component={Link}
                to="/signin"
                variant="contained"
                fullWidth
                sx={{
                  mb: 2,
                  backgroundColor: "#10375c",
                  height: "44px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: 1,
                  "&:hover": {
                    backgroundColor: "#0d2e4c",
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="outlined"
                fullWidth
                sx={{
                  border: "1.5px solid #10375c",
                  color: "#10375c",
                  height: "44px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: 1,
                  "&:hover": {
                    backgroundColor: "rgba(16, 55, 92, 0.04)",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </List>

        {/* Quick Actions */}
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="caption"
          sx={{
            color: "#63688e",
            fontWeight: 700,
            textTransform: "uppercase",
            ml: 2,
            mb: 1,
            letterSpacing: 1.1,
          }}
        >
          Quick Actions
        </Typography>
        <Box
          sx={{
            px: 2,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Tooltip title="Edit Profile">
            <IconButton
              component={Link}
              to="/editProfile"
              sx={{
                bgcolor: "#f7fafd",
                border: "1px solid #e3e8f3",
                "&:hover": { bgcolor: "#edf3fa" },
              }}
            >
              <Settings sx={{ color: "#4064ba" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tickets">
            <IconButton
              component={Link}
              to="/ticketHistory"
              sx={{
                bgcolor: "#f7fafd",
                border: "1px solid #e3e8f3",
                "&:hover": { bgcolor: "#edf3fa" },
              }}
            >
              <ReceiptIcon sx={{ color: "#4064ba" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Support">
            <IconButton
              component="a"
              href="mailto:support@email.com"
              sx={{
                bgcolor: "#f7fafd",
                border: "1px solid #e3e8f3",
                "&:hover": { bgcolor: "#edf3fa" },
              }}
            >
              <SupportIcon sx={{ color: "#4064ba" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Switch Theme">
            <IconButton
              onClick={toggleTheme}
              sx={{
                bgcolor: "#f7fafd",
                border: "1px solid #e3e8f3",
                "&:hover": { bgcolor: "#edf3fa" },
              }}
            >
              {themeMode === "light" ? (
                ''
              ) : (
                ''
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Bottom Section */}
        <Divider sx={{ mt: "auto" }} />
        <Box
          sx={{
            p: 2,
            textAlign: "center",
            backgroundColor: "#fff",
            borderBottomLeftRadius: 18,
          }}
        >
          {auth.accessToken ? (
            <Button
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              fullWidth
              sx={{
                color: "#fff",
                backgroundColor: "#1F509A",
                fontSize: "1rem",
                fontWeight: 600,
                py: 1,
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#183a6e",
                },
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              startIcon={<ConfirmationNumberIcon />}
              component={Link}
              to="/bookTickets"
              fullWidth
              sx={{
                color: "#fff",
                backgroundColor: "#1F509A",
                fontSize: "1rem",
                fontWeight: 600,
                py: 1,
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#183a6e",
                },
              }}
            >
              Book Your Ticket
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
                    {/* Toggle button for mobile view */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <Link className="nav-link" to="/"><i className="fas fa-bus me-3 fw-bold" style={{ color: "#0a4275", fontSize: "25px" }} /></Link>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        {/* Left links */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? "bold" : "normal",
                                        color: isActive ? "#0a4275" : "inherit",
                                        padding: "5px 10px",
                                    })}
                                >
                                    <i className="fas fa-bus me-3 fw-bold" style={{ fontSize: "30px" }} />
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? "bold" : "normal",
                                        color: isActive ? "#fff" : "inherit",
                                        backgroundColor: isActive ? "#0a4275" : "transparent",
                                        textDecoration: isActive ? "none" : "none",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                      })}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/about"
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? "bold" : "normal",
                                        color: isActive ? "#fff" : "inherit",
                                        backgroundColor: isActive ? "#0a4275" : "transparent",
                                        textDecoration: isActive ? "none" : "none",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                      })}
                                >
                                    About Us
                                </NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/product"
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? "bold" : "normal",
                                        color: isActive ? "#fff" : "inherit",
                                        backgroundColor: isActive ? "#0a4275" : "transparent",
                                        textDecoration: isActive ? "none" : "none",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                      })}
                                >
                                    Product
                                </NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/contact"
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? "bold" : "normal",
                                        color: isActive ? "#fff" : "inherit",
                                        backgroundColor: isActive ? "#0a4275" : "transparent",
                                        textDecoration: isActive ? "none" : "none",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                      })}
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/support"
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? "bold" : "normal",
                                        color: isActive ? "#fff" : "inherit",
                                        backgroundColor: isActive ? "#0a4275" : "transparent",
                                        textDecoration: isActive ? "none" : "none",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                      })}
                                >
                                    Support
                                </NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/bookTickets"
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? "bold" : "normal",
                                        color: isActive ? "#fff" : "inherit",
                                        backgroundColor: isActive ? "#0a4275" : "transparent",
                                        textDecoration: isActive ? "none" : "none",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                      })}
                                >
                                    Purchase Ticket
                                </NavLink>
                            </li>
                            {auth.accessToken && (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to="/bookedTicket"
                                            style={({ isActive }) => ({
                                                fontWeight: isActive ? "bold" : "normal",
                                                color: isActive ? "#fff" : "inherit",
                                                backgroundColor: isActive ? "#0a4275" : "transparent",
                                                textDecoration: isActive ? "none" : "none",
                                                borderRadius: "5px",
                                                padding: "5px 10px",
                                              })}
                                        >
                                            Recent Ticket
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to="/ticketHistory"
                                            style={({ isActive }) => ({
                                                fontWeight: isActive ? "bold" : "normal",
                                                color: isActive ? "#fff" : "inherit",
                                                backgroundColor: isActive ? "#0a4275" : "transparent",
                                                textDecoration: isActive ? "none" : "none",
                                                borderRadius: "5px",
                                                padding: "5px 10px",
                                              })}
                                        >
                                            Ticket History
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>

                        {/* Right side login/logout buttons */}
                        <div className="d-flex align-items-center">
                            {!auth.accessToken ? (
                                <>
                                <NavLink
                                  to="/signin"
                                  className="mr-2"
                                  style={({ isActive }) => ({
                                    textDecoration: "none",
                                    background: isActive ? "#0a4275" : "#10375c",
                                    color: isActive ? "white" : "#fff",
                                    fontWeight: isActive ? "bold" : "normal",
                                    borderRadius: "5px",
                                    padding: "4px 10px",
                                    display: "inline-block", 
                                  })}
                                >
                                  Sign In
                                </NavLink>
                              
                                <NavLink
                                  to="/signup"
                                  className="mr-2"
                                  style={({ isActive }) => ({
                                    textDecoration: "none",
                                    border: isActive ? "none" : "1px solid #10375c",
                                    background: isActive ? "#0a4275" : "transparent",
                                    color: isActive ? "white" : "#10375c",
                                    fontWeight: isActive ? "bold" : "normal",
                                    borderRadius: "5px",
                                    padding: "3px 8px",
                                    display: "inline-block",
                                  })}
                                >
                                  Sign Up
                                </NavLink>
                              </>
                              
                            ) : (
                                <>
                                    {/* Dropdown for Account */}
                                    <IconButton
                                        onClick={handleMenuClick}
                                        color="inherit"
                                    >
                                        <Avatar
                                            sx={{
                                                width: 34,
                                                height: 34,
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                bgcolor: '#1F509A',
                                                fontSize: '1.2rem',
                                                // mb: 1,
                                            }}
                                        >
                                            {userProfile?.profilePicLink ? <img className="w-100" src={userProfile?.profilePicLink} alt='user_profile' /> : firstLetter}
                                        </Avatar>
                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        sx={{
                                            '& .MuiPaper-root': {
                                                minWidth: '350px',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                padding: '18px',
                                                marginLeft: "80px"
                                            },
                                        }}
                                    >
                                        {/* User Avatar and Name */}
                                        <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
                                            <Avatar
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                    bgcolor: '#1F509A',
                                                    fontSize: '2rem',
                                                    mb: 1,
                                                }}
                                            >
                                                {userProfile?.profilePicLink ? <img className="w-100" src={userProfile?.profilePicLink} alt='user_profile' /> : firstLetter}
                                            </Avatar>
                                            <Typography variant="body5" fontWeight="600">
                                                Welcome !
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userProfile?.email || 'Guest'}
                                            </Typography>
                                        </Box>


                                        {/* Account Verification Tag */}
                                        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                                            {!userProfile?.emailVerified || !userProfile?.phoneNumberVerified ? (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        backgroundColor: 'rgba(255,0,0,0.05)',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: '20px'
                                                    }}
                                                >
                                                    <Error sx={{ fontSize: '1rem', mr: 0.5 }} />
                                                    Unverified Account
                                                </Typography>
                                            ) : (
                                                <Typography variant="body2" color="success.main" fontWeight="500" sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CheckCircle sx={{ fontSize: '1.25rem', mr: 0.5 }} />
                                                    Verified Account
                                                </Typography>
                                            )}
                                        </Box>
                                        <hr style={{ border: 'none', height: '1px', backgroundColor: '#000' }} />

                                        {/* Account Management */}
                                        <MenuItem>
                                            <Box display="flex" alignItems="center" width="100%">
                                                <Avatar
                                                    sx={{
                                                        width: 38,
                                                        height: 38,
                                                        bgcolor: '#1F509A',
                                                        fontSize: '1rem',
                                                        mr: 1,
                                                    }}
                                                >
                                                    <PhoneIcon />
                                                </Avatar>
                                                <Box flex="1">
                                                    <Typography variant="body2" fontWeight="500">
                                                        Phone Number
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {userProfile?.googleUser ? "**********" : userProfile?.phoneNumber}
                                                        <Typography variant="caption" color="error">
                                                            {
                                                                <Tooltip title="Please verify your account by confirming your mobile number.">
                                                                    {!userProfile?.phoneNumberVerified ? <Error sx={{ fontSize: '1.25rem', mb: 0.4, mx: 0.5 }} /> : ""}
                                                                </Tooltip>
                                                            }
                                                        </Typography>
                                                    </Typography>
                                                </Box>
                                                {!userProfile?.phoneNumber && <Error sx={{ color: 'red' }} />}
                                            </Box>
                                        </MenuItem>

                                        <MenuItem>
                                            <Box display="flex" alignItems="center" width="100%">
                                                <Avatar
                                                    sx={{
                                                        width: 38,
                                                        height: 38,
                                                        bgcolor: '#1F509A',
                                                        fontSize: '1rem',
                                                        mr: 1,
                                                    }}
                                                >
                                                    <MailIcon />
                                                </Avatar>
                                                <hr />
                                                <Box flex="1">
                                                    <Typography variant="body2" fontWeight="500">
                                                        Email Addres
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {userProfile?.email || 'Not available'}
                                                        <Typography variant="caption" color="error">
                                                            {
                                                                <Tooltip title="Please verify your account by confirming your Email Adress">
                                                                    {!userProfile?.emailVerified ? <Error sx={{ fontSize: '1.25rem', mb: 0.4, mx: 0.5 }} /> : ''}
                                                                </Tooltip>
                                                            }
                                                        </Typography>
                                                    </Typography>
                                                </Box>
                                                {!userProfile?.email && <Error sx={{ color: 'red' }} />}
                                            </Box>
                                        </MenuItem>

                                        <hr style={{ border: 'none', height: '1px', backgroundColor: '#000' }} />


                                        {/* Options Section */}
                                        <MenuItem>
                                            <Link to={'/editProfile'}>
                                                <Typography variant="body2" fontWeight="500">
                                                    <ManageAccountsIcon sx={{ mx: 1 }} /> Settings
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                        {auth?.authorities?.includes("ROLE_ADMIN") ? (<MenuItem>
                                            <Link to={'/admin'}>
                                                <Typography variant="body2" fontWeight="500">
                                                    <Dashboard sx={{ mx: 1 }} /> Admin Dashboard
                                                </Typography>
                                            </Link>
                                        </MenuItem>) : ""}

                                        <MenuItem>
                                            <Link to={'/ForgotPassword'}>
                                                <Typography variant="body2" fontWeight="500">
                                                    <PasswordOutlined sx={{ mx: 1 }} /> Change Password
                                                </Typography>
                                            </Link>
                                        </MenuItem>

                                        <hr style={{ border: 'none', height: '1px', backgroundColor: '#000' }} />


                                        {/* Logout Button */}
                                        <MenuItem onClick={() => handleLogout()}>
                                            <Button
                                                startIcon={<LogoutIcon />}
                                                fullWidth
                                                sx={{
                                                    color: '#536493',
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    // py: 1,
                                                }}
                                            >
                                                Sign out
                                            </Button>
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
const listItemStyle = {
    borderRadius: '8px',
    mb: 1,
    '&:hover': {
        backgroundColor: 'rgba(83, 100, 147, 0.08)'
    }
};
export default Header;
