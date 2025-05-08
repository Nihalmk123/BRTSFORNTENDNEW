// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   AppBar,
//   Toolbar,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   useTheme,
//   useMediaQuery,
//   Avatar,
//   Fade,
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   Person as PersonIcon,
//   TrendingUp as TrendingUpIcon,
//   Block as BlockIcon,
//   LocalOffer as DiscountIcon,
//   ConfirmationNumber as TicketIcon,
//   DirectionsRun as RunningIcon,
//   Event as EventIcon,
//   Menu as MenuIcon,
//   Close as CloseIcon,
// } from '@mui/icons-material';
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from 'dayjs';
// import { useAxiosWithInterceptor } from '../Api/Axios';
// import { useAuth } from '../Context/Context';
// import Header from '../Layout/Header';

// const drawerWidth = 280;

// const AdminDashboard = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [fromDate, setFromDate] = useState(dayjs().startOf('month'));
//   const [toDate, setToDate] = useState(dayjs());
//   const [adminData, setAdminData] = useState({
//     totalTickets: 0,
//     totalChildTickets: 0,
//     totalAdultTickets: 0,
//     totalSeniorTickets: 0,
//     totalPrice: 0,
//     totalDiscount: 0,
//     totalChildDiscount: 0,
//     totalAdultDiscount: 0,
//     totalSeniorDiscount: 0,
//     totalAmountAfterDiscount: 0,
//     totalActiveTickets: 0,
//     totalJourneyCompletedTickets: 0,
//     totalExpiredTickets: 0
//   });
//   const [activeItem, setActiveItem] = useState('Dashboard');

//   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const { auth = {} } = useAuth() || {};
//   const api = useAxiosWithInterceptor();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const fetchTicketDetails = async () => {
//     try {
//       const response = await api.post(
//         `/tsn/v1/admin/fetchTicketDetails?timeZone=${timeZone}`,
//         {
//           fromDate: fromDate.format("DD-MM-YYYYT00:00:00"),
//           toDate: toDate.format("DD-MM-YYYYT24:00:00")
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: auth?.accessToken,
//           },
//         }
//       );

//       if (response.data) {
//         setAdminData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//     }
//   };

//   useEffect(() => {
//     if (fromDate && toDate) {
//       fetchTicketDetails();
//     }
//   }, [fromDate, toDate]);

//   const cardColors = {
//     primary: '#1976d2',
//     secondary: '#0288d1',
//     info: '#0097a7',
//     success: '#0288d1',
//     warning: '#1565c0',
//     purple: '#5c6bc0',
//     teal: '#00796b',
//     deepBlue: '#1a237e',
//     royalBlue: '#283593',
//     navyBlue: '#0d47a1',
//     skyBlue: '#0277bd',
//     steelBlue: '#1565c0',
//     azure: '#006064'
//   };

//   const navItems = [
//     { text: 'Dashboard', icon: <DashboardIcon /> },
//   ];

//   const dashboardItems = [
//     {
//       title: "Total Tickets",
//       value: adminData.totalTickets,
//       icon: <TicketIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.primary
//     },
//     {
//       title: "Child Tickets",
//       value: adminData.totalChildTickets,
//       icon: <PersonIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.secondary
//     },
//     {
//       title: "Adult Tickets",
//       value: adminData.totalAdultTickets,
//       icon: <PersonIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.info
//     },
//     {
//       title: "Senior Tickets",
//       value: adminData.totalSeniorTickets,
//       icon: <PersonIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.success
//     },
//     {
//       title: "Total Price",
//       value: `₹${adminData.totalPrice.toFixed(2)}`,
//       icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.warning
//     },
//     {
//       title: "Total Discounts",
//       value: `₹${adminData.totalDiscount.toFixed(2)}`,
//       icon: <DiscountIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.purple
//     },
//     {
//       title: "Child Discounts",
//       value: `₹${adminData.totalChildDiscount.toFixed(2)}`,
//       icon: <DiscountIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.teal
//     },
//     {
//       title: "Adult Discounts",
//       value: `₹${adminData.totalAdultDiscount.toFixed(2)}`,
//       icon: <DiscountIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.deepBlue
//     },
//     {
//       title: "Senior Discounts",
//       value: `₹${adminData.totalSeniorDiscount.toFixed(2)}`,
//       icon: <DiscountIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.royalBlue
//     },
//     {
//       title: "Total Amount After Discount",
//       value: `₹${adminData.totalAmountAfterDiscount.toFixed(2)}`,
//       icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.navyBlue
//     },
//     {
//       title: "Active Tickets",
//       value: adminData.totalActiveTickets,
//       icon: <RunningIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.skyBlue
//     },
//     {
//       title: "Completed Journeys",
//       value: adminData.totalJourneyCompletedTickets,
//       icon: <EventIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.steelBlue
//     },
//     {
//       title: "Expired Tickets",
//       value: adminData.totalExpiredTickets,
//       icon: <BlockIcon sx={{ fontSize: 40, color: 'white' }} />,
//       color: cardColors.azure
//     }
//   ];

