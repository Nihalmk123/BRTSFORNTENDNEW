import React from 'react';
import {
  Box,
  Card,
  Container,
  Typography,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Receipt,
  Download,
  Print,
  ArrowForward,
  Person,
  CreditCard,
} from '@mui/icons-material';
import Layout from './Layout/Layout';
import { Helmet } from 'react-helmet-async';

const PaymentInfo = () => {
  const theme = useTheme();
  
  const paymentDetails = {
    transactionId: "TXN123456789",
    date: "2024-12-31",
    time: "14:30",
    status: "Completed",
    amount: "₹450.00",
    paymentMethod: "Credit Card •••• 1234",
    tickets: [
      { type: "Adult", quantity: 2, price: "₹150.00", total: "₹300.00" },
      { type: "Child", quantity: 1, price: "₹100.00", total: "₹100.00" },
      { type: "Senior", quantity: 1, price: "₹50.00", total: "₹50.00" }
    ],
    route: { from: "Dharwad New Bustand", to: "Court Circle" }
  };

  return (
    <Layout>
      <Helmet>
              <title>Payment-Details</title>
            </Helmet>
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.1)})`,
      py: 4
    }}>
      <Container maxWidth="xl">
        <Card sx={{ 
          mb: 3, 
          p: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          borderRadius: 4,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} 
                 justifyContent="space-between" 
                 alignItems="center"
                 spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: 56,
                height: 56
              }}>
                <Receipt sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {paymentDetails.transactionId}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                  <Chip
                    label={paymentDetails.status}
                    color="success"
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {paymentDetails.date} • {paymentDetails.time}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              {/* <Button variant="outlined" startIcon={<Download />} sx={{ borderRadius: 2 }}>
                Download
              </Button> */}
              {/* <Button variant="outlined" startIcon={<Print />} sx={{ borderRadius: 2 }}>
                Print
              </Button> */}
            </Stack>
          </Stack>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Journey Details</Typography>
              <Paper sx={{ 
                p: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                borderRadius: 3
              }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>From</Typography>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {paymentDetails.route.from}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                    <ArrowForward sx={{ color: theme.palette.primary.main }} />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>To</Typography>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {paymentDetails.route.to}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Card>

            <Card sx={{ 
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}>
              <Box sx={{ p: 3, borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
                <Typography variant="h6" fontWeight={600}>Ticket Details</Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Ticket Type</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Quantity</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentDetails.tickets.map((ticket, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ 
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main
                            }}>
                              <Person />
                            </Avatar>
                            <Typography fontWeight={500}>{ticket.type}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={ticket.quantity}
                            size="small"
                            sx={{ 
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              fontWeight: 500
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{ticket.price}</TableCell>
                        <TableCell align="right" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                          {ticket.total}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.02),
                      '& td': { borderBottom: 'none' }
                    }}>
                      <TableCell colSpan={3}>
                        <Typography variant="subtitle1" fontWeight={600}>Total Amount</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" color="primary" fontWeight={600}>
                          {paymentDetails.amount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ 
              p: 4,
              borderRadius: 4,
              background: `linear-gradient(145deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`
            }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 4 }}>Payment Summary</Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>Total Amount</Typography>
                <Typography variant="h3" fontWeight={700}>
                  {paymentDetails.amount}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>Payment Method</Typography>
                <Paper sx={{ 
                  p: 2,
                  // bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2
                }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <CreditCard />
                    <Typography fontWeight={500}>{paymentDetails.paymentMethod}</Typography>
                  </Stack>
                </Paper>
              </Box>

              <Button 
                fullWidth 
                variant="contained"
                startIcon={<Download />}
                sx={{ 
                  mt: 4,
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: alpha('#fff', 0.9)
                  }
                }}
              >
                Download Receipt
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </Layout>
  );
};

export default PaymentInfo;