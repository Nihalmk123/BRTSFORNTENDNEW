import React, { useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";

const Sidebar = () => {
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

  const toggleSidebar = () => {
    setStyle(prevStyle => 
      prevStyle.includes("toggled") 
        ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" 
        : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
    );
  };

  return (
    <div id="wrapper">
      <ul className={style} id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
            {/* <i className="fas fa-laugh-wink" /> */}
          </div>
          <div className="sidebar-brand-text mx-3">BRTS-Book TIcket</div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <a className="nav-link" href="index.html">
            <i className="fas fa-bus me-3 fw-bold" style={{color:"#fff", fontSize:"18px"}}/>
            <span>Dashboard</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Bookings</div>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBookings" aria-expanded="true" aria-controls="collapseBookings">
            <i className="fas fa-fw fa-cog" />
            <span>Book Tickets</span>
          </a>
          <div id="collapseBookings" className="collapse" aria-labelledby="headingBookings" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/myticket/bookTickets">Book Ticket</Link>
              <Link className="collapse-item" to="/myticket/ticketHistory">Ticket History</Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseInvoicing" aria-expanded="true" aria-controls="collapseInvoicing"> */}
            {/* <i className="fas fa-fw fa-folder" /> */}
            {/* <span>Invoicing</span> */}
          {/* </a> */}
          {/* <div id="collapseInvoicing" className="collapse" aria-labelledby="headingInvoicing" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <a className="collapse-item" href="register.html">Invoice</a>
            </div>
          </div> */}
        </li>
        <hr className="sidebar-divider d-none d-md-block" />
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" onClick={toggleSidebar} />
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