//   const drawer = (
//     <Box sx={{ height: '100%', background: '#F8FAFC' }}>
//       <List sx={{ p: 2 }}>
//         {navItems.map((item) => (
//           <ListItem
//             button
//             key={item.text}
//             onClick={() => setActiveItem(item.text)}
//             sx={{
//               borderRadius: 2,
//               mb: 1,
//               backgroundColor: activeItem === item.text ? 'primary.main' : 'transparent',
//               color: activeItem === item.text ? 'white' : 'inherit',
//               '&:hover': {
//                 backgroundColor: activeItem === item.text
//                   ? 'primary.dark'
//                   : 'rgba(0,0,0,0.04)',
//               },
//               transition: 'all 0.3s ease'
//             }}
//           >
//             <ListItemIcon sx={{
//               color: activeItem === item.text ? 'white' : 'inherit'
//             }}>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex', bgcolor: '#f5f5f7', minHeight: '100vh' }}>
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           ml: { md: `${drawerWidth}px` },
//           backgroundColor: 'white',
//           backdropFilter: 'blur(20px)',
//           boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//         }}
//       >
//         <Toolbar sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
//           {isMobile && (
//             <IconButton edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
//               <MenuIcon />
//             </IconButton>
//           )}
//           <Header />
//         </Toolbar>
//       </AppBar>

//       <Box
//         component="nav"
//         sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': {
//               boxSizing: 'border-box',
//               width: drawerWidth,
//               boxShadow: '4px 0 20px rgba(0,0,0,0.05)'
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': {
//               boxSizing: 'border-box',
//               width: drawerWidth,
//               boxShadow: '4px 0 20px rgba(0,0,0,0.05)',
//               border: 'none'
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: { xs: 2, sm: 3, md: 4 },
//           width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }
//         }}
//       >
//         <Toolbar />

//         <Card
//           sx={{
//             mb: 4,
//             borderRadius: 4,
//             overflow: "hidden",
//             position: "relative",
//             height: "250px",
//             background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
//           }}
//         >
//           <Box
//             sx={{
//               position: "relative",
//               zIndex: 1,
//               height: "100%",
//               p: 4,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <Typography
//               variant="h4"
//               sx={{
//                 color: "white",
//                 fontWeight: "bold",
//                 mb: 2,
//               }}
//             >
//               Select Date Range
//             </Typography>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: 2,
//                   flexDirection: { xs: "column", sm: "row" },
//                 }}
//               >
//                 <DatePicker
//                   label="From Date"
//                   value={fromDate}
//                   onChange={(newValue) => setFromDate(newValue)}
//                   sx={{ 
//                     width: '100%', 
//                     backgroundColor: 'white', 
//                     borderRadius: 2 
//                   }}
//                 />
//                 <DatePicker
//                   label="To Date"
//                   value={toDate}
//                   onChange={(newValue) => setToDate(newValue)}
//                   sx={{ 
//                     width: '100%', 
//                     backgroundColor: 'white', 
//                     borderRadius: 2 
//                   }}
//                 />
//               </Box>
//             </LocalizationProvider>
//           </Box>
//         </Card>

