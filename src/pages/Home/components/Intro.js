import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../assets/logo.png';

const Intro = () => {
  return (
    <>
      <Card fullwidth='true' sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          alt="Handy Dandy logo"
          image={image}
        />
        <CardContent>
          {/* <Typography
            textAlign={'center'}
            gutterBottom
            variant="h5"
            component="div"
          >
            Who are We?
          </Typography> */}
          <Typography sx={{ m: { md: '20px 60px' } }} variant="body1" color="text.secondary" lineHeight={'2'}>
            If you're considering hanging an object on a wall or attempting to change an oil filter in your car without prior experience or uncertainty about the necessary tools, you can rest easy knowing that we're here to assist you.<br />
            Our collection of articles covers a range of do-it-yourself tasks both indoors and outdoors, making it easy for you to find the information you need to complete your project.
            <br />Feel free to browse our selection of articles by clicking the link at the top of the page.
            <br />The Handy Dandy website is a useful resource for anyone looking to take on do-it-yourself projects.
            <br />It provides a range of articles that cover a variety of tasks, from basic home repairs to more advanced outdoor projects.
            <br />The Website is designed for you to have a smooth experience, making it simple for users to find the information they need.
            <br />Whether you're a seasoned DIY enthusiast or just starting out, the Handy Dandy website is an excellent resource to have at your fingertips.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Intro;
