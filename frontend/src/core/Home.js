import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import socialMedia from '../assets/images/background.webp';
const Home = () => (
  <>
    <Card sx={{ mx: 'auto', my: 1, maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='300'
          image={socialMedia}
          alt='green leaves'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            MediaBuzz
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Welcome to the MediaBuzz Project.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </>
);
export default Home;