//         <Grid container spacing={3} sx={{ mt: 4 }}>
//           {dashboardItems.map((item, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//               <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
//                 <Card
//                   sx={{
//                     borderRadius: 4,
//                     boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//                     height: '100%',
//                     transition: 'transform 0.2s ease-in-out',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                     },
//                   }}
//                 >
//                   <CardContent>
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         mb: 2
//                       }}
//                     >
//                       <Avatar
//                         sx={{
//                           backgroundColor: item.color,
//                           width: 50,
//                           height: 50,
//                           boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
//                         }}
//                       >
//                         {item.icon}
//                       </Avatar>
//                     </Box>
//                     <Typography
//                       variant="subtitle1"
//                       color="text.secondary"
//                       sx={{ fontWeight: 500 }}
//                     >
//                       {item.title}
//                     </Typography>
//                     <Typography
//                       variant="h4"
//                       component="div"
//                       sx={{
//                         fontWeight: 600,
//                         mb: 1,
//                         color: 'text.primary'
//                       }}
//                     >
//                       {item.value}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   AppBar,
//   Toolbar,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   useTheme,
//   useMediaQuery,
//   Avatar,
//   Fade,
//   Paper,
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   Person as PersonIcon,
//   TrendingUp as TrendingUpIcon,
//   Block as BlockIcon,
//   LocalOffer as DiscountIcon,
//   ConfirmationNumber as TicketIcon,
//   DirectionsRun as RunningIcon,
//   Event as EventIcon,
//   Menu as MenuIcon,
// } from '@mui/icons-material';
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from 'dayjs';
// import { useAxiosWithInterceptor } from '../Api/Axios';
// import { useAuth } from '../Context/Context';
// import Header from '../Layout/Header';
// import { Link } from 'react-router-dom';

// const drawerWidth = 280;

// const AdminDashboard = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [fromDate, setFromDate] = useState(dayjs().startOf('month'));
//   const [toDate, setToDate] = useState(dayjs());
//   const [adminData, setAdminData] = useState({
//     totalTickets: 0,
//     totalChildTickets: 0,
//     totalAdultTickets: 0,
//     totalSeniorTickets: 0,
//     totalPrice: 0,
//     totalDiscount: 0,
//     totalChildDiscount: 0,
//     totalAdultDiscount: 0,
//     totalSeniorDiscount: 0,
//     totalAmountAfterDiscount: 0,
//     totalActiveTickets: 0,
//     totalJourneyCompletedTickets: 0,
//     totalExpiredTickets: 0
//   });
//   const [activeItem, setActiveItem] = useState('Dashboard');

//   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const { auth = {} } = useAuth() || {};
//   const api = useAxiosWithInterceptor();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const fetchTicketDetails = async () => {
//     try {
//       const response = await api.post(
//         `/tsn/v1/admin/fetchTicketDetails?timeZone=${timeZone}`,
//         {
//           fromDate: fromDate.format("DD-MM-YYYYT00:00:00"),
//           toDate: toDate.format("DD-MM-YYYYT24:00:00")
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: auth?.accessToken,
//           },
//         }
//       );

//       if (response.data) {
//         setAdminData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//     }
//   };

//   useEffect(() => {
//     if (fromDate && toDate) {
//       fetchTicketDetails();
//     }
//   }, [fromDate, toDate]);

//   const cardColors = {
//     primary: {
//       main: '#2196f3',
//       gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
//     },
//     secondary: {
//       main: '#3f51b5',
//       gradient: 'linear-gradient(135deg, #3f51b5 0%, #303f9f 100%)',
//     },
//     info: {
//       main: '#00bcd4',
//       gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
//     },
//     success: {
//       main: '#4caf50',
//       gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
//     },
//     warning: {
//       main: '#ff9800',
//       gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
//     },
//     purple: {
//       main: '#9c27b0',
//       gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
//     },
//     teal: {
//       main: '#009688',
//       gradient: 'linear-gradient(135deg, #009688 0%, #00796b 100%)',
//     },
//     deepBlue: {
//       main: '#1a237e',
//       gradient: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
//     }
//   };

