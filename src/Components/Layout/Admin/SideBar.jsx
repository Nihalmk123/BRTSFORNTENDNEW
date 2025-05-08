// Components/Admin/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', background: '#343a40', height: '100vh' }}>
      <MDBListGroup light>
        <Link to="/admin" className="list-group-item list-group-item-action">
          Dashboard
        </Link>
        <Link to="/admin/clearcache" className="list-group-item list-group-item-action">
          Clear Cache
        </Link>
        {/* Add other admin links here */}
      </MDBListGroup>
    </div>
  );
};

export default Sidebar;
