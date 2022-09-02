import * as React from 'react';

import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const FollowGrid = ({ people, message }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {people.length > 0 && (
          <Grid container spacing={2} minHeight={160}>
            {people.map((person) => (
              <Grid
                xs
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                key={person._id}
                to={`/users/${person._id}/profile`}
                component={RouterLink}
                sx={{ textDecoration: 'none', color: '#000' }}
              >
                <Avatar
                  sx={{ width: 60, height: 60, mb: 2 }}
                  src={`/api/users/${person._id}/photo`}
                  alt={`${person.name} avatar`}
                />
                <Typography>{person.name}</Typography>
              </Grid>
            ))}
          </Grid>
        )}

        {message && <Typography>{message}</Typography>}
      </Box>
    </>
  );
};
FollowGrid.propTypes = {
  people: PropTypes.array.isRequired,
  message: PropTypes.string,
};
export default FollowGrid;
