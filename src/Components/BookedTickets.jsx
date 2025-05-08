import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Chip,
  Paper,
  IconButton,
  Dialog,
  Grow,
  Tooltip,
} from '@mui/material';
import { QrCode, MapPin, Clock, Calendar, InfoIcon } from 'lucide-react';
import Layout from '../../src/Components/Layout/Layout';
import { useAxiosWithInterceptor } from './Api/Axios';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
// import { useUserProfile } from './Context/UserProfileContext';
import { useAuth } from './Context/Context';
import { Close } from '@mui/icons-material';


const BookedTickets = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const api = useAxiosWithInterceptor();
  const [recentTickets, setRecentTickets] = useState([]);
  // const { userProfile } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const { auth = {} } = useAuth() || {};
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await api.get(`/tsn/v1/ticket/recent?timeZone=${timeZone}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.accessToken
          }
        });

        if (response.data && Array.isArray(response.data.results)) {
          setRecentTickets(response.data.results);
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, [timeZone, api]);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <Layout>
      <Helmet>
        <title>Recent Tickets</title>
        <meta name="description" content="View your recently booked tickets." />
      </Helmet>

      {/* <Box p={4}>
        <Grid container spacing={3}>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                width: '100%',
              }}
            >
              <CircularProgress size={50} sx={{ mr: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Loading Your Tickets...
              </Typography>
            </Box>
          ) : recentTickets.length > 0 ? (
            recentTickets.map((ticket) => (
              <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box mb={3}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <MapPin size={20} color="#2196f3" />
                        <Typography
                          variant="subtitle1"
                          sx={{ ml: 1, fontWeight: 600, color: '#1976d2' }}
                        >
                          Journey Details
                        </Typography>
                      </Box>

                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: 'rgba(33,150,243,0.04)',
                          p: 2.5,
                          borderRadius: 2,
                          border: '1px solid rgba(33,150,243,0.1)'
                        }}
                      >
                        <Typography variant="body1" fontWeight={500}>
                          {ticket.from}
                        </Typography>
                        <Box display="flex" alignItems="center" my={1.5}>
                          <Divider sx={{ flex: 1, borderStyle: 'dashed', borderWidth: '3px' }} />
                          <Chip
                            label="to"
                            size="small"
                            sx={{
                              mx: 1,
                              bgcolor: 'rgba(33,150,243,0.1)',
                              color: '#1976d2',
                              height: 24
                            }}
                          />
                          <Divider sx={{ flex: 1, borderStyle: 'dashed', borderWidth: '3px' }} />
                        </Box>
                        <Typography variant="body1" fontWeight={500}>
                          {ticket.to}
                        </Typography>
                      </Paper>
                    </Box>

                    <div>
      <Box
        display="flex"
        justifyContent="center"
        mb={3}
        sx={{
          p: 2,
          bgcolor: '#f8f9fa',
          borderRadius: 2,
          cursor: 'pointer',
        }}
        onClick={handleOpen} // Open modal on click
      >
        {ticket.qrCodeLink ? (
          <img
            src={ticket.qrCodeLink}
            alt="QR Code"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 8,
            }}
          />
        ) : (
          <QrCode size={80} color="#9e9e9e" />
        )}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Grow}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { p: 2, borderRadius: 4 },
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ p: 2 }}
        >
          {ticket.qrCodeLink ? (
            <img
              src={ticket.qrCodeLink}
              alt="QR Code"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 8,
              }}
            />
          ) : (
            <QrCode size={160} color="#9e9e9e" />
          )}
        </Box>
      </Dialog>
    </div>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: 'rgba(240, 240, 240, 0.5)',
                        p: 2,
                        mb:2,
                        borderRadius: 1
                      }}
                    >
                      <Box>
                      <Typography variant="caption" color="text.secondary">
                        Ticket Type
                          </Typography>
                        <Box ml={1}>
                          <Chip
                            label={`${ticket.ticketType}`}
                            sx={{
                              bgcolor: 'rgba(33,150,243,0.1)',
                              color: '#1976d2',
                              fontWeight: 500
                            }}
                          />
                        </Box>
                      </Box>
                      <Box>
                      <Typography variant="caption" color="text.secondary">
                        Ticket Status
                          </Typography>
                          <Box display="flex" alignItems="center" ml={1}>
      {ticket.active ? (
        <Chip
          label="Active"
          sx={{
            bgcolor: '#72BF78',
            color: 'white',
            fontWeight: 500,
          }}
        />
      ) : (
        <Chip
          label="Expired"
          sx={{
            bgcolor: '#FA7070',
            color: 'white',
            fontWeight: 500,
          }}
        />
      )}

      {!ticket.active && (
        <Tooltip
          title={
            <Box sx={{ p: 1, fontSize: '0.9rem' }}>
              {ticket.expiredMessage || 'No reason provided'}
            </Box>
          }
          arrow
          placement="top"
        >
          <IconButton size="small" sx={{ ml: 1, color: '#9e9e9e' }}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
                      </Box>
                    </Box>


                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 3,
                        bgcolor: 'rgba(0,0,0,0.02)',
                        borderRadius: 2
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary">
                            Fare
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            
                          <Chip 
                          label={`₹ ${ticket.price || '0'}`}
                          size="small"
                          sx={{ 
                            bgcolor: "#D4EBF8",
                            // color: theme.palette.primary.main,
                            fontWeight: 600,
                            borderRadius: 1
                          }}
                        />
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary">
                            Discount
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            <Chip 
                          label={`₹ ${ticket.discountedAmount || '0'}`}
                          size="small"
                          sx={{ 
                            bgcolor: "#D4EBF8",
                            // color: theme.palette.primary.main,
                            fontWeight: 600,
                            borderRadius: 1
                          }}
                        />
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary">
                            Net Payable
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            <Chip 
                          label={`₹ ${ticket.amountAfterDiscount || '0'}`}
                          size="small"
                          sx={{ 
                            bgcolor: "#D4EBF8",
                            // color: theme.palette.primary.main,
                            fontWeight: 600,
                            borderRadius: 1
                          }}
                        />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>

                    <Box display="flex" gap={3}>
                      <Box>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <Clock size={16} color="#2196f3" />
                          <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                            Time
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={500}>
                          {moment(ticket.createdAt, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss')}
                        </Typography>
                      </Box>
                      <Box>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <Calendar size={16} color="#2196f3" />
                          <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                            Date
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={500}>
                          {moment(ticket.createdAt, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY')}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                width: '100%',
                textAlign: 'center',
                mt: '150px',
                height: '20vh'
              }}
            >
              No tickets found.
            </Typography>
          )}
        </Grid>
      </Box> */}

<Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#f8fafc' }}>
      <Grid container spacing={3}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
              width: '100%',
            }}
          >
            <CircularProgress size={40} sx={{ color: '#133E87', mr: 2 }} />
            <Typography variant="h6" sx={{ color: '#133E87', fontWeight: 500 }}>
              Loading Your Tickets...
            </Typography>
          </Box>
        ) : recentTickets.length > 0 ? (
          recentTickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket.id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: '20px',
                  border: '1px solid rgba(19, 62, 135, 0.08)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(19, 62, 135, 0.1)',
                  }
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  {/* Journey Section */}
                  <Box mb={2.5}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box
                        sx={{
                          bgcolor: '#133E87',
                          borderRadius: '10px',
                          p: 0.75,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MapPin size={18} color="white" />
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ ml: 1.5, fontWeight: 700, color: '#133E87' }}
                      >
                        Journey Details
                      </Typography>
                    </Box>

                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: 'rgba(19, 62, 135, 0.03)',
                        p: 2,
                        borderRadius: '16px',
                        border: '1px solid rgba(19, 62, 135, 0.08)'
                      }}
                    >
                      <Typography variant="body1" fontWeight={600} color="#1A2027">
                        {ticket.from}
                      </Typography>
                      <Box display="flex" alignItems="center" my={1.5}>
                        <Divider sx={{ flex: 1, borderStyle: 'dashed', borderColor: '#133E87', opacity: 0.3 }} />
                        <Chip
                          label="to"
                          size="small"
                          sx={{
                            mx: 1.5,
                            bgcolor: 'rgba(19, 62, 135, 0.08)',
                            color: '#133E87',
                            height: 24,
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }}
                        />
                        <Divider sx={{ flex: 1, borderStyle: 'dashed', borderColor: '#133E87', opacity: 0.3 }} />
                      </Box>
                      <Typography variant="body1" fontWeight={600} color="#1A2027">
                        {ticket.to}
                      </Typography>
                    </Paper>
                  </Box>

                  {/* QR Code Section */}
                  <Box
                    onClick={handleOpen}
                    sx={{
                      p: 2,
                      mb: 2.5,
                      bgcolor: 'white',
                      borderRadius: '16px',
                      border: '1px solid rgba(19, 62, 135, 0.08)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: 'rgba(19, 62, 135, 0.02)'
                      }
                    }}
                  >
                    {ticket.qrCodeLink ? (
                      <img
                        src={ticket.qrCodeLink}
                        alt="QR Code"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '12px',
                        }}
                      />
                    ) : (
                      <QrCode size={80} color="#133E87" />
                    )}
                  </Box>

                  {/* Status and Type */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2.5,
                      gap: 2
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        p: 1.5,
                        bgcolor: 'rgba(19, 62, 135, 0.03)',
                        borderRadius: '12px',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Ticket Type
                      </Typography>
                      <Chip
                        label={ticket.ticketType}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(19, 62, 135, 0.08)',
                          color: '#133E87',
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        p: 1.5,
                        bgcolor: 'rgba(19, 62, 135, 0.03)',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" mb={0.5}>
                        Status
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Chip
                          label={ticket.active ? "Active" : "Expired"}
                          size="small"
                          sx={{
                            bgcolor: ticket.active ? '#72BF78' : '#FA7070',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }}
                        />
                        {!ticket.active && (
                          <Tooltip
                            title={ticket.expiredMessage || 'No reason provided'}
                            arrow
                            placement="top"
                          >
                            <IconButton size="small" sx={{ ml: 0.5, color: '#FA7070' }}>
                              <InfoIcon size={16} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* Price Details */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 2.5,
                      bgcolor: 'rgba(19, 62, 135, 0.03)',
                      borderRadius: '16px',
                      border: '1px solid rgba(19, 62, 135, 0.08)'
                    }}
                  >
                    <Grid container spacing={2}>
                      {[
                        { label: 'Fare', value: ticket.price },
                        { label: 'Discount', value: ticket.discountedAmount },
                        { label: 'Net Payable', value: ticket.amountAfterDiscount }
                      ].map((item) => (
                        <Grid item xs={4} key={item.label}>
                          <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                            {item.label}
                          </Typography>
                          <Chip
                            label={`₹ ${item.value || '0'}`}
                            size="small"
                            sx={{
                              bgcolor: 'white',
                              color: '#133E87',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              border: '1px solid rgba(19, 62, 135, 0.1)'
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>

                  {/* DateTime Section */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 3,
                      p: 1.5,
                      bgcolor: 'rgba(19, 62, 135, 0.03)',
                      borderRadius: '12px',
                    }}
                  >
                    {[
                      {
                        icon: <Clock size={16} color="#133E87" />,
                        label: 'Time',
                        value: moment(ticket.createdAt, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss')
                      },
                      {
                        icon: <Calendar size={16} color="#133E87" />,
                        label: 'Date',
                        value: moment(ticket.createdAt, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY')
                      }
                    ].map((item) => (
                      <Box key={item.label}>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          {item.icon}
                          <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                            {item.label}
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight={600} color="#1A2027">
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '50vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#133E87',
                fontWeight: 500,
                opacity: 0.7
              }}
            >
              No tickets found.
            </Typography>
          </Box>
        )}
      </Grid>

      {/* QR Code Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Grow}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { p: 2, borderRadius: 4 },
        }}
      >
        {/* Close Button */}
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        {/* QR Code in Modal */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ p: 2 }}
        >
          {/* {ticket.qrCodeLink ? ( */}
            <img
              // src={ticket.qrCodeLink}
              alt="QR Code"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 8,
              }}
            />
          ) : (
            <QrCode size={160} color="#9e9e9e" />
          )}
        </Box>
      </Dialog>
    </Box>
    </Layout>
  );
};

export default BookedTickets;

