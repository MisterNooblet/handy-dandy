import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from '../assets/logo.png';

const Intro = () => {
  return (
    <>
      <Card fullwidth='true'>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={image}
        />
        <CardContent>
          <Typography
            textAlign={'center'}
            gutterBottom
            variant="h5"
            component="div"
          >
            Who are We?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem consequuntur dolore quisquam vel odit impedit
            molestiae sunt voluptatem reprehenderit minus accusantium, dolores
            architecto voluptates excepturi? Doloribus veniam obcaecati fugit
            architecto, pariatur ab aspernatur libero repellendus earum, soluta
            quis molestiae similique tempore eos ipsa reprehenderit unde dolorum
            corporis beatae suscipit cupiditate?
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button>
          <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    </>
  );
};

export default Intro;
