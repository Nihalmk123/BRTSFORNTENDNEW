import React, { useEffect } from 'react';
import { preLoaderAnim } from '../Animations/index'; 
import '../Components/Preloader.css';

const Preloader = () => {
  useEffect(() => {
    preLoaderAnim(); 
  }, []);

  return (
    <div className='preloader'>
      <div className='texts-container'>
        <span className='fs-4'><span className='text-primary fw-bold'> Welcome!</span> to <span className='text-primary fw-bold'> BRTS</span> Ticket Booking</span>
        {/* <span>to</span>
        <span>BRTS</span>
        <span>Ticket system.</span> */}
      </div>
    </div>
  );
};

export default Preloader;
