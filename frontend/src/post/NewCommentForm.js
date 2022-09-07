import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
const NewCommentForm = ({ user, addComment }) => {
  const [text, setText] = useState('');
  return (
    <div>
      <TextField
        id='outlined-textarea'
        // label='Add comment'
        placeholder='Add a comment...'
        multiline
        sx={{ width: 600, mb: 1 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <Button
        variant='contained'
        size='small'
        sx={{ mb: 1 }}
        onClick={() => addComment(text)}
      >
        Comment
      </Button>
    </div>
  );
};
export default NewCommentForm;
