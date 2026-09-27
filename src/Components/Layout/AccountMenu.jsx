import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@mui/material';
import {
  AlertCircle,
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  History,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Ticket,
  UserRound,
} from 'lucide-react';
import { useAuth } from '../Context/Context';
import { useUserProfile } from '../Context/UserProfileContext';
import UserAvatar from '../UI/UserAvatar';
import './AccountMenu.css';

const AccountMenu = () => {
  const { auth, handleLogout } = useAuth();
  const { userProfile } = useUserProfile();
  const [anchorEl, setAnchorEl] = useState(null);
  const close = () => setAnchorEl(null);

  const name = [userProfile?.firstName, userProfile?.lastName].filter(Boolean).join(' ') || 'Your account';
  const verified = userProfile?.emailVerified && userProfile?.phoneNumberVerified;
  const isAdmin = auth?.authorities?.includes('ROLE_ADMIN');

  const links = [
    { to: '/editProfile', icon: UserRound, label: 'My profile' },
    { to: '/bookedTicket', icon: Ticket, label: 'Recent ticket' },
    { to: '/ticketHistory', icon: History, label: 'Ticket history' },
    ...(isAdmin ? [{ to: '/admin', icon: LayoutDashboard, label: 'Admin dashboard' }] : []),
  ];

  return (
    <>
      <button
        type="button"
        className={`am-trigger${anchorEl ? ' is-open' : ''}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={Boolean(anchorEl)}
        aria-label="Open account menu"
      >
        <UserAvatar profile={userProfile} size={34} />
        <ChevronDown size={16} className="am-trigger__chev" />
      </button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        disableScrollLock
        slotProps={{ paper: { className: 'am-paper', elevation: 0 } }}
        MenuListProps={{ className: 'am-list', dense: true }}
      >
        <div className="am-head">
          <UserAvatar profile={userProfile} size={44} />
          <div className="am-head__text">
            <strong>{name}</strong>
            <span>{userProfile?.email || 'No email on file'}</span>
          </div>
        </div>

        {verified ? (
          <div className="am-status am-status--ok"><BadgeCheck size={15} /> Verified account</div>
        ) : (
          <Link to="/editProfile" className="am-status am-status--warn" onClick={close}>
            <AlertCircle size={15} />
            <span>Finish verifying your account</span>
            <ChevronRight size={15} />
          </Link>
        )}

        <div className="am-sep" />
        <p className="am-label">Account</p>
        {links.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to} className="am-item" role="menuitem" onClick={close}>
            <Icon size={17} /> {label}
          </Link>
        ))}

        <div className="am-sep" />
        <p className="am-label">Security</p>
        <Link to="/ForgotPassword" className="am-item" role="menuitem" onClick={close}>
          <KeyRound size={17} /> Change password
        </Link>

        <div className="am-sep" />
        <button type="button" className="am-item am-item--danger" role="menuitem" onClick={() => { close(); handleLogout(); }}>
          <LogOut size={17} /> Sign out
        </button>
      </Menu>
    </>
  );
};

export default AccountMenu;
