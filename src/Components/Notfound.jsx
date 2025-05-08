import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import not_found from '../../src/assets/not_found.png';

const Notfound = () => {
  return (
    <div
      className="pnf"
      style={{
        background: "#536493",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h2 className="pnf-title fw-bold text-white mx-2" style={{ fontSize: "4rem" }}>404</h2>
      <h2 className="pnf-heading text-white mx-2" style={{ fontSize: "2rem" }}>Oops! Page Not Found...</h2>
      <img src={not_found} alt="Not Found" className="img-fluid" style={{ maxWidth: "100%", height: "auto", margin: "20px 0" }} />
      <Link to="/" className="pnf-btn">
        <Button className='mx-2 text-dark fw-bold fs-6 px-4' variant="contained" size="small" style={{background:"#f3c623"}}>Home</Button>
      </Link>
    </div>
  );
};

export default Notfound;
