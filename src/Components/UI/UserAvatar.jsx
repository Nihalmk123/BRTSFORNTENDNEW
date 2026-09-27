import { Avatar } from '@mui/material';

// One avatar for the whole app: the profile photo when there is one,
// otherwise initials on the brand gradient.
const initials = (p) =>
  `${p?.firstName?.[0] || ''}${p?.lastName?.[0] || ''}`.toUpperCase() || p?.email?.[0]?.toUpperCase() || '?';

const UserAvatar = ({ profile, size = 36, sx }) => (
  <Avatar
    src={profile?.profilePicLink || undefined}
    alt={profile?.firstName || 'Account'}
    sx={{
      width: size,
      height: size,
      fontSize: size * 0.38,
      fontWeight: 700,
      letterSpacing: '0.02em',
      color: '#FFFFFF',
      background: 'linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)',
      ...sx,
    }}
  >
    {initials(profile)}
  </Avatar>
);

export default UserAvatar;
