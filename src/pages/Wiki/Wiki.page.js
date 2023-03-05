import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cards = [
  {
    title: 'Tools',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cupiditate voluptatum reiciendis ipsa in impedit possimus nostrum iure autem incidunt?',
    image:
      'https://www.structuralguide.com/wp-content/uploads/2022/01/Construction-Materials.jpg',
  },
  {
    title: 'Materials',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cupiditate voluptatum reiciendis ipsa in impedit possimus nostrum iure autem incidunt?',
    image:
      'https://www.letsbuild.com/wp-content/uploads/2017/06/tools-864983_1280.jpg',
  },
];

const theme = createTheme();

export default function Wiki() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Our Tool-O-Pedia
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Here you will find information about diffrent tools and materials
              mentioned around in our application and articles. So go ahead and
              select a category below , to start exploring.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'space-around' }}
          >
            {cards.map((card) => (
              <Grid item key={card.title} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '10.25%',
                    }}
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    </ThemeProvider>
  );
}