//   const dashboardItems = [
//     {
//       title: "Total Tickets",
//       value: adminData.totalTickets,
//       icon: <TicketIcon />,
//       color: cardColors.primary,
//       subtitle: "All tickets issued"
//     },
//     {
//       title: "Child Tickets",
//       value: adminData.totalChildTickets,
//       icon: <PersonIcon />,
//       color: cardColors.secondary,
//       subtitle: "Children's tickets"
//     },
//     {
//       title: "Adult Tickets",
//       value: adminData.totalAdultTickets,
//       icon: <PersonIcon />,
//       color: cardColors.info,
//       subtitle: "Adult tickets"
//     },
//     {
//       title: "Senior Tickets",
//       value: adminData.totalSeniorTickets,
//       icon: <PersonIcon />,
//       color: cardColors.success,
//       subtitle: "Senior citizen tickets"
//     },
//     {
//       title: "Total Revenue",
//       value: `₹${adminData.totalPrice.toFixed(2)}`,
//       icon: <TrendingUpIcon />,
//       color: cardColors.warning,
//       subtitle: "Gross revenue"
//     },
//     {
//       title: "Total Discounts",
//       value: `₹${adminData.totalDiscount.toFixed(2)}`,
//       icon: <DiscountIcon />,
//       color: cardColors.purple,
//       subtitle: "All discounts applied"
//     },
//     {
//       title: "Child Discounts",
//       value: `₹${adminData.totalChildDiscount.toFixed(2)}`,
//       icon: <DiscountIcon />,
//       color: cardColors.teal,
//       subtitle: "Discounts for children"
//     },
//     {
//       title: "Adult Discounts",
//       value: `₹${adminData.totalAdultDiscount.toFixed(2)}`,
//       icon: <DiscountIcon />,
//       color: cardColors.deepBlue,
//       subtitle: "Discounts for adults"
//     },
//     {
//       title: "Senior Discounts",
//       value: `₹${adminData.totalSeniorDiscount.toFixed(2)}`,
//       icon: <DiscountIcon />,
//       color: {
//         main: '#e91e63',
//         gradient: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
//       },
//       subtitle: "Discounts for seniors"
//     },
//     {
//       title: "Net Revenue",
//       value: `₹${adminData.totalAmountAfterDiscount.toFixed(2)}`,
//       icon: <TrendingUpIcon />,
//       color: {
//         main: '#673ab7',
//         gradient: 'linear-gradient(135deg, #673ab7 0%, #512da8 100%)',
//       },
//       subtitle: "After all discounts"
//     },
//     {
//       title: "Active Tickets",
//       value: adminData.totalActiveTickets,
//       icon: <RunningIcon />,
//       color: {
//         main: '#00bcd4',
//         gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
//       },
//       subtitle: "Currently active"
//     },
//     {
//       title: "Completed Journeys",
//       value: adminData.totalJourneyCompletedTickets,
//       icon: <EventIcon />,
//       color: {
//         main: '#4caf50',
//         gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
//       },
//       subtitle: "Finished trips"
//     },
//     {
//       title: "Expired Tickets",
//       value: adminData.totalExpiredTickets,
//       icon: <BlockIcon />,
//       color: {
//         main: '#f44336',
//         gradient: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
//       },
//       subtitle: "Unused & expired"
//     }
//   ];

