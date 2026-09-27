import { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';
import { CircularProgress, Container, Dialog, IconButton, useMediaQuery } from '@mui/material';
import {
  ArrowDownUp,
  ArrowRight,
  Baby,
  Check,
  Lock,
  MapPin,
  Minus,
  Navigation,
  Plus,
  QrCode,
  ShieldCheck,
  User,
  UserRound,
  X,
  Zap,
} from 'lucide-react';
import { useAuth } from '../Components/Context/Context';
import { useAxiosWithInterceptor } from './Api/Axios';
import Layout from '../../src/Components/Layout/Layout';
import { useUserProfile } from './Context/UserProfileContext';
import './BookTickets.css';

const MAX_PASSENGERS = 6;

const TYPE_LABEL = { ADULT: 'Adult', CHILD: 'Child', SENIOR_CITIZEN: 'Senior citizen' };

const inr = (n) => `₹${Number(n || 0).toFixed(2)}`;

// react-select, dressed to sit inside our own field frame.
const selectStyles = {
  control: (base) => ({
    ...base,
    minHeight: 30,
    border: 0,
    boxShadow: 'none',
    background: 'transparent',
    cursor: 'pointer',
  }),
  valueContainer: (base) => ({ ...base, padding: 0 }),
  singleValue: (base) => ({ ...base, color: '#0F172A', fontWeight: 700, fontSize: '1.05rem' }),
  placeholder: (base) => ({ ...base, color: '#94A3B8', fontWeight: 500 }),
  input: (base) => ({ ...base, margin: 0, padding: 0, fontWeight: 600 }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, padding: 4, color: '#94A3B8' }),
  menu: (base) => ({
    ...base,
    marginTop: 14,
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid #E2E8F0',
    boxShadow: '0 24px 48px -16px rgba(15,23,42,0.3)',
  }),
  menuList: (base) => ({ ...base, padding: 6 }),
  option: (base, state) => ({
    ...base,
    borderRadius: 10,
    padding: '10px 12px',
    cursor: 'pointer',
    fontWeight: state.isSelected ? 700 : 500,
    color: state.isSelected ? '#FFFFFF' : '#0F172A',
    background: state.isSelected ? '#2563EB' : state.isFocused ? '#EFF6FF' : 'transparent',
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

const BookTickets = () => {
  const [ticketType, setTicketType] = useState('Select Ticket Type');
  const prefill = useLocation().state || {}; // stations picked on the home page
  const [from, setFrom] = useState(prefill.from || null);
  const [to, setTo] = useState(prefill.to || null);
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
  const [confirmloading, confirmsetLoading] = useState(false);



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
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TUOCZ9ARTqvY0P',
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
              orderId: `${orderId}`,
              paymentId: `${paymentId}`,
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

        alert(`Payment failed: ${description}`);
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert(`Failed to initiate payment: ${error.message}`);
    } finally {
      confirmsetLoading(false);
    }
  };





  // Same passenger list the fare and payment calls build.
  const passengerList = () => [
    { ticketType: 'ADULT', numberOfTickets: senior },
    { ticketType: 'CHILD', numberOfTickets: Child },
    { ticketType: 'SENIOR_CITIZEN', numberOfTickets: SeniorCitizen },
  ].filter((p) => p.numberOfTickets > 0);

  const passengerCount = senior + Child + SeniorCitizen;
  const breakdown = ticketDetails.filter((t) => t.numberOfTickets > 0);
  const breakdownTickets = breakdown.reduce((n, t) => n + Number(t.numberOfTickets || 0), 0);
  const breakdownDiscount = breakdown.reduce((n, t) => n + Number(t.totalDiscountAmount || 0), 0);
  const routeReady = Boolean(from && to);
  const isPhone = useMediaQuery('(max-width:599.98px)');
  const canReview = routeReady && passengerCount > 0;

  // Live fare as the rider edits; the review step fetches it again before paying.
  const [preview, setPreview] = useState({ total: null, loading: false });
  useEffect(() => {
    if (!canReview) {
      setPreview({ total: null, loading: false });
      return undefined;
    }
    let alive = true;
    setPreview((p) => ({ ...p, loading: true }));
    const id = setTimeout(() => {
      api
        .post(
          '/tsn/v1/fare/calculateFare',
          { from: from.label, to: to.label, ticketDetails: passengerList() },
          { headers: { Authorization: auth.accessToken } }
        )
        .then((res) => alive && setPreview({ total: res.data?.grandTotal ?? null, loading: false }))
        .catch(() => alive && setPreview({ total: null, loading: false }));
    }, 350);
    return () => { alive = false; clearTimeout(id); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, auth.accessToken, from, to, senior, Child, SeniorCitizen]);

  const swapStops = () => {
    setFrom(to);
    setTo(from);
  };

  // The existing change handlers read event.target.value.
  const step = (handler, value) => handler({ target: { value } });

  const PASSENGERS = [
    { key: 'adult', icon: User, label: 'Adult', hint: 'Standard fare', value: senior, onChange: handleSeniorChange },
    { key: 'child', icon: Baby, label: 'Child', hint: 'Travels with an adult or senior', value: Child, onChange: handleChildChange, disabled: isChildDisabled() },
    { key: 'senior', icon: UserRound, label: 'Senior citizen', hint: 'Concession fare', value: SeniorCitizen, onChange: handleSeniorCitizenChange },
  ];

  const summaryPassengers = PASSENGERS.filter((p) => p.value > 0);

  const reviewButton = (className = '') => (
    <button type="submit" form="bk-form" className={`bk-cta ${className}`} disabled={!canReview}>
      Review &amp; pay <ArrowRight size={18} />
    </button>
  );

  const previewText = () => {
    if (!canReview) return '—';
    if (preview.loading) return 'Calculating…';
    return preview.total != null ? inr(preview.total) : 'Shown at review';
  };

  return (
    <Layout>
      <Helmet>
        <title>Book a ticket</title>
      </Helmet>
      <Toaster position="top-center" />

      <div className="bk">
        {/* Header band */}
        <header className="bk-head">
          <Container maxWidth="lg">
            <span className="bk-eyebrow"><Zap size={14} /> QR ticket in under a minute</span>
            <h1>Where are you headed?</h1>
            <p>Pick your stops and passengers. You’ll review the fare before paying.</p>
            <ol className="bk-steps" aria-label="Booking steps">
              <li className={routeReady ? 'is-done' : 'is-on'}><span>{routeReady ? <Check size={13} /> : 1}</span> Route</li>
              <li className={passengerCount > 0 ? 'is-done' : routeReady ? 'is-on' : ''}><span>{passengerCount > 0 ? <Check size={13} /> : 2}</span> Passengers</li>
              <li className={canReview ? 'is-on' : ''}><span>3</span> Review &amp; pay</li>
            </ol>
          </Container>
        </header>

        <Container maxWidth="lg" className="bk-body">
          <div className="bk-grid">
            {/* Form */}
            <form
              id="bk-form"
              className="bk-card"
              onSubmit={(e) => { e.preventDefault(); handleOpenModal(); }}
            >
              <section className="bk-section">
                <div className="bk-section__head">
                  <span className="bk-num">1</span>
                  <div>
                    <h2>Route</h2>
                    <p>Search or pick your boarding and destination stops.</p>
                  </div>
                </div>

                <div className="bk-route">
                  <label className="bk-stop">
                    <span className="bk-stop__icon bk-stop__icon--from"><MapPin size={16} /></span>
                    <span className="bk-stop__body">
                      <small>From</small>
                      <AsyncSelect
                        inputId="bk-from"
                        cacheOptions
                        loadOptions={loadFromOptions}
                        defaultOptions={stations.filter((station) => station.value !== to?.value)}
                        value={from}
                        onChange={setFrom}
                        placeholder="Boarding stop"
                        noOptionsMessage={() => 'No matching stop'}
                        menuPortalTarget={document.body}
                        styles={selectStyles}
                      />
                    </span>
                  </label>

                  <button type="button" className="bk-swap" onClick={swapStops} disabled={!from && !to} aria-label="Swap stops" title="Swap stops">
                    <ArrowDownUp size={16} />
                  </button>

                  <label className="bk-stop">
                    <span className="bk-stop__icon bk-stop__icon--to"><Navigation size={16} /></span>
                    <span className="bk-stop__body">
                      <small>To</small>
                      <AsyncSelect
                        inputId="bk-to"
                        cacheOptions
                        loadOptions={loadToOptions}
                        defaultOptions={stations.filter((station) => station.value !== from?.value)}
                        value={to}
                        onChange={setTo}
                        placeholder="Destination stop"
                        noOptionsMessage={() => 'No matching stop'}
                        menuPortalTarget={document.body}
                        styles={selectStyles}
                      />
                    </span>
                  </label>
                </div>
              </section>

              <section className="bk-section">
                <div className="bk-section__head">
                  <span className="bk-num">2</span>
                  <div>
                    <h2>Passengers</h2>
                    <p>Up to {MAX_PASSENGERS} passengers per booking.</p>
                  </div>
                  <span className={`bk-count${passengerCount >= MAX_PASSENGERS ? ' is-full' : ''}`}>
                    {passengerCount}/{MAX_PASSENGERS}
                  </span>
                </div>

                <div className="bk-pax">
                  {PASSENGERS.map(({ key, icon: Icon, label, hint, value, onChange, disabled }) => (
                    <div key={key} className={`bk-pax__row${disabled ? ' is-disabled' : ''}${value > 0 ? ' is-active' : ''}`}>
                      <span className="bk-pax__icon"><Icon size={18} /></span>
                      <div className="bk-pax__text">
                        <strong>{label}</strong>
                        <small>{hint}</small>
                      </div>
                      <div className="bk-stepper" role="group" aria-label={`${label} passengers`}>
                        <button type="button" onClick={() => step(onChange, value - 1)} disabled={disabled || value === 0} aria-label={`Remove ${label}`}>
                          <Minus size={16} />
                        </button>
                        <output aria-live="polite">{value}</output>
                        <button type="button" onClick={() => step(onChange, value + 1)} disabled={disabled || passengerCount >= MAX_PASSENGERS} aria-label={`Add ${label}`}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="bk-form-foot">
                <p><Lock size={14} /> Payments are processed securely by Razorpay.</p>
                {reviewButton('bk-cta--inline')}
              </div>
            </form>

            {/* Live summary */}
            <aside className="bk-summary" aria-label="Booking summary">
              <div className="bk-pass">
                <div className="bk-pass__top">
                  <div className="bk-pass__row">
                    <small>Your trip</small>
                    <em>{passengerCount} {passengerCount === 1 ? 'passenger' : 'passengers'}</em>
                  </div>
                  <div className="bk-pass__route">
                    <span><small>From</small><strong title={from?.label}>{from?.label || 'Select stop'}</strong></span>
                    <span className="bk-pass__line"><i /><ArrowRight size={16} /></span>
                    <span><small>To</small><strong title={to?.label}>{to?.label || 'Select stop'}</strong></span>
                  </div>
                </div>
                <div className="bk-pass__rip" />
                <div className="bk-pass__bottom">
                  {summaryPassengers.length ? (
                    <ul className="bk-lines">
                      {summaryPassengers.map((p) => (
                        <li key={p.key}><span>{p.label}</span><span>× {p.value}</span></li>
                      ))}
                    </ul>
                  ) : (
                    <p className="bk-muted">Add passengers to see your fare.</p>
                  )}
                  <div className="bk-total">
                    <span>Estimated total</span>
                    <strong className={preview.loading ? 'is-loading' : ''}>{previewText()}</strong>
                  </div>
                  {reviewButton()}
                </div>
              </div>

              <ul className="bk-trust">
                <li><QrCode size={16} /> QR ticket issued instantly after payment</li>
                <li><ShieldCheck size={16} /> Secure checkout via Razorpay</li>
                <li><Zap size={16} /> Scan at the gate, no paper needed</li>
              </ul>
              <Link to="/bookedTicket" className="bk-link">View my recent tickets <ArrowRight size={14} /></Link>
            </aside>
          </div>
        </Container>

        {/* Mobile sticky bar */}
        <div className={`bk-mobilebar${canReview ? ' is-on' : ''}`}>
          <div>
            <small>{passengerCount} {passengerCount === 1 ? 'passenger' : 'passengers'}</small>
            <strong>{previewText()}</strong>
          </div>
          {reviewButton()}
        </div>
      </div>

      {/* Review & pay */}
      <Dialog open={openModal} onClose={confirmloading ? undefined : handleCloseModal} maxWidth="sm" fullWidth fullScreen={isPhone} PaperProps={{ className: 'bk-dialog' }}>
        <div className="bk-review">
          <div className="bk-review__head">
            <div>
              <span className="bk-eyebrow bk-eyebrow--light">Step 3 of 3</span>
              <h2>Review &amp; pay</h2>
            </div>
            <IconButton onClick={handleCloseModal} disabled={confirmloading} aria-label="Close"><X size={18} /></IconButton>
          </div>

          <div className="bk-review__route">
            <div><small>From</small><strong>{from?.label}</strong></div>
            <ArrowRight size={18} />
            <div><small>To</small><strong>{to?.label}</strong></div>
          </div>

          {/* Cost breakdown: cards on phones, a table from 600px up */}
          <div className="bk-bd">
            <h3 className="bk-bd__title">Cost breakdown</h3>
            <table className="bk-bd__table">
              <thead>
                <tr>
                  <th scope="col">Passenger</th>
                  <th scope="col">Tickets</th>
                  <th scope="col">Discount / ticket</th>
                  <th scope="col">Total discount</th>
                  <th scope="col">Net payable</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((t) => (
                  <tr key={t.ticketType}>
                    <th scope="row" data-label="Passenger">{TYPE_LABEL[t.ticketType] || t.ticketType}</th>
                    <td data-label="Tickets">{t.numberOfTickets}</td>
                    <td data-label="Discount / ticket">{inr(t.discountAmountPerTicket)}</td>
                    <td data-label="Total discount" className={Number(t.totalDiscountAmount) > 0 ? 'is-green' : ''}>
                      {Number(t.totalDiscountAmount) > 0 ? `−${inr(t.totalDiscountAmount)}` : inr(0)}
                    </td>
                    <td data-label="Net payable" className="is-strong">{inr(t.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Total</th>
                  <td data-label="Tickets">{breakdownTickets}</td>
                  <td aria-hidden="true" />
                  <td data-label="Total discount" className={breakdownDiscount > 0 ? 'is-green' : ''}>
                    {breakdownDiscount > 0 ? `−${inr(breakdownDiscount)}` : inr(0)}
                  </td>
                  <td data-label="Net payable" className="is-strong">{inr(grandTotal)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="bk-review__total">
            <span>Total payable</span>
            <strong>{inr(grandTotal)}</strong>
          </div>

          <div className="bk-review__actions">
            <button type="button" className="bk-btn bk-btn--ghost" onClick={handleCloseModal} disabled={confirmloading}>Back</button>
            <button type="button" className="bk-btn bk-btn--primary" onClick={handleConfirmPurchase} disabled={confirmloading}>
              {confirmloading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <><Lock size={16} /> Pay {inr(grandTotal)}</>}
            </button>
          </div>
          <p className="bk-review__note"><ShieldCheck size={14} /> You’ll complete payment in Razorpay’s secure window.</p>
        </div>
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


