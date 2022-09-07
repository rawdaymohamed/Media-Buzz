import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { isAuthenticated } from '../auth/auth-helper';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
const DeleteDialog = ({ open, setOpen, onDelete }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Are you sure you want to delete this comment?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            This action can't be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={onDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const Comment = ({ comment, userId, userName, onDelete }) => {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 600, mx: 'auto', my: 2 }}>
        <>
          <CardHeader
            avatar={
              <Avatar
                src={userId ? `/api/users/${userId}/photo` : ''}
                alt={`${userName} avatar`}
              />
            }
            component={RouterLink}
            to={`/users/${userId}/profile`}
            title={`${userName}`}
            sx={{ textDecoration: 'none', color: '#000' }}
            subheader={`${new Date(comment.created).toDateString()}`}
          />

          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              {comment.text}
              {isAuthenticated().user._id &&
              isAuthenticated().user._id == userId ? (
                <div style={{ textAlign: 'right' }}>
                  <IconButton size='small'>
                    <DeleteIcon onClick={() => setOpenDelete(true)} />
                  </IconButton>
                </div>
              ) : (
                ''
              )}
            </Typography>
          </CardContent>
        </>
      </Card>
      {openDelete && (
        <DeleteDialog
          open={openDelete}
          setOpen={setOpenDelete}
          onDelete={() => {
            onDelete(comment._id);
            setOpenDelete(false);
          }}
        />
      )}
    </>
  );
};
export default Comment;
