import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { follow, unfollow } from './api-user';
const FollowUserButton = ({ following, onButtonClick }) => {
  const onFollowClick = () => {
    onButtonClick(follow);
  };
  const onUnFollowClick = () => {
    onButtonClick(unfollow);
  };
  return (
    <>
      {following ? (
        <Button variant='contained' color='secondary' onClick={onUnFollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant='contained' color='primary' onClick={onFollowClick}>
          Follow
        </Button>
      )}
    </>
  );
};
FollowUserButton.protoTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
export default FollowUserButton;
