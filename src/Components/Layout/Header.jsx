import { useState, useEffect } from 'react';
import { Drawer, IconButton, Button, Box, Typography, List, ListItem, ListItemText, Divider, Tooltip, Avatar, Chip, Paper } from '@mui/material';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/Context/Context';
import MenuIcon from '@mui/icons-material/Menu';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-ui-kit/css/mdb.min.css';
// import EditIcon from '@mui/icons-material/Edit';
import { useAxiosWithInterceptor } from '../Api/Axios';
// import toast from 'react-hot-toast';
import { History, Settings } from '@mui/icons-material';
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
import AccountMenu from './AccountMenu';
import { CheckCircle, Error } from '@mui/icons-material';



const Header = () => {
    const location = useLocation();
    const { auth, updateAuth, handleLogout } = useAuth();
    const navigate = useNavigate(); // Use navigate for redirection
    const api = useAxiosWithInterceptor()

    // userInfocontext Custom hook
    const { userProfile, error } = useUserProfile();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home'); // Default active link
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);

    const navLinkClass = ({ isActive }) => `nav-link site-nav__link${isActive ? ' is-active' : ''}`;

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 12);
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
            <nav className={`site-nav navbar navbar-expand-lg sticky-top${scrolled ? ' navbar-scrolled' : ''}`}>
                <span className="site-nav__progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />

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
                        <MenuIcon style={{ fontSize: "30px", color: "#0F172A" }} />
                    </IconButton>

                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        PaperProps={{
                            sx: {
                                width: "100%",
                                maxWidth: "380px",
                                background: "#FFFFFF",
                                boxShadow: "0 20px 60px rgba(59, 130, 246, 0.15), 0 8px 25px rgba(59, 130, 246, 0.08)",
                                borderTopLeftRadius: 24,
                                borderBottomLeftRadius: 24,
                                minHeight: "100vh",
                                backdropFilter: "blur(10px)",
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
                                    p: 2,
                                    position: "absolute",
                                    right: 12,
                                    top: 12,
                                    zIndex: 10,
                                }}
                            >
                                <IconButton
                                    onClick={toggleDrawer(false)}
                                    sx={{
                                        bgcolor: "rgba(255, 255, 255, 0.9)",
                                        backdropFilter: "blur(10px)",
                                        "&:hover": {
                                            bgcolor: "rgba(255, 255, 255, 1)",
                                            transform: "scale(1.05)",
                                        },
                                        boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)",
                                        width: 44,
                                        height: 44,
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: 22, color: "#475569" }} />
                                </IconButton>
                            </Box>

                            {/* Profile Section */}
                            <Box
                                sx={{
                                    padding: 4,
                                    textAlign: 'center',
                                    background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
                                    borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
                                    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24,
                                    mb: 2,
                                    position: 'relative'
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        mx: 'auto',
                                        mb: 3,
                                        background: '#1B3C53',
                                        fontSize: 40,
                                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.8)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'scale(1.08) translateY(-2px)',
                                            boxShadow: '0 12px 40px rgba(59, 130, 246, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.9)',
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
                                        color: '#1e293b',
                                        mb: 1,
                                        letterSpacing: '0.5px',
                                        background: 'white',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Hey there!
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#ffffff',
                                        mb: 2,
                                        wordBreak: 'break-word',
                                        fontSize: '1.1rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    {userProfile?.email || userProfile?.error}
                                </Typography>

                                <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
                                    {!userProfile?.emailVerified || !userProfile?.phoneNumberVerified ? (
                                        <Tooltip title="Complete your profile verification" arrow>
                                            <Chip
                                                icon={<Error sx={{ fontSize: '18px !important', color: "#ef4444" }} />}
                                                label="Needs Verification"
                                                sx={{
                                                    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                                                    color: "#dc2626",
                                                    fontWeight: 600,
                                                    borderRadius: "20px",
                                                    fontSize: '0.9rem',
                                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.15)',
                                                    '&:hover': {
                                                        transform: 'scale(1.02)',
                                                    }
                                                }}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Chip
                                            icon={<CheckCircle sx={{ fontSize: '18px !important', color: "#22c55e" }} />}
                                            label="Verified Account"
                                            sx={{
                                                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                                                color: "#16a34a",
                                                fontWeight: 600,
                                                borderRadius: "20px",
                                                fontSize: '0.9rem',
                                                border: '1px solid rgba(34, 197, 94, 0.2)',
                                                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.15)',
                                                '&:hover': {
                                                    transform: 'scale(1.02)',
                                                }
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>

                            {/* Email & Phone Section */}
                            {auth?.accessToken && (
                                <Box sx={{ px: 3, mb: 3 }}>
                                    {/* Email */}
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                                            borderRadius: "16px",
                                            p: 2.5,
                                            mb: 2,
                                            boxShadow: "0 4px 20px rgba(59, 130, 246, 0.08)",
                                            border: "1px solid rgba(59, 130, 246, 0.1)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                boxShadow: "0 8px 30px rgba(59, 130, 246, 0.15)",
                                                transform: "translateY(-2px)",
                                            },
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                mr: 2.5,
                                                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                                                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                                            }}
                                        >
                                            <MailIcon sx={{ fontSize: 20 }} />
                                        </Avatar>
                                        <Box flex={1}>
                                            <Typography variant="subtitle1" fontWeight={600} color="#1e293b" mb={0.5}>
                                                Email Address
                                            </Typography>
                                            <Typography variant="body2" color="#64748b" sx={{ display: 'flex', alignItems: 'center' }}>
                                                {userProfile?.email || "Not available"}
                                                {!userProfile?.emailVerified && (
                                                    <Tooltip title="Please verify your email" arrow>
                                                        <Error
                                                            sx={{
                                                                fontSize: "16px",
                                                                ml: 1,
                                                                color: "#ef4444",
                                                            }}
                                                        />
                                                    </Tooltip>
                                                )}
                                            </Typography>
                                        </Box>
                                    </Paper>

                                    {/* Phone */}
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                                            borderRadius: "16px",
                                            p: 2.5,
                                            boxShadow: "0 4px 20px rgba(59, 130, 246, 0.08)",
                                            border: "1px solid rgba(59, 130, 246, 0.1)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                boxShadow: "0 8px 30px rgba(59, 130, 246, 0.15)",
                                                transform: "translateY(-2px)",
                                            },
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                mr: 2.5,
                                                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                                                boxShadow: "0 4px 15px rgba(6, 182, 212, 0.3)",
                                            }}
                                        >
                                            <PhoneIcon sx={{ fontSize: 20 }} />
                                        </Avatar>
                                        <Box flex={1}>
                                            <Typography variant="subtitle1" fontWeight={600} color="#1e293b" mb={0.5}>
                                                Phone Number
                                            </Typography>
                                            <Typography variant="body2" color="#64748b" sx={{ display: 'flex', alignItems: 'center' }}>
                                                {userProfile?.googleUser ? userProfile?.phoneNumber : "Not provided"}
                                                {!userProfile?.phoneNumberVerified && (
                                                    <Tooltip title="Please verify your phone number" arrow>
                                                        <Error
                                                            sx={{
                                                                fontSize: "16px",
                                                                ml: 1,
                                                                color: "#ef4444",
                                                            }}
                                                        />
                                                    </Tooltip>
                                                )}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Box>
                            )}

                            {/* Navigation List */}
                            <Box sx={{ flex: 1, px: 2 }}>
                                {/* Main Section */}
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#64748b",
                                        letterSpacing: 1.5,
                                        ml: 1,
                                        mb: 2,
                                        display: 'block',
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    General
                                </Typography>
                                <hr></hr>

                                <List sx={{ mb: 3 }}>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/"
                                        sx={{
                                            borderRadius: "12px",
                                            mb: 1,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >
                                        <HomeIcon sx={{ mr: 2.5, color: "#3b82f6", fontSize: 24 }} />
                                        <ListItemText
                                            primary="Home"
                                            primaryTypographyProps={{ fontWeight: 500, color: "#334155" }}
                                        />
                                    </ListItem>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/about"
                                        sx={{
                                            borderRadius: "12px",
                                            mb: 1,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >
                                        <InfoIcon sx={{ mr: 2.5, color: "#06b6d4", fontSize: 24 }} />
                                        <ListItemText
                                            primary="About"
                                            primaryTypographyProps={{ fontWeight: 500, color: "#334155" }}
                                        />
                                    </ListItem>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/contact"
                                        sx={{
                                            borderRadius: "12px",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >
                                        <ContactMailIcon sx={{ mr: 2.5, color: "#8b5cf6", fontSize: 24 }} />
                                        <ListItemText
                                            primary="Contact"
                                            primaryTypographyProps={{ fontWeight: 500, color: "#334155" }}
                                        />
                                    </ListItem>
                                </List>

                                {/* Account Section */}
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#64748b",
                                        letterSpacing: 1.5,
                                        ml: 1,
                                        mb: 2,
                                        display: 'block',
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    Account
                                </Typography>
                                <hr></hr>

                                <List sx={{ mb: 3 }}>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/editProfile"
                                        sx={{
                                            borderRadius: "12px",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >
                                        <Settings sx={{ mr: 2.5, color: "#64748b", fontSize: 24 }} />
                                        <ListItemText
                                            primary="Settings"
                                            primaryTypographyProps={{ fontWeight: 500, color: "#334155" }}
                                        />
                                    </ListItem>
                                </List>

                                {/* Tickets Section */}
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#64748b",
                                        letterSpacing: 1.5,
                                        ml: 1,
                                        mb: 2,
                                        display: 'block',
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    Tickets
                                </Typography>
                                <hr></hr>

                                <List sx={{ mb: 3 }}>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/ticketHistory"
                                        sx={{
                                            borderRadius: "12px",
                                            mb: 1,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >
                                        <History sx={{ mr: 2.5, color: "#f59e0b", fontSize: 24 }} />
                                        <ListItemText
                                            primary="Ticket History"
                                            primaryTypographyProps={{ fontWeight: 500, color: "#334155" }}
                                        />
                                    </ListItem>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/bookTickets"
                                        sx={{
                                            borderRadius: "12px",
                                            mb: 1,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >
                                        <ConfirmationNumberIcon sx={{ mr: 2.5, color: "#10b981", fontSize: 24 }} />
                                        <ListItemText
                                            primary="Purchase Ticket"
                                            primaryTypographyProps={{ fontWeight: 500, color: "#334155" }}
                                        />
                                    </ListItem>
                                    {auth.accessToken && (
                                        <ListItem
                                            button
                                            component={Link}
                                            to="/bookedTicket"
                                            sx={{
                                                borderRadius: "12px",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                                                    transform: "translateX(4px)",
                                                },
                                            }}
                                        >
                                            <ReceiptIcon sx={{ mr: 2.5, color: "#ef4444", fontSize: 24 }} />
                                            <ListItemText
                                                primary="Recent Ticket"
                                                primaryTypographyProps={{ fontWeight: 500, color: "#334155" }}
                                            />
                                        </ListItem>
                                    )}
                                </List>

                                {/* Auth Buttons for non-authenticated users */}
                                {!auth.accessToken && (
                                    <Box sx={{ mb: 3 }}>
                                        <Button
                                            component={Link}
                                            to="/signin"
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mb: 2,
                                                background: "#0D5EA6",
                                                height: "48px",
                                                borderRadius: "14px",
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                                letterSpacing: 0.5,
                                                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    background: "#0D5EA6",
                                                    boxShadow: "0 8px 30px rgba(59, 130, 246, 0.4)",
                                                    transform: "translateY(-2px)",
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
                                                border: "2px solid #0D5EA6",
                                                color: "#3b82f6",
                                                height: "48px",
                                                borderRadius: "14px",
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                                letterSpacing: 0.5,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    backgroundColor: "rgba(59, 130, 246, 0.08)",
                                                    borderColor: "#2563eb",
                                                    transform: "translateY(-1px)",
                                                },
                                            }}
                                        >
                                            Sign Up 
                                        </Button>
                                    </Box>
                                )}
                            </Box>

                            {/* Quick Actions */}
                            <Divider sx={{ mx: 3, mb: 3, opacity: 0.3 }} />
                            <Typography
                                variant="overline"
                                sx={{
                                    color: "#64748b",
                                    fontWeight: 700,
                                    ml: 4,
                                    mb: 2,
                                    letterSpacing: 1.5,
                                    fontSize: '0.75rem'
                                }}
                            >
                                Quick Actions
                            </Typography>
                            <hr></hr>
                            <Box
                                sx={{
                                    px: 3,
                                    mb: 3,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1.5,
                                }}
                            >
                                <Tooltip title="Edit Profile" arrow>
                                    <IconButton
                                        component={Link}
                                        to="/editProfile"
                                        sx={{
                                            bgcolor: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(59, 130, 246, 0.2)",
                                            borderRadius: "12px",
                                            width: 48,
                                            height: 48,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                bgcolor: "rgba(255, 255, 255, 1)",
                                                transform: "scale(1.05) translateY(-2px)",
                                                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.2)",
                                            },
                                        }}
                                    >
                                        <Settings sx={{ color: "#3b82f6", fontSize: 22 }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Tickets" arrow>
                                    <IconButton
                                        component={Link}
                                        to="/ticketHistory"
                                        sx={{
                                            bgcolor: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(16, 185, 129, 0.2)",
                                            borderRadius: "12px",
                                            width: 48,
                                            height: 48,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                bgcolor: "rgba(255, 255, 255, 1)",
                                                transform: "scale(1.05) translateY(-2px)",
                                                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.2)",
                                            },
                                        }}
                                    >
                                        <ReceiptIcon sx={{ color: "#10b981", fontSize: 22 }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Support" arrow>
                                    <IconButton
                                        component="a"
                                        href="mailto:support@email.com"
                                        sx={{
                                            bgcolor: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(139, 92, 246, 0.2)",
                                            borderRadius: "12px",
                                            width: 48,
                                            height: 48,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                bgcolor: "rgba(255, 255, 255, 1)",
                                                transform: "scale(1.05) translateY(-2px)",
                                                boxShadow: "0 8px 25px rgba(139, 92, 246, 0.2)",
                                            },
                                        }}
                                    >
                                        <SupportIcon sx={{ color: "#8b5cf6", fontSize: 22 }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Switch Theme" arrow>
                                    <IconButton
                                        //   onClick={toggleTheme}
                                        sx={{
                                            bgcolor: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(245, 158, 11, 0.2)",
                                            borderRadius: "12px",
                                            width: 48,
                                            height: 48,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                bgcolor: "rgba(255, 255, 255, 1)",
                                                transform: "scale(1.05) translateY(-2px)",
                                                boxShadow: "0 8px 25px rgba(245, 158, 11, 0.2)",
                                            },
                                        }}
                                    >
                                        {'themeMode' === "light" ? (
                                            <Box sx={{ color: "#f59e0b", fontSize: 22 }}>🌙</Box>
                                        ) : (
                                            <Box sx={{ color: "#f59e0b", fontSize: 22 }}>☀️</Box>
                                        )}
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            {/* Bottom Section */}
                            <Box
                                sx={{
                                    p: 3,
                                    mt: "auto",
                                    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                                    borderBottomLeftRadius: 24,
                                    borderTop: "1px solid rgba(59, 130, 246, 0.1)",
                                }}
                            >
                                {auth.accessToken ? (
                                    <Button
                                        startIcon={<LogoutIcon />}
                                        onClick={handleLogout}
                                        fullWidth
                                        sx={{
                                            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                            color: "#fff",
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                            py: 1.5,
                                            borderRadius: "14px",
                                            boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                                                boxShadow: "0 8px 30px rgba(239, 68, 68, 0.4)",
                                                transform: "translateY(-2px)",
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
                                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                            color: "#fff",
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                            py: 1.5,
                                            borderRadius: "14px",
                                            boxShadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                                                boxShadow: "0 8px 30px rgba(16, 185, 129, 0.4)",
                                                transform: "translateY(-2px)",
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
                        <Link to="/" className="site-nav__brand">
                            <span className="site-nav__brand-mark"><i className="fas fa-bus" /></span>
                            <span className="site-nav__brand-text">SmartBus</span>
                        </Link>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        {/* Left links */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item me-lg-4">
                                <Link to="/" className="site-nav__brand">
                                    <span className="site-nav__brand-mark"><i className="fas fa-bus" /></span>
                                    <span className="site-nav__brand-text">SmartBus</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={navLinkClass}
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={navLinkClass}
                                    to="/about"
                                >
                                    About Us
                                </NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink
                                    className={navLinkClass}
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
                                    className={navLinkClass}
                                    to="/contact"
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink
                                    className={navLinkClass}
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
                                    className={navLinkClass}
                                    to="/bookTickets"
                                >
                                    Purchase Ticket
                                </NavLink>
                            </li>
                            {auth.accessToken && (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            className={navLinkClass}
                                            to="/bookedTicket"
                                        >
                                            Recent Ticket
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className={navLinkClass}
                                            to="/ticketHistory"
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
                                    <NavLink to="/signin" className="site-nav__btn site-nav__btn--ghost">
                                        Sign In
                                    </NavLink>

                                    <NavLink to="/signup" className="site-nav__btn site-nav__btn--primary">
                                        Get Started <i className="fas fa-arrow-right ms-1" style={{ fontSize: 12 }} />
                                    </NavLink>
                                </>

                            ) : (
                                <AccountMenu />
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
