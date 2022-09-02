import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FollowGrid from './FollowGrid';

const ProfileTabs = ({ user }) => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={tab} onChange={handleChange} centered sx={{ mb: 2 }}>
          <Tab label='Following' />
          <Tab label='Followers' />
        </Tabs>
      </Box>
      {tab === 0 && (
        <FollowGrid
          people={user.following}
          message={
            user.following.length === 0
              ? `${user.name} doesn't follow anyone`
              : ''
          }
        />
      )}
      {tab === 1 && (
        <FollowGrid
          people={user.followers}
          message={
            user.followers.length === 0 ? `${user.name} has no followers` : ''
          }
        />
      )}
    </>
  );
};
export default ProfileTabs;