//   const drawer = (
//     <Box sx={{ 
//       height: '100%', 
//       background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
//     }}>
//       <Box sx={{ 
//         p: 3, 
//         borderBottom: `1px solid ${theme.palette.divider}`,
//         background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
//       }}>
//         <Typography variant="h6" sx={{ 
//           fontWeight: 600, 
//           color: 'white',
//           display: 'flex',
//           alignItems: 'center',
//           gap: 1
//         }}>
//           <DashboardIcon /> Admin Dashboard
//         </Typography>
//       </Box>
//       <List sx={{ 
//         p: 2,
//         '& .MuiListItem-root': {
//           mb: 1,
//           borderRadius: 2,
//           '&:hover': {
//             background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.08) 0%, rgba(25, 118, 210, 0.08) 100%)',
//           }
//         }
//       }}>
//         {[{ text: 'Dashboard', icon: <DashboardIcon /> }].map((item) => (
//           <ListItem
//             button
//             key={item.text}
//             onClick={() => setActiveItem(item.text)}
//             sx={{
//               background: activeItem === item.text 
//                 ? 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)'
//                 : 'transparent',
//               color: activeItem === item.text ? 'white' : theme.palette.text.primary,
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 background: activeItem === item.text 
//                   ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
//                   : 'linear-gradient(135deg, rgba(33, 150, 243, 0.08) 0%, rgba(25, 118, 210, 0.08) 100%)',
//               },
//             }}
//           >
//             <ListItemIcon sx={{
//               color: activeItem === item.text ? 'white' : theme.palette.primary.main
//             }}>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText 
//               primary={item.text}
//               primaryTypographyProps={{
//                 fontWeight: 500
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex', bgcolor: '#f8f9ff', minHeight: '100vh' }}>
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           ml: { md: `${drawerWidth}px` },
//           background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
//           borderBottom: `1px solid ${theme.palette.divider}`,
//           backdropFilter: 'blur(20px)',
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { md: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           {/* <Header /> */}
//           <Link to={'/'}>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "black",
//                 fontWeight: 600,
//               }}
//             >
//               home
//             </Typography>
//           </Link>
//         </Toolbar>
//       </AppBar>

//       <Box
//         component="nav"
//         sx={{ 
//           width: { md: drawerWidth }, 
//           flexShrink: { md: 0 },
//         }}
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': {
//               width: drawerWidth,
//               boxSizing: 'border-box',
//               background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
//               boxShadow: theme.shadows[8]
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': {
//               width: drawerWidth,
//               boxSizing: 'border-box',
//               border: 'none',
//               background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
//               boxShadow: '4px 0 24px rgba(0, 0, 0, 0.05)'
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           mt: { xs: 8, md: 9 }
//         }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             mb: 4,
//             borderRadius: 4,
//             overflow: "hidden",
//             background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
//             position: 'relative'
//           }}
//         >
//           <Box
//             sx={{
//               p: 4,
//               position: 'relative',
//               zIndex: 1,
//             }}
//           >
//             <Typography
//               variant="h4"
//               sx={{
//                 color: "white",
//                 fontWeight: 700,
//                 mb: 3,
//               }}
//             >
//               Analytics Dashboard
//             </Typography>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <label className='text-white'>From-date</label>
//                   <DatePicker
//                     // label="From Date"
//                     value={fromDate}
//                     onChange={(newValue) => setFromDate(newValue)}
//                     sx={{
//                       width: '100%',
//                       '& .MuiInputBase-root': {
//                         bgcolor: 'white',
//                         borderRadius: 2,
//                       }
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <label className='text-white'>To-date</label>
//                   <DatePicker
//                     // label="To Date"
//                     value={toDate}
//                     onChange={(newValue) => setToDate(newValue)}
//                     sx={{
//                       width: '100%',
//                       '& .MuiInputBase-root': {
//                         bgcolor: 'white',
//                         borderRadius: 2,
//                       }
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </LocalizationProvider>
//           </Box>
//         </Paper>

//         <Grid container spacing={3}>
//           {dashboardItems.map((item, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//               <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
//                 <Card
//                   sx={{
//                     borderRadius: 4,
//                     background: item.color.gradient,
//                     height: '100%',
//                     transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: theme.shadows[10],
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ height: '100%', p: 3 }}>
//                     <Box sx={{ mb: 2 }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: 'rgba(255, 255, 255, 0.2)',
//                           width: 48,
//                           height: 48,
//                         }}
//                       >
//                         {item.icon}
//                       </Avatar>
//                     </Box>
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         color: 'rgba(255, 255, 255, 0.8)',
//                         fontWeight: 700,
//                         mb: 0.5,
//                       }}
//                     >
//                       {item.title}
//                     </Typography>
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         color: 'white',
//                         fontWeight: 700,
//                         mb: 0.5,
//                       }}
//                     >
//                       {item.value}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;




