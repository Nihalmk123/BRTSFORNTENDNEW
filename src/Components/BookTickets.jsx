import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useAuth } from '../Components/Context/Context';
import AsyncSelect from 'react-select/async';
import { useAxiosWithInterceptor } from './Api/Axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../src/Components/Layout/Layout';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';
import { Alert, Card, Chip, CircularProgress, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, chipClasses } from '@mui/material';
import { AccessTime, AccessTimeFilledRounded, AccessTimeOutlined, ArrowForward, ArrowForwardRounded, ClassSharp, ConfirmationNumberRounded, Error, Info, InfoOutlined, LocalOffer, LocationOn, LocationOnRounded, Mail, PaymentRounded, PaymentsOutlined, PersonOutline, Security, ShoppingBag, SwapVert, Warning } from '@mui/icons-material';
import { useUserProfile } from './Context/UserProfileContext';
import { InfoIcon, MailIcon } from 'lucide-react';
import {
  Divider,
  Stack,
  useTheme
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const BookTickets = () => {
  const [ticketType, setTicketType] = useState('Select Ticket Type');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [price, setPrice] = useState('');
  const [numPeople, setNumPeople] = useState(1); // New state for number of people
  const { auth } = useAuth();
  const [stations, setStations] = useState([]);
  const api = useAxiosWithInterceptor();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { userProfile } = useUserProfile();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // ticket type with count
  const [senior, setSenior] = useState(0);
  const [Child, setChild] = useState(0);
  const [SeniorCitizen, setSeniorCitizen] = useState(0);
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [isError, setIsError] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [openTableModal, setOpenTableModal] = useState(false);
  const [confirmloading, confirmsetLoading] = useState(false);

  const handleOpenTableModal = () => {
    setOpenTableModal(true);
  };

  const handleCloseTableModal = () => {
    setOpenTableModal(false);
  };


  // validation fro adult
  const handleSeniorChange = (event) => {
    const value = Number(event.target.value);
    const newTotal = value + Child + SeniorCitizen;

    if (newTotal <= 6) {
      setSenior(value);
      setIsError(false);
      checkSum(value, Child, SeniorCitizen);

      if (value === 0 && SeniorCitizen === 0) {
        setChild(0);
      }
    } else {
      setIsError(true);
      toast.error("Total number of passengers cannot exceed 6", {
        duration: 3000,
        id: 'passenger-limit'
      });
    }
  };


  // validation for child
  const handleChildChange = (event) => {
    const value = Number(event.target.value);
    const newTotal = senior + value + SeniorCitizen;

    if (newTotal <= 6) {
      if (senior > 0 || SeniorCitizen > 0) {
        setChild(value);
        setIsError(false);
        checkSum(senior, value, SeniorCitizen);
      }
    } else {
      setIsError(true);
      toast.error("Total number of passengers cannot exceed 6", {
        duration: 3000,
        id: 'passenger-limit'
      });
    }
  };

  // validation for seniorCitizenn
  const handleSeniorCitizenChange = (event) => {
    const value = Number(event.target.value);
    const newTotal = senior + Child + value;

    if (newTotal <= 6) {
      setSeniorCitizen(value);
      setIsError(false);
      checkSum(senior, Child, value);
      if (senior === 0 && value === 0) {
        setChild(0);
      }
    } else {
      setIsError(true);
      toast.error("Total number of passengers cannot exceed 6", {
        duration: 3000,
        id: 'passenger-limit'
      });
    }
  };

  const checkSum = (s, c, sc) => {
    const total = s + c + sc;
    setTotalPassengers(total);

    if (total >= 6) {
      setIsDisabled(true);
    } else {
      setError("");
      setIsDisabled(false);
    }
  };

  const isChildDisabled = () => {
    return senior === 0 && SeniorCitizen === 0;
  };

  // Fetch stations (From and To data) from the backend
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = auth.accessToken;
        const response = await api.get(`/tsn/v1/stops/all`, {
          headers: {
            Authorization: token,
          },
        });

        const stationOptions = response.data.results.map((stationName) => ({
          label: stationName,
          value: stationName,
        }));

        setStations(stationOptions);
      } catch (error) {
        toast.error(`Error fetching stations: ${error.message}`);
      }
    };

    fetchStations();
  }, [api]);

  const filterStations = (inputValue, excludeStation) => {
    return stations
      .filter((station) => station.label.toLowerCase().includes(inputValue.toLowerCase()))
      .filter((station) => station.value !== excludeStation);
  };

  const loadFromOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filtered = filterStations(inputValue, to ? to.value : '');
      callback(filtered);
    }, 500);
  };

  const loadToOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filtered = filterStations(inputValue, from ? from.value : '');
      callback(filtered);
    }, 500);
  };

  // const handleTicketTypeSelect = (selectedType) => {
  //   setTicketType(selectedType);
  // };

  const handleOpenModal = async () => {
    if (!from || !to || !senior && !Child && !SeniorCitizen) {
      toast.error('Please fill in all required fields.', { duration: 3000, id: 'limit' });
      return;
    }

    // Prepare passengers array
    const passengers = [];
    if (senior > 0) {
      passengers.push({
        ticketType: 'ADULT',
        numberOfTickets: senior,
      });
    }
    if (Child > 0) {
      passengers.push({
        ticketType: 'CHILD',
        numberOfTickets: Child,
      });
    }
    if (SeniorCitizen > 0) {
      passengers.push({
        ticketType: 'SENIOR_CITIZEN',
        numberOfTickets: SeniorCitizen,
      });
    }

    // Fetch fare
    try {
      const token = auth.accessToken;
      const response = await api.post(
        `/tsn/v1/fare/calculateFare`,
        {
          from: from.label,
          to: to.label,
          ticketDetails: passengers,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const fare = parseFloat(response.data.price).toFixed(2);
      setPrice(Number(fare));
      setTicketDetails(response.data.ticketDetails || []);
      setGrandTotal(response.data.grandTotal);

      setOpenModal(true); // Open modal after fare is successfully calculated
      toast.success('Fare fetched successfully', { duration: 3000 });
    } catch (error) {
      toast.error('Error fetching fare', { duration: 3000 });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  // purchase ticket
  // const handleConfirmPurchase = async () => {
  //   confirmsetLoading(true)
  //   try {
  //     const token = auth.accessToken || localStorage.getItem('token');
  //     const totalPrice = price * numPeople;

  //     // passengers array 
  //     const passengers = [];

  //     if (senior > 0) {
  //       passengers.push({
  //         ticketType: 'ADULT',
  //         numberOfTickets: senior
  //       });
  //     }

  //     if (Child > 0) {
  //       passengers.push({
  //         ticketType: 'CHILD',
  //         numberOfTickets: Child
  //       });
  //     }

  //     if (SeniorCitizen > 0) {
  //       passengers.push({
  //         ticketType: 'SENIOR_CITIZEN',
  //         numberOfTickets: SeniorCitizen
  //       });
  //     }

  //     const response = await api.post(
  //       `/tsn/v1/ticket/purchase-ticket`,
  //       {
  //         from: from.label,
  //         to: to.label,
  //         ticketDetails: passengers,
  //         price: totalPrice,
  //         timeZone: timeZone
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     alert('Ticket Purchase Successful', {
  //       duration: 3000, id: "purchaseTicket"
  //     });
  //     setFrom(null);
  //     setTo(null);
  //     setTicketType('Select Ticket Type');
  //     setPrice('');
  //     setNumPeople(1); // Reset the number of people after booking

  //     setOpenModal(false);

  //     setTimeout(() => {
  //       navigate('/bookedTicket');
  //     }, 1000);
  //   } catch (error) {
  //     toast.error(`Failed to book ticket: ${error.message}`);
  //   } finally {
  //     confirmsetLoading(false); // Stop the loader when done (either success or failure)
  //   }
  // };

  const handleConfirmPurchase = async () => {
    confirmsetLoading(true);
    let isPaymentFailedHandled = false;  
  
    try {
      const token = auth.accessToken || localStorage.getItem('token');
  
      const passengers = [];
      if (senior > 0) {
        passengers.push({
          ticketType: 'ADULT',
          numberOfTickets: senior,
        });
      }
      if (Child > 0) {
        passengers.push({
          ticketType: 'CHILD',
          numberOfTickets: Child,
        });
      }
      if (SeniorCitizen > 0) {
        passengers.push({
          ticketType: 'SENIOR_CITIZEN',
          numberOfTickets: SeniorCitizen,
        });
      }
  
      // Call backend to create an order
      const orderResponse = await api.post(
        `/tsn/v1/payment/create-order-id`,
        { amount: grandTotal },
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const orderId = orderResponse.data?.info?.orderId;
      const paymentReference = orderResponse.data?.info?.paymentReference;
  
      if (!orderId) {
        throw new Error('Order ID not found in the backend response.');
      }
  
      const options = {
        key: 'rzp_test_eOy3rwVzb63bbd',
        amount: grandTotal.toString(),
        currency: 'INR',
        name: 'ISTSBRTS',
        description: 'Ticket Purchase',
        order_id: orderId,
        prefill: {
          name: userProfile?.firstName || 'Guest',
          email: userProfile?.email || 'guest@example.com',
          contact: userProfile?.phoneNumber || '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
        handler: async (response) => {
          try {
            const paymentVerificationResponse = await api.post(
              `/tsn/v1/payment/handle-success`,
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                paymentSignature: response.razorpay_signature,
                paymentReference: paymentReference,
                ticketDto: {
                  from: from.label,
                  to: to.label,
                  ticketDetails: passengers,
                  timeZone: timeZone,
                },
              },
              {
                headers: {
                  Authorization: `${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
  
            if (
              paymentVerificationResponse.status === 200 &&
              paymentVerificationResponse.data?.message?.includes('Ticket purchase successful')
            ) {
              alert('Ticket Purchase Successful!');
              handleCloseModal();
              setFrom(null);
              setTo(null);
              setTicketType('Select Ticket Type');
              setPrice('');
              setNumPeople(1);
              setOpenModal(false);
              setTimeout(() => {
                navigate('/bookedTicket');
              }, 1000);
            } else {
              alert('Payment verification failed.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            if (error.response?.data?.Errors) {
              alert(`Payment verification failed: ${error.response.data.Errors.join(', ')}`);
            } else {
              alert(`Payment verification failed: ${error.message}`);
            }
          }
        },
        modal: {
          ondismiss: () => {
            alert('Payment cancelled.');
          },
        },
      };
  
      const razorpay = new window.Razorpay(options);
  
      razorpay.on('payment.failed', async (response) => {
        if (isPaymentFailedHandled) return; 
  
        isPaymentFailedHandled = true; 
  
        console.error('Payment failed:', response.error);

        const orderId = response.error.metadata.payment_id
        const paymentId = response.error.metadata.payment_id
        const description = response.error.description

        // const errorMessage = `Payment Failed:
        //   Code: ${response.error.code}
        //   Description: ${response.error.description}
        //   Source: ${response.error.source}
        //   Step: ${response.error.step}
        //   Reason: ${response.error.reason}
        //   Payment ID: ${response.error.metadata.payment_id}
        //   Order ID: ${response.error.metadata.order_id}`;
        // const note = errorMessage;
  
        // Sending failure details to the backend
        try {
          const failureResponse = await api.post(
            '/tsn/v1/payment/handle-failure',
            {
              ticketDto: {
                from: from.label,
                to: to.label,
                ticketDetails: passengers,
                timeZone: timeZone,
              },
              orderId:`${orderId}`,
              paymentId:`${paymentId}`,
              paymentReference: `${paymentReference}`,
              note: `${description}`,
            },
            {
              headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
  
          if (failureResponse.status === 200) {
            alert('Payment Failure Details Sent Successfully');
          }
        } catch (error) {
          console.error('Failed to send payment failure details:', error);
          alert('Failed to send payment failure details.');
        }
  
        alert(errorMessage);
      });
  
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert(`Failed to initiate payment: ${error.message}`);
    } finally {
      confirmsetLoading(false);
    }
  };
  
  
  

 
  return (
    <Layout>
      <Helmet>
        <title>Purchase-ticket</title>
      </Helmet>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0A1B48 0%, #1A237E 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/path-to-pattern.svg")', // Add subtle pattern
            opacity: 0.05,
            pointerEvents: 'none'
          },
          pt: { xs: 4, md: 6 },
          pb: { xs: 4, md: 6 }
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 6,
              alignItems: { xs: 'stretch', lg: 'flex-start' }
            }}
          >
            {/* Enhanced Left Section */}
            <Box
              sx={{
                flex: '0 0 450px',
                color: 'white',
                pt: { xs: 2, lg: 8 }
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 3,
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #E8EAF6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: '-0.02em'
                }}
              >
                Smart Travel Simplified-BRTS
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  mb: 4,
                  lineHeight: 1.6,
                  fontWeight: 400
                }}
              >
                Book your journey with confidence. Experience seamless travel booking with real-time updates and exclusive benefits.
              </Typography>

              <Stack spacing={3} sx={{ mb: 6 }}>
                <Stack direction="row" spacing={2}>
                  <Chip
                    icon={<AccessTime sx={{ color: '#1A237E' }} />}
                    label="Instant Booking"
                    sx={{
                      bgcolor: 'white',
                      fontWeight: 600,
                      '& .MuiChip-label': { color: '#1A237E' }
                    }}
                  />
                  <Chip
                    icon={<Security sx={{ color: '#1A237E' }} />}
                    label="Secure Payment"
                    sx={{
                      bgcolor: 'white',
                      fontWeight: 600,
                      '& .MuiChip-label': { color: '#1A237E' }
                    }}
                  />
                </Stack>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Stack spacing={2}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                      Today's Special Offers
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <LocalOffer sx={{ color: '#FFC107' }} />
                      <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                        20% off on weekend bookings
                      </Typography>
                    </Stack>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <LocalOffer sx={{ color: '#FFC107' }} />
                      <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                        Free cancellation within 24 hours
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>
            </Box>

            {/* Enhanced Right Section */}
            <Card
              sx={{
                borderRadius: { xs: '20px', sm: '24px' },
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                overflow: 'visible',
                maxWidth: '100%'
              }}
            >
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                {/* Header - Only visible on tablet and up */}
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    mb: 3
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      fontSize: '2rem',
                      color: '#133E87',
                      textAlign: 'center'
                    }}
                  >
                    Book Your Ticket
                  </Typography>
                </Box>

                <form onSubmit={handleConfirmPurchase}>
                  <Stack spacing={2}>
                    {/* Location Selection */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 2, sm: 3 },
                        bgcolor: 'rgba(248, 250, 252, 0.8)',
                        borderRadius: '16px',
                        border: '1px solid rgba(19, 62, 135, 0.1)'
                      }}
                    >
                      {/* From Station */}
                      <Box sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Box
                            sx={{
                              bgcolor: '#133E87',
                              borderRadius: '10px',
                              p: 0.75,
                              mr: 1.5
                            }}
                          >
                            <LocationOn sx={{ color: 'white', fontSize: '1.25rem' }} />
                          </Box>
                          <Typography variant="subtitle1" fontWeight={700} color="#1A2027">
                            From
                          </Typography>
                        </Box>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadFromOptions}
                          defaultOptions={stations.filter(station => station.value !== (to?.value))}
                          value={from}
                          onChange={setFrom}
                          placeholder="Select departure station"
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderRadius: '12px',
                              border: '1px solid rgba(19, 62, 135, 0.1)',
                              minHeight: '48px',
                              boxShadow: 'none',
                              '&:hover': {
                                borderColor: '#133E87'
                              }
                            })
                          }}
                        />
                      </Box>

                      {/* Swap Button */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', my: -3.2 }}>
                        <IconButton
                          sx={{
                            bgcolor: '#133E87',
                            width: 36,
                            height: 36,
                            mt: 4,
                            '&:hover': {
                              bgcolor: '#0F2F66',
                              transform: 'rotate(180deg)'
                            },
                            transition: 'all 0.3s ease-in-out'
                          }}
                        >
                          <SwapVert sx={{ color: 'white', fontSize: '1.25rem' }} />
                        </IconButton>
                      </Box>

                      {/* To Station */}
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Box
                            sx={{
                              bgcolor: '#133E87',
                              borderRadius: '10px',
                              p: 0.75,
                              mr: 1.5
                            }}
                          >
                            <LocationOn sx={{ color: 'white', fontSize: '1.25rem' }} />
                          </Box>
                          <Typography variant="subtitle1" fontWeight={700} color="#1A2027">
                            To
                          </Typography>
                        </Box>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadToOptions}
                          defaultOptions={stations.filter(station => station.value !== (from?.value))}
                          value={to}
                          onChange={setTo}
                          placeholder="Select destination station"
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderRadius: '12px',
                              border: '1px solid rgba(19, 62, 135, 0.1)',
                              minHeight: '48px',
                              boxShadow: 'none',
                              '&:hover': {
                                borderColor: '#133E87'
                              }
                            })
                          }}
                        />
                      </Box>
                    </Paper>

                    {/* Passengers Section */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 2, sm: 3 },
                        bgcolor: 'rgba(248, 250, 252, 0.8)',
                        borderRadius: '16px',
                        border: '1px solid rgba(19, 62, 135, 0.1)'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            bgcolor: '#133E87',
                            borderRadius: '10px',
                            p: 0.75,
                            mr: 1.5
                          }}
                        >
                          <PersonOutline sx={{ color: 'white', fontSize: '1.25rem' }} />
                        </Box>
                        <Typography variant="subtitle1" fontWeight={700} color="#1A2027">
                          Passengers
                        </Typography>
                      </Box>

                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        sx={{ '& .MuiTextField-root': { flex: 1 } }}
                      >
                        {[
                          { label: 'Adult', value: senior, onChange: handleSeniorChange },
                          { label: 'Child', value: Child, onChange: handleChildChange, disabled: isChildDisabled() },
                          { label: 'Senior', value: SeniorCitizen, onChange: handleSeniorCitizenChange }
                        ].map((field, index) => (
                          <TextField
                            key={index}
                            type="number"
                            label={field.label}
                            variant="outlined"
                            value={field.value}
                            onChange={field.onChange}
                            disabled={field.disabled}
                            InputProps={{
                              inputProps: { min: 0 },
                              sx: {
                                borderRadius: '12px',
                                height: '48px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'rgba(19, 62, 135, 0.1)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#133E87',
                                }
                              }
                            }}
                            error={isError}
                            helperText={isError ? "Maximum limit of 6 exceeded" : ""}
                          />
                        ))}
                      </Stack>
                    </Paper>

                    {/* Verification Alert */}
                    {(userProfile?.googleUser && !userProfile?.phoneNumberVerified) && (
                      <Alert
                        severity="warning"
                        icon={<Mail sx={{ color: '#F59E0B', fontSize: '1.25rem' }} />}
                        sx={{
                          borderRadius: '12px',
                          bgcolor: 'rgba(245, 158, 11, 0.05)',
                          border: '1px solid #F59E0B',
                          py: 1,
                          '& .MuiAlert-message': {
                            width: '100%',
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            justifyContent: 'space-between',
                            gap: 1
                          }
                        }}
                      >
                        <Typography fontWeight={600} fontSize="0.9rem">
                          Phone number verification required
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          // onClick={handleResendOtp}
                          sx={{
                            borderRadius: '8px',
                            borderColor: '#F59E0B',
                            color: '#F59E0B',
                            padding: '4px 12px',
                            fontSize: '0.8rem'
                          }}
                        >
                          Verify Now
                        </Button>
                      </Alert>
                    )}

                    {/* Confirm Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleOpenModal}
                      disabled={!userProfile?.emailVerified || !userProfile?.phoneNumberVerified}
                      sx={{
                        borderRadius: '12px',
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #133E87 0%, #0F2F66 100%)',
                        boxShadow: '0 4px 16px rgba(19, 62, 135, 0.25)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #0F2F66 0%, #0A1F40 100%)',
                          transform: 'translateY(-1px)'
                        }
                      }}
                      endIcon={<ArrowForward />}
                    >
                      Confirm Purchase
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          "& .MuiDialog-paper": {
            width: "380px",
            maxWidth: "90%",
            borderRadius: 3
          }
        }}
      >
        {/* confirm ticket modal */}
        <Container
          sx={{
            maxHeight: '100vh', // Ensure the container height is restricted
            overflowY: 'auto', // Enable vertical scrolling
            mt: 2,
            mb: 2,
          }}
          className="container-scroll">
          <Paper
            className="container-content"
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2 },
              bgcolor: 'background.paper',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >

            <Stack spacing={2}>
              {/* Header */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #024CAA 30%, #0077CC 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Confirm Purchase
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Review your booking details below
                </Typography>
              </Box>

              {/* From and To Section */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'rgba(2, 76, 170, 0.03)',
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(2, 76, 170, 0.1)',
                        p: 1,
                        borderRadius: 2,
                        display: 'flex',
                      }}
                    >
                      <LocationOnRounded sx={{ color: '#024CAA', fontSize: 24 }} />
                    </Box>
                    <Stack spacing={0.5} flex={1}>
                      <Typography variant="caption" sx={{ color: '#024CAA', fontWeight: 600 }}>
                        From
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {from?.label}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ArrowForwardRounded sx={{ color: '#024CAA', fontSize: 24 }} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(2, 76, 170, 0.1)',
                        p: 1,
                        borderRadius: 2,
                        display: 'flex',
                      }}
                    >
                      <LocationOnRounded sx={{ color: '#024CAA', fontSize: 24 }} />
                    </Box>
                    <Stack spacing={0.5} flex={1}>
                      <Typography variant="caption" sx={{ color: '#024CAA', fontWeight: 600 }}>
                        To
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {to?.label}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>

              {/* Tickets */}
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    color: '#024CAA',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <ConfirmationNumberRounded />

                  Selected Tickets
                </Typography>
                <Stack spacing={1}>
                  {ticketDetails.map(
                    (ticket) =>
                      ticket.numberOfTickets > 0 && (
                        <Paper
                          key={ticket.ticketType}
                          elevation={0}
                          sx={{
                            p: 1.5,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: 2,
                            bgcolor: 'rgba(2, 76, 170, 0.02)',
                          }}
                        >
                          <Stack spacing={0.5}>
                            <Typography sx={{ fontWeight: 700, color: '#024CAA', fontSize: '1rem' }}>
                              {ticket.ticketType}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Quantity
                            </Typography>
                          </Stack>
                          <Box
                            sx={{
                              bgcolor: '#024CAA',
                              px: 2,
                              py: 0.5,
                              borderRadius: 2,
                              minWidth: 36,
                            }}
                          >
                            <Typography sx={{ fontWeight: 700, color: 'white', textAlign: 'center' }}>
                              {ticket.numberOfTickets}
                            </Typography>
                          </Box>
                        </Paper>
                      )
                  )}
                </Stack>
              </Box>

              <Divider />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#024CAA",
                    fontWeight: 'bold'
                  }}
                >
                  Price Breakdown
                </Typography>
                <Tooltip title="More Information">
                  <IconButton
                    onClick={handleOpenTableModal}
                    size="small"
                    sx={{
                      color: "#133E87",
                      '&:hover': {
                        bgcolor: 'rgba(2, 76, 170, 0.08)'
                      }
                    }}
                  >
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider />

              {/* Important Info */}
              <Box>
                <Stack spacing={1}>
                  {/* <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        bgcolor: 'rgba(255, 152, 0, 0.08)',
                        borderRadius: 2,
                      }}
                    >

                      <AccessTimeFilledRounded sx={{ color: 'warning.main', fontSize: 24 }} />
                      <Typography sx={{ fontWeight: 600, color: 'warning.dark', fontSize: '0.9rem' }}>
                        Ticket valid for 3 hours.
                      </Typography>
                    </Paper> */}

                  {/* <Paper
            elevation={0}
            sx={{
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              bgcolor: '#155E95',
              borderRadius: 2,
            }}
          >
            <PaymentRounded sx={{ color: 'white', fontSize: 24 }} />
            <Typography sx={{ fontWeight: 600, color: 'white', fontSize: '0.9rem' }}>
              Razorpay Checkout is not supported on IE.
            </Typography>
          </Paper> */}
                  <Alert
                    severity="warning"
                    sx={{ mb: 3, borderRadius: 2 }}
                    icon={<Warning />}
                  >
                    Ticket is valid for only 3 hours
                  </Alert>
                  <Alert
                    severity="info"
                    sx={{ mb: 3, borderRadius: 2 }}
                    icon={<InfoIcon />}
                  >
                    Razorpay Checkout is not supported on IE.
                  </Alert>
                </Stack>
              </Box>
              {/* Grand Total */}
              <Divider />

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  background: 'linear-gradient(45deg, #024CAA 30%, #0077CC 90%)',
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' }}>
                    Grand Total
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }}>
                    ₹ {grandTotal}
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Paper>
        </Container>

        {/* <DialogContent>
            <Stack spacing={2.5}>
              <Box sx={{
                bgcolor: 'rgba(2, 76, 170, 0.03)',
                p: 2,
                borderRadius: 2,
                border: '1px solid rgba(2, 76, 170, 0.1)'
              }}>
                <Stack spacing={1.5}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography
                      sx={{
                        color: '#024CAA',
                        width: 60,
                        fontWeight: 600
                      }}
                    >
                      From
                    </Typography>
                    <Typography fontSize="1rem">
                      {from?.label}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography
                      sx={{
                        color: '#024CAA',
                        width: 60,
                        fontWeight: 600
                      }}
                    >
                      To
                    </Typography>
                    <Typography fontSize="1rem">
                      {to?.label}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box sx={{ py: 0 }}>
                {ticketDetails.map((ticket) =>
                  ticket.numberOfTickets > 0 ? (
                    <Box
                      key={ticket.ticketType}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                        p: 0.2,
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: 'rgba(2, 76, 170, 0.02)'
                        }
                      }}
                    >
                      <Typography>
                        <strong style={{ color: '#024CAA' }}>
                          {ticket.ticketType}:
                        </strong>
                      </Typography>
                      <Typography fontSize="1rem">
                        {ticket.numberOfTickets}
                      </Typography>
                    </Box>
                  ) : null
                )}
              </Box>
              <hr style={{ color: "#074799" }} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#024CAA",
                    fontWeight: 'bold'
                  }}
                >
                  Ticket Details
                </Typography>
                <Tooltip title="More Information">
                  <IconButton
                    onClick={handleOpenTableModal}
                    size="small"
                    sx={{
                      color: "#133E87",
                      '&:hover': {
                        bgcolor: 'rgba(2, 76, 170, 0.08)'
                      }
                    }}
                  >
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <hr style={{ color: "#074799" }} />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  bgcolor: 'rgba(255, 152, 0, 0.1)',
                  borderRadius: 1
                }}
              >
                <AccessTimeFilledIcon sx={{ color: 'warning.main' }} />
                <Typography
                  className='fw-bold'
                  sx={{ color: 'warning.dark' }}
                >
                  The ticket will be valid only for 3 hours.
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: '#024CAA',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  Grand Total
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  ₹ {grandTotal}
                </Typography>
              </Box>
            </Stack>
          </DialogContent> */}
        {/* confirm ticket modal */}


        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            backgroundColor: 'white',
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              color: 'text.secondary',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'text.secondary',
                backgroundColor: 'grey.50'
              }
            }}
          >
            Cancel
          </Button>

          {!confirmloading ? (
            <Button
              onClick={handleConfirmPurchase}
              variant="contained"
              size="large"
              disabled={confirmloading}
              startIcon={<PaymentsOutlined size={20} />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                backgroundColor: 'primary.main',
                boxShadow: 2,
                minWidth: 160,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  boxShadow: 4,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Proceed to Pay
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              disabled
              sx={{
                borderRadius: 2,
                minWidth: 160,
                backgroundColor: 'primary.main'
              }}
            >
              <CircularProgress size={24} sx={{ color: 'white' }} />
            </Button>
          )}
        </Box>

      </Dialog>

      {/* Detailed Price Breakdown Dialog */}
      <Dialog
        open={openTableModal}
        onClose={handleCloseTableModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle
          sx={{
            background: "#0A5EB0",
            color: 'white',
            py: 2,
            textAlign: 'center',
            fontWeight: 600
          }}
        >
          Price Break Down
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <TableContainer
            className='mt-3'
            component={Paper}
            elevation={0}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: 'rgba(96, 139, 193, 0.1)',
                    '& th': {
                      fontWeight: 600,
                      color: '#608BC1'
                    }
                  }}
                >
                  <TableCell align="center" sx={{ width: '5%' }}>#</TableCell>
                  <TableCell>Ticket Type</TableCell>
                  <TableCell align="center">Number of Tickets</TableCell>
                  <TableCell align="center">Discount per Ticket(₹)</TableCell>
                  <TableCell align="center">Total Discount(₹)</TableCell>
                  <TableCell align="center">Net Payable(₹)</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {ticketDetails.map((ticket, index) => (
                  <TableRow
                    key={ticket.ticketType}
                    sx={{
                      '&:nth-of-type(odd)': {
                        bgcolor: 'rgba(96, 139, 193, 0.03)'
                      },
                      '&:hover': {
                        bgcolor: 'rgba(96, 139, 193, 0.08)'
                      }
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{ticket.ticketType}</TableCell>
                    <TableCell align="center">{ticket.numberOfTickets}</TableCell>
                    <TableCell align="center">{ticket.discountAmountPerTicket}</TableCell>
                    <TableCell align="center">{ticket.totalDiscountAmount}</TableCell>
                    <TableCell align="center">{ticket.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow
                  sx={{
                    bgcolor: 'rgba(96, 139, 193, 0.1)',
                    '& td': {
                      fontWeight: 600,
                      color: '#608BC1'
                    }
                  }}
                >
                  <TableCell colSpan={5} align="right">
                    Grand Total
                  </TableCell>
                  <TableCell align="center">
                    {grandTotal}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            bgcolor: 'rgba(96, 139, 193, 0.05)'
          }}
        >
          <Button
            onClick={handleCloseTableModal}
            variant="contained"
            sx={{
              bgcolor: "#234EBB",
              px: 4,
              py: 1,
              fontSize: '13px',
              fontWeight: 600,
              '&:hover': {
                bgcolor: "#1a3b8e"
              }
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </Layout>
  );
};

// const backgroundStyles = {
//   backgroundColor: '#3FA2F6',
//   marginTop: "-26px",
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   backgroundRepeat: 'no-repeat',
//   borderRadiusBottom: '20px',
//   width: '100%',
//   height: 'auto',
//   minHeight: '240px',
// };

// const cardStyles = {
//   boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
//   borderRadius: '12px',
//   zIndex: 1,
//   transform: 'translateY(-100px)',
// };

export default BookTickets;


