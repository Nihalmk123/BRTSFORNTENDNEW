import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tabs,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Divider,
  Stack,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import { useAxiosWithInterceptor } from './Api/Axios';
import { useAuth } from '../Components/Context/Context';
import Layout from './Layout/Layout';
import { ArrowRightAlt, Close, Info, KeyboardArrowLeft, KeyboardArrowRight, QrCode, Receipt, Warning, ZoomIn } from '@mui/icons-material';
import { InfoIcon, TicketIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  useMediaQuery,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const { auth } = useAuth();

  const [value, setValue] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [Activetickets, setActiveTickets] = useState([]);
  const [Expiredtickets, setExpiredTickets] = useState([]);
  const [failedTickets, setFailedTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const api = useAxiosWithInterceptor();
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMoreDetails = async (ticket) => {
    const token = auth.accessToken;
    try {
      const response = await api.post(
        '/tsn/v1/payment/get-payment-details',
        { paymentId: ticket.paymentDetailDto.paymentId },
        { headers: { Authorization: token } }
      );
      setPaymentDetails(response.data); // Save the API response
      setOpen(true); // Open the dialog after data is set
    } catch (error) {
      console.error('Error fetching payment details:', error);
      alert('Failed to fetch payment details. Please try again later.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentDetails(null);
  };
  const handleOpen = () => {
    setOpen(true);
    setPaymentDetails(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatDateTime = (dateTime) => {
    return moment(dateTime, "DD-MM-YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
  };

  // Fetch tickets based on the selected tab
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const token = auth.accessToken;
        if (!token) {
          console.error('No token found. Redirecting to login...');
          return;
        }

        const response = await api.get(`/tsn/v1/ticket/all?timeZone=${timeZone}&pageNumber=${page}&pageSize=${rowsPerPage}`, {
          headers: { Authorization: token },
        });

        const { tickets, totalPages, totalElements } = response.data;
        setTickets(tickets);
        setTotalPages(totalPages);
        setTotalElements(totalElements);

      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access. Redirecting to login...');
        } else {
          console.error('Error fetching ticket data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (value === 0) {
      fetchTickets();
    }
  }, [api, page, rowsPerPage, value]);

  // active tickets
  useEffect(() => {
    const fetchActiveTickets = async () => {
      setLoading(true);
      try {
        const token = auth.accessToken;
        if (!token) {
          console.error('No token found. Redirecting to login...');
          return;
        }

        const response = await api.get(`/tsn/v1/ticket/all/active?timeZone=${timeZone}&pageNumber=${page}&pageSize=${rowsPerPage}`, {
          headers: { Authorization: token },
        });

        const { tickets, totalPages, totalElements } = response.data;
        setActiveTickets(tickets);
        setTotalPages(totalPages);
        setTotalElements(totalElements);

      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access. Redirecting to login...');
        } else {
          console.error('Error fetching Active ticket data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (value === 1) {
      fetchActiveTickets();
    }
  }, [api, page, rowsPerPage, value]);

  // expired tickets
  useEffect(() => {
    const fetchExpiredTickets = async () => {
      setLoading(true);
      try {
        const token = auth.accessToken;
        if (!token) {
          console.error('No token found. Redirecting to login...');
          return;
        }

        const response = await api.get(`/tsn/v1/ticket/all/expired?timeZone=${timeZone}&pageNumber=${page}&pageSize=${rowsPerPage}`, {
          headers: { Authorization: token },
        });

        const { tickets, totalPages, totalElements } = response.data;
        setExpiredTickets(tickets);
        setTotalPages(totalPages);
        setTotalElements(totalElements);

      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access. Redirecting to login...');
        } else {
          console.error('Error fetching ticket data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (value === 2) {
      fetchExpiredTickets();
    }
  }, [api, page, rowsPerPage, value]);

  // failed tickets
  useEffect(() => {
    const fetchFailedTickets = async () => {
      setLoading(true);
      try {
        const token = auth.accessToken;
        if (!token) {
          console.error('No token found. Redirecting to login...');
          return;
        }

        const response = await api.get(`/tsn/v1/ticket/all/failed?timeZone=${timeZone}&pageNumber=${page}&pageSize=${rowsPerPage}`, {
          headers: { Authorization: token },
        });

        console.log(response)

        const { tickets, totalPages, totalElements } = response.data;
        setFailedTickets(response.data.failedTickets)
        setTotalPages(totalPages);
        setTotalElements(totalElements);

      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access. Redirecting to login...');
        } else {
          console.error('Error fetching ticket data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (value === 3) {
      fetchFailedTickets();
    }
  }, [api, page, rowsPerPage, value]);

  return (
    <Layout>
      <Helmet>
        <title>ticket History</title>
      </Helmet>
      <Box sx={{ bgcolor: '#F2F9FF', width: "100%" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            background="red"
          >
            <Tab label="ALL TICKETS" {...a11yProps(0)} />
            <Tab label="ACTIVE TICKETS" {...a11yProps(1)} />
            <Tab label="EXPIRED TICKETS" {...a11yProps(2)} />
            <Tab label="FAILED TICKETS" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        {/* All Tickets Tab */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                height: '500px',
                bgcolor: 'background.paper',
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CircularProgress size={64} thickness={4} sx={{ mb: 3 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Loading Your Tickets
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Please wait while we fetch your journey details
              </Typography>
            </Box>
          ) : (
            <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
                {/* <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Tickets
      </Typography> */}

                <TableContainer sx={{ maxHeight: 650 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            py: 2.5
                          }}
                        >
                          Journey Details
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          Ticket Info
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          Pricing Details
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          QR Code
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tickets.map((ticket) => (
                        <TableRow
                          key={ticket.id}
                          sx={{
                            '&:hover': {
                              bgcolor: 'grey.50',
                              transition: 'all 0.3s ease'
                            }
                          }}
                        >
                          <TableCell sx={{ minWidth: 250 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography variant="body1" fontWeight={600}>
                                  {ticket.from}
                                </Typography>
                                <ArrowRightAlt sx={{ color: 'primary.main' }} />
                                <Typography variant="body1" fontWeight={600}>
                                  {ticket.to}
                                </Typography>
                              </Box>
                              <Chip
                                label={ticket.active ? 'Active' : 'Expired'}
                                color={ticket.active ? 'success' : 'error'}
                                size="small"
                                sx={{
                                  alignSelf: 'flex-start',
                                  fontWeight: 600,
                                  '& .MuiChip-label': { px: 1.5 }
                                }}
                              />
                            </Box>
                          </TableCell>

                          <TableCell sx={{ minWidth: 200 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Chip
                                label={
                                  ticket.ticketType === "SENIOR_CITIZEN"
                                    ? ticket.ticketType
                                      .split('_') // Split into words
                                      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                                      .join(' ') // Join words with spaces
                                    : ticket.ticketType
                                }
                                size="small"
                                sx={{
                                  alignSelf: 'flex-start',
                                  bgcolor: 'primary.lighter',
                                  color: 'primary.main',
                                  fontWeight: 600,
                                  '& .MuiChip-label': { px: 1.5 }
                                }}
                              />

                              <Typography variant="body2" fontWeight={500}>
                                {moment(ticket.createdAt, "DD-MM-YYYY HH:mm:ss").format('DD MMM YYYY')}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {moment(ticket.createdAt, "DD-MM-YYYY HH:mm:ss").format('HH:mm:ss')}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 2,
                                minWidth: 180
                              }}
                            >
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" color="text.secondary">Base Price</Typography>
                                  <Typography variant="body1" fontWeight={500}>₹{ticket.price.toFixed(2)}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" color="text.secondary">Discount</Typography>
                                  <Typography variant="body1" color="success.main" fontWeight={500}>
                                    -₹{ticket.discountedAmount}
                                  </Typography>
                                </Box>
                                <Divider />
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" fontWeight={600}>Total</Typography>
                                  <Typography variant="body1" fontWeight={600} color="primary.main">
                                    ₹{ticket.amountAfterDiscount}
                                  </Typography>
                                </Box>
                              </Box>
                            </Paper>
                          </TableCell>

                          <TableCell align="center">
                            {/* QR Code Container */}
                            <Box
                              onClick={handleOpen}
                              sx={{
                                position: 'relative',
                                display: 'inline-flex',
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 3,
                                '&:hover .zoom-icon': {
                                  opacity: 1,
                                },
                                cursor: 'pointer',
                              }}
                            >
                              {/* QR Code Image */}
                              <img
                                src={ticket.qrCodeLink}
                                alt="QR Code"
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '12px',
                                }}
                              />
                              {/* Zoom Icon Overlay */}
                              <Box
                                className="zoom-icon"
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                                  borderRadius: 3,
                                  opacity: 0,
                                  transition: 'opacity 0.2s',
                                }}
                              >
                                <ZoomIn sx={{ color: 'white' }} />
                              </Box>
                            </Box>

                            {/* Dialog for QR Code */}



                          </TableCell>

                          <TableCell align="right">
                            <Stack spacing={1.5}>
                              <Link to={'/paymentInfo'} style={{ textDecoration: 'none' }}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  size="medium"
                                  startIcon={<Receipt />}
                                  sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    boxShadow: 'none'
                                  }}
                                >
                                  View Details
                                </Button>
                              </Link>
                              {!ticket.active && (
                                <Tooltip title={ticket.expiredMessage || 'Ticket has expired'} arrow>
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    size="medium"
                                    startIcon={<Warning />}
                                    sx={{
                                      borderRadius: 2,
                                      textTransform: 'none',
                                      fontWeight: 600
                                    }}
                                  >
                                    Expired
                                  </Button>
                                </Tooltip>
                              )}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    '& .MuiTablePagination-select': {
                      borderRadius: 1,
                      mr: 1,
                    },
                  }}
                />
              </Box>
            </Paper>
          )}
        </TabPanel>


        {/* Active Tickets Tab */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                height: '500px',
                bgcolor: 'background.paper',
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CircularProgress size={64} thickness={4} sx={{ mb: 3 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Loading Your Tickets
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Please wait while we fetch your journey details
              </Typography>
            </Box>
          ) : (
            <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
                {/* <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Tickets
      </Typography> */}

                <TableContainer sx={{ maxHeight: 650 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            py: 2.5
                          }}
                        >
                          Journey Details
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          Ticket Info
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          Pricing Details
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          QR Code
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Activetickets.map((ticket) => (
                        <TableRow
                          key={ticket.id}
                          sx={{
                            '&:hover': {
                              bgcolor: 'grey.50',
                              transition: 'all 0.3s ease'
                            }
                          }}
                        >
                          <TableCell sx={{ minWidth: 250 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography variant="body1" fontWeight={600}>
                                  {ticket.from}
                                </Typography>
                                <ArrowRightAlt sx={{ color: 'primary.main' }} />
                                <Typography variant="body1" fontWeight={600}>
                                  {ticket.to}
                                </Typography>
                              </Box>
                              <Chip
                                label={
                                  ticket.ticketType === "SENIOR_CITIZEN"
                                    ? ticket.ticketType
                                      .split('_') // Split into words
                                      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                                      .join(' ') // Join words with spaces
                                    : ticket.ticketType
                                }
                                size="small"
                                sx={{
                                  alignSelf: 'flex-start',
                                  bgcolor: 'primary.lighter',
                                  color: 'primary.main',
                                  fontWeight: 600,
                                  '& .MuiChip-label': { px: 1.5 }
                                }}
                              />
                            </Box>
                          </TableCell>

                          <TableCell sx={{ minWidth: 200 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Chip
                                label={ticket.ticketType}
                                size="small"
                                sx={{
                                  alignSelf: 'flex-start',
                                  bgcolor: 'primary.lighter',
                                  color: 'primary.main',
                                  fontWeight: 600,
                                  '& .MuiChip-label': { px: 1.5 }
                                }}
                              />
                              <Typography variant="body2" fontWeight={500}>
                                {moment(ticket.createdAt, "DD-MM-YYYY HH:mm:ss").format('DD MMM YYYY')}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {moment(ticket.createdAt, "DD-MM-YYYY HH:mm:ss").format('HH:mm:ss')}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 2,
                                minWidth: 180
                              }}
                            >
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" color="text.secondary">Base Price</Typography>
                                  <Typography variant="body1" fontWeight={500}>₹{ticket.price.toFixed(2)}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" color="text.secondary">Discount</Typography>
                                  <Typography variant="body1" color="success.main" fontWeight={500}>
                                    -₹{ticket.discountedAmount}
                                  </Typography>
                                </Box>
                                <Divider />
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" fontWeight={600}>Total</Typography>
                                  <Typography variant="body1" fontWeight={600} color="primary.main">
                                    ₹{ticket.amountAfterDiscount}
                                  </Typography>
                                </Box>
                              </Box>
                            </Paper>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                position: 'relative',
                                display: 'inline-flex',
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 3,
                                '&:hover': {
                                  '& .zoom-icon': {
                                    opacity: 1
                                  }
                                }
                              }}
                            >
                              <img
                                src={ticket.qrCodeLink}
                                alt="QR Code"
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '12px'
                                }}
                              />
                              <Box
                                className="zoom-icon"
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                                  borderRadius: 3,
                                  opacity: 0,
                                  transition: 'opacity 0.2s',
                                  cursor: 'pointer'
                                }}
                              >
                                <ZoomIn sx={{ color: 'white' }} />
                              </Box>
                            </Box>
                          </TableCell>

                          <TableCell align="right">
                            <Stack spacing={1.5}>
                              <Button
                                fullWidth
                                variant="contained"
                                size="medium"
                                // startIcon={<Receipt />}
                                onClick={() => handleMoreDetails(ticket)}
                                sx={{
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  boxShadow: 'none'
                                }}
                              >
                                View More
                              </Button>
                              {!ticket.active && (
                                <Tooltip title={ticket.expiredMessage || 'Ticket has expired'} arrow>
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    size="medium"
                                    startIcon={<Warning />}
                                    sx={{
                                      borderRadius: 2,
                                      textTransform: 'none',
                                      fontWeight: 600
                                    }}
                                  >
                                    Expired
                                  </Button>
                                </Tooltip>
                              )}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    '& .MuiTablePagination-select': {
                      borderRadius: 1,
                      mr: 1,
                    },
                  }}
                />
              </Box>
            </Paper>
          )}
        </TabPanel>

        {/* Expired Tickets Tab */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                height: '500px',
                bgcolor: 'background.paper',
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CircularProgress size={64} thickness={4} sx={{ mb: 3 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Loading Your Tickets
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Please wait while we fetch your journey details
              </Typography>
            </Box>
          ) : (
            <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
                {/* <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Tickets
      </Typography> */}

                <TableContainer sx={{ maxHeight: 650 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            py: 2.5
                          }}
                        >
                          Journey Details
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          Ticket Info
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          Pricing Details
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          QR Code
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            bgcolor: 'grey.50',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Expiredtickets.map((ticket) => (
                        <TableRow
                          key={ticket.id}
                          sx={{
                            '&:hover': {
                              bgcolor: 'grey.50',
                              transition: 'all 0.3s ease'
                            }
                          }}
                        >
                          <TableCell sx={{ minWidth: 250 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Typography variant="body1" fontWeight={600}>
                                  {ticket.from}
                                </Typography>
                                <ArrowRightAlt sx={{ color: 'primary.main' }} />
                                <Typography variant="body1" fontWeight={600}>
                                  {ticket.to}
                                </Typography>
                              </Box>
                              <Chip
                                label={ticket.active ? 'Active' : 'Expired'}
                                color={ticket.active ? 'success' : 'error'}
                                size="small"
                                sx={{
                                  alignSelf: 'flex-start',
                                  fontWeight: 600,
                                  '& .MuiChip-label': { px: 1.5 }
                                }}
                              />
                            </Box>
                          </TableCell>

                          <TableCell sx={{ minWidth: 200 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Chip
                                label={
                                  ticket.ticketType === "SENIOR_CITIZEN"
                                    ? ticket.ticketType
                                      .split('_')
                                      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                                      .join(' ')
                                    : ticket.ticketType
                                }
                                size="small"
                                sx={{
                                  alignSelf: 'flex-start',
                                  bgcolor: 'primary.lighter',
                                  color: 'primary.main',
                                  fontWeight: 600,
                                  '& .MuiChip-label': { px: 1.5 }
                                }}
                              />
                              <Typography variant="body2" fontWeight={500}>
                                {moment(ticket.createdAt, "DD-MM-YYYY HH:mm:ss").format('DD MMM YYYY')}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {moment(ticket.createdAt, "DD-MM-YYYY HH:mm:ss").format('HH:mm:ss')}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 2,
                                minWidth: 180
                              }}
                            >
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" color="text.secondary">Base Price</Typography>
                                  <Typography variant="body1" fontWeight={500}>₹{ticket.price.toFixed(2)}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" color="text.secondary">Discount</Typography>
                                  <Typography variant="body1" color="success.main" fontWeight={500}>
                                    -₹{ticket.discountedAmount}
                                  </Typography>
                                </Box>
                                <Divider />
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" fontWeight={600}>Total</Typography>
                                  <Typography variant="body1" fontWeight={600} color="primary.main">
                                    ₹{ticket.amountAfterDiscount}
                                  </Typography>
                                </Box>
                              </Box>
                            </Paper>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                position: 'relative',
                                display: 'inline-flex',
                                p: 2,
                                bgcolor: 'grey.50',
                                borderRadius: 3,
                                '&:hover': {
                                  '& .zoom-icon': {
                                    opacity: 1
                                  }
                                }
                              }}
                            >
                              <img
                                src={ticket.qrCodeLink}
                                alt="QR Code"
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '12px'
                                }}
                              />
                              <Box
                                className="zoom-icon"
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                                  borderRadius: 3,
                                  opacity: 0,
                                  transition: 'opacity 0.2s',
                                  cursor: 'pointer'
                                }}
                              >
                                <ZoomIn sx={{ color: 'white' }} />
                              </Box>
                            </Box>
                          </TableCell>

                          <TableCell align="right">
                            <Stack spacing={1.5}>
                              <Button
                                fullWidth
                                variant="contained"
                                size="medium"
                                startIcon={<Receipt />}
                                onClick={() => handleMoreDetails(ticket)}
                                sx={{
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  boxShadow: 'none'
                                }}
                              >
                                View More
                              </Button>
                              {!ticket.active && (
                                <Tooltip title={ticket.expiredMessage || 'Ticket has expired'} arrow>
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    size="medium"
                                    startIcon={<Warning />}
                                    sx={{
                                      borderRadius: 2,
                                      textTransform: 'none',
                                      fontWeight: 600
                                    }}
                                  >
                                    Expired
                                  </Button>
                                </Tooltip>
                              )}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    '& .MuiTablePagination-select': {
                      borderRadius: 1,
                      mr: 1,
                    },
                  }}
                />
              </Box>
            </Paper>
          )}
        </TabPanel>

        {/* failed tickets */}
        <TabPanel value={value} index={3} dir={theme.direction}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '200px' }}>
              <CircularProgress size={50} sx={{ mr: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Loading Your Tickets...
              </Typography>
            </Box>
          ) : (
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 650 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          // backgroundColor: 'primary.main',
                          color: 'black',
                          fontWeight: 'bold'
                        }}
                      >
                        #
                      </TableCell>
                      <TableCell
                        sx={{
                          // backgroundColor: 'primary.main',
                          color: 'black',
                          fontWeight: 'bold'
                        }}
                      >
                        Journey Details
                      </TableCell>
                      <TableCell
                        sx={{
                          // backgroundColor: 'primary.main',
                          color: 'black',
                          fontWeight: 'bold'
                        }}
                      >
                        Ticket Details
                      </TableCell>
                      <TableCell
                        sx={{
                          // backgroundColor: 'primary.main',
                          color: 'black',
                          fontWeight: 'bold'
                        }}
                      >
                        Pricing
                      </TableCell>
                      <TableCell
                        sx={{
                          // backgroundColor: 'primary.main',
                          color: 'black',
                          fontWeight: 'bold'
                        }}
                      >
                        Order Details
                      </TableCell>
                      <TableCell
                        sx={{
                          // backgroundColor: 'primary.main',
                          color: 'black',
                          fontWeight: 'bold'
                        }}
                      >
                        Payment Information
                      </TableCell>
                      <TableCell
                        sx={{
                          // backgroundColor: 'primary.main',
                          color: 'black',
                          fontWeight: 'bold'
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{
                          // backgroundColor: 'primary.main',
                          color: 'black',
                          fontWeight: 'bold'
                        }}
                      >
                        Details
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {failedTickets.length > 0 ? (
                      failedTickets.map((ticket, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:hover': { backgroundColor: 'action.hover' },
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <Stack spacing={1}>
                              <Typography variant="subtitle2" color="primary.main">
                                From: {ticket.fromStop}
                              </Typography>
                              <Typography variant="subtitle2" color="text.secondary">
                                To: {ticket.toStop}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack spacing={1}>
                              {ticket.priceResponse.ticketDetails.map((detail, i) => (
                                <Chip
                                  key={i}
                                  label={`${detail.ticketType} (${detail.numberOfTickets})`}
                                  color={detail.ticketType === 'ADULT' ? 'primary' : 'secondary'}
                                  size="small"
                                  variant="filled"
                                  sx={{
                                    fontSize: '0.8rem', // Reduce font size
                                    height: '30px', // Optional: Adjust height
                                    width: "150px"
                                  }}
                                />
                              ))}
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                Base Price: ₹{ticket.price.toFixed(2)}
                              </Typography>
                              <Typography variant="body2" color="success.main">
                                Discount: ₹{ticket.priceResponse.ticketDetails
                                  .reduce((total, detail) => total + detail.totalDiscountAmount, 0)
                                  .toFixed(2)}
                              </Typography>
                              <Typography variant="subtitle2" color="primary.main">
                                Total: ₹{ticket.priceResponse.grandTotal.toFixed(2)}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Tooltip title="Order ID" arrow>
                                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                  {ticket.paymentDetailDto.orderId}
                                </Typography>
                              </Tooltip>
                              <Typography variant="caption" color="text.secondary">
                                Created: {formatDateTime(ticket.paymentDetailDto.orderCreatedAt)}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                ID: {ticket.paymentDetailDto.paymentId || "N/A"}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Created: {formatDateTime(ticket.paymentDetailDto.paymentCreatedAt)}
                              </Typography>
                              <Tooltip title={ticket.paymentDetailDto.note || "N/A"}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 200 }}
                                >
                                  Note: {ticket.paymentDetailDto.note ?
                                    `${ticket.paymentDetailDto.note.slice(0, 50)}${ticket.paymentDetailDto.note.length > 50 ? '...' : ''}`
                                    : "N/A"}
                                </Typography>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={ticket.paymentDetailDto.status}
                              color="error"
                              size="small"
                              sx={{
                                fontWeight: 'medium',
                                minWidth: '80px'
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => handleMoreDetails(ticket)}>More Details</Button>
                          </TableCell>


                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                          <Typography variant="h6" color="text.secondary">
                            No Failed Tickets Found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                  '& .MuiTablePagination-select': {
                    borderRadius: 1,
                    mr: 1,
                  },
                }}
              />
            </Paper>
          )}
        </TabPanel>
      </Box>
    </Layout>
  );
}