import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Fade,
  Paper,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  Block as BlockIcon,
  LocalOffer as DiscountIcon,
  ConfirmationNumber as TicketIcon,
  DirectionsRun as RunningIcon,
  Event as EventIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { useAxiosWithInterceptor } from '../Api/Axios';
import { useAuth } from '../Context/Context';
import Header from '../Layout/Header';
import { Link } from 'react-router-dom';

const drawerWidth = 280;

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs().startOf('month'));
  const [toDate, setToDate] = useState(dayjs());
  const [adminData, setAdminData] = useState({
    totalTickets: 0,
    totalChildTickets: 0,
    totalAdultTickets: 0,
    totalSeniorTickets: 0,
    totalPrice: 0,
    totalDiscount: 0,
    totalChildDiscount: 0,
    totalAdultDiscount: 0,
    totalSeniorDiscount: 0,
    totalAmountAfterDiscount: 0,
    totalActiveTickets: 0,
    totalJourneyCompletedTickets: 0,
    totalExpiredTickets: 0
  });
  const [activeItem, setActiveItem] = useState('Dashboard');

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { auth = {} } = useAuth() || {};
  const api = useAxiosWithInterceptor();

  // Enhanced color scheme
  const appColors = {
    header: {
      background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
      text: '#ffffff'
    },
    sidebar: {
      background: 'linear-gradient(90deg, #0d47a1 0%, #1565c0 100%)',
      itemHover: 'rgba(255, 255, 255, 0.1)',
      itemActive: 'rgba(255, 255, 255, 0.2)',
      text: '#ffffff'
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchTicketDetails = async () => {
    try {
      const response = await api.post(
        `/tsn/v1/admin/fetchTicketDetails?timeZone=${timeZone}`,
        {
          fromDate: fromDate.format("DD-MM-YYYYT00:00:00"),
          toDate: toDate.format("DD-MM-YYYYT24:00:00")
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.accessToken,
          },
        }
      );

      if (response.data) {
        setAdminData(response.data);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchTicketDetails();
    }
  }, [fromDate, toDate]);

  const cardColors = {
    primary: {
      main: '#2196f3',
      gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    },
    secondary: {
      main: '#3f51b5',
      gradient: 'linear-gradient(135deg, #3f51b5 0%, #303f9f 100%)',
    },
    info: {
      main: '#00bcd4',
      gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
    },
    success: {
      main: '#4caf50',
      gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
    },
    warning: {
      main: '#ff9800',
      gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    },
    purple: {
      main: '#9c27b0',
      gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
    },
    teal: {
      main: '#009688',
      gradient: 'linear-gradient(135deg, #009688 0%, #00796b 100%)',
    },
    deepBlue: {
      main: '#1a237e',
      gradient: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
    }
  };

  const dashboardItems = [
    {
      title: "Total Tickets",
      value: adminData.totalTickets,
      icon: <TicketIcon />,
      color: cardColors.primary,
      subtitle: "All tickets issued"
    },
    {
      title: "Child Tickets",
      value: adminData.totalChildTickets,
      icon: <PersonIcon />,
      color: cardColors.secondary,
      subtitle: "Children's tickets"
    },
    {
      title: "Adult Tickets",
      value: adminData.totalAdultTickets,
      icon: <PersonIcon />,
      color: cardColors.info,
      subtitle: "Adult tickets"
    },
    {
      title: "Senior Tickets",
      value: adminData.totalSeniorTickets,
      icon: <PersonIcon />,
      color: cardColors.success,
      subtitle: "Senior citizen tickets"
    },
    {
      title: "Total Revenue",
      value: `₹${adminData.totalPrice.toFixed(2)}`,
      icon: <TrendingUpIcon />,
      color: cardColors.warning,
      subtitle: "Gross revenue"
    },
    {
      title: "Total Discounts",
      value: `₹${adminData.totalDiscount.toFixed(2)}`,
      icon: <DiscountIcon />,
      color: cardColors.purple,
      subtitle: "All discounts applied"
    },
    {
      title: "Child Discounts",
      value: `₹${adminData.totalChildDiscount.toFixed(2)}`,
      icon: <DiscountIcon />,
      color: cardColors.teal,
      subtitle: "Discounts for children"
    },
    {
      title: "Adult Discounts",
      value: `₹${adminData.totalAdultDiscount.toFixed(2)}`,
      icon: <DiscountIcon />,
      color: cardColors.deepBlue,
      subtitle: "Discounts for adults"
    },
    {
      title: "Senior Discounts",
      value: `₹${adminData.totalSeniorDiscount.toFixed(2)}`,
      icon: <DiscountIcon />,
      color: {
        main: '#e91e63',
        gradient: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
      },
      subtitle: "Discounts for seniors"
    },
    {
      title: "Net Revenue",
      value: `₹${adminData.totalAmountAfterDiscount.toFixed(2)}`,
      icon: <TrendingUpIcon />,
      color: {
        main: '#673ab7',
        gradient: 'linear-gradient(135deg, #673ab7 0%, #512da8 100%)',
      },
      subtitle: "After all discounts"
    },
    {
      title: "Active Tickets",
      value: adminData.totalActiveTickets,
      icon: <RunningIcon />,
      color: {
        main: '#00bcd4',
        gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
      },
      subtitle: "Currently active"
    },
    {
      title: "Completed Journeys",
      value: adminData.totalJourneyCompletedTickets,
      icon: <EventIcon />,
      color: {
        main: '#4caf50',
        gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
      },
      subtitle: "Finished trips"
    },
    {
      title: "Expired Tickets",
      value: adminData.totalExpiredTickets,
      icon: <BlockIcon />,
      color: {
        main: '#f44336',
        gradient: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
      },
      subtitle: "Unused & expired"
    }
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      background: appColors.sidebar.background,
      color: appColors.sidebar.text
    }}>
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          color: appColors.sidebar.text,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <DashboardIcon /> Admin Dashboard
        </Typography>
      </Box>
      <List sx={{ 
        p: 2,
        '& .MuiListItem-root': {
          mb: 1,
          borderRadius: 2,
          '&:hover': {
            background: appColors.sidebar.itemHover,
          }
        }
      }}>
        {[{ text: 'Dashboard', icon: <DashboardIcon /> }].map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => setActiveItem(item.text)}
            sx={{
              background: activeItem === item.text 
                ? appColors.sidebar.itemActive
                : 'transparent',
              color: appColors.sidebar.text,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: activeItem === item.text 
                  ? appColors.sidebar.itemActive
                  : appColors.sidebar.itemHover,
              },
            }}
          >
            <ListItemIcon sx={{
              color: appColors.sidebar.text
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: 500
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f8f9ff', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: appColors.header.background,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { md: 'none' },
              color: appColors.header.text
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              sx={{
                color: appColors.header.text,
                fontWeight: 600,
              }}
            >
              Home
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ 
          width: { md: drawerWidth }, 
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: appColors.sidebar.background,
              boxShadow: theme.shadows[8]
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              border: 'none',
              background: appColors.sidebar.background,
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 9 }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: "hidden",
            background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              p: 4,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: 700,
                mb: 3,
              }}
            >
              Analytics Dashboard
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'white', mb: 1 }}>From Date</Typography>
                  <DatePicker
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-root': {
                        bgcolor: 'white',
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'white', mb: 1 }}>To Date</Typography>
                  <DatePicker
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-root': {
                        bgcolor: 'white',
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {dashboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  sx={{
                    borderRadius: 4,
                    background: item.color.gradient,
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[10],
                    },
                  }}
                >
                  <CardContent sx={{ height: '100%', p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          width: 48,
                          height: 48,
                        }}
                      >
                        {item.icon}
                      </Avatar>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;