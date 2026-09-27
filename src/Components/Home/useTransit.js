import { useEffect, useState } from 'react';
import { useAxiosWithInterceptor } from '../Api/Axios';
import { useAuth } from '../Context/Context';

// Live stops + a one-adult fare from the booking API. Both endpoints need a
// signed-in user, so `signedIn` tells callers when to show a sign-in prompt.
export const useStops = () => {
  const api = useAxiosWithInterceptor();
  const { auth } = useAuth() || {};
  const token = auth?.accessToken;
  const [stops, setStops] = useState([]);

  useEffect(() => {
    if (!token) return undefined;
    let alive = true;
    api
      .get('/tsn/v1/stops/all', { headers: { Authorization: token } })
      .then((res) => alive && setStops(res.data?.results || []))
      .catch(() => alive && setStops([]));
    return () => { alive = false; };
  }, [api, token]);

  return { stops, signedIn: Boolean(token) };
};

export const useFare = (from, to) => {
  const api = useAxiosWithInterceptor();
  const { auth } = useAuth() || {};
  const token = auth?.accessToken;
  const [state, setState] = useState({ fare: null, loading: false });

  useEffect(() => {
    if (!token || !from || !to || from === to) {
      setState({ fare: null, loading: false });
      return undefined;
    }
    let alive = true;
    setState({ fare: null, loading: true });
    api
      .post(
        '/tsn/v1/fare/calculateFare',
        { from, to, ticketDetails: [{ ticketType: 'ADULT', numberOfTickets: 1 }] },
        { headers: { Authorization: token } },
      )
      .then((res) => {
        const fare = Number(res.data?.grandTotal ?? res.data?.price);
        if (alive) setState({ fare: Number.isFinite(fare) ? fare : null, loading: false });
      })
      .catch(() => alive && setState({ fare: null, loading: false }));
    return () => { alive = false; };
  }, [api, token, from, to]);

  return state;
};

// Hand the picked stations to the booking page (it pre-fills from this).
export const bookState = (from, to) => ({
  from: from ? { label: from, value: from } : null,
  to: to ? { label: to, value: to } : null,
});
