import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import CardBox from './components/CardBox';

const cards = [
  {
    title: 'Tools',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cupiditate voluptatum reiciendis ipsa in impedit possimus nostrum iure autem incidunt?',
    image:
      'https://www.letsbuild.com/wp-content/uploads/2017/06/tools-864983_1280.jpg',
  },
  {
    title: 'Materials',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis cupiditate voluptatum reiciendis ipsa in impedit possimus nostrum iure autem incidunt?',
    image:
      'https://www.structuralguide.com/wp-content/uploads/2022/01/Construction-Materials.jpg',
  },
];

const introString =
  'Here you will find information about diffrent tools and materials mentioned around in our application and articles. So go ahead and select a category below , to start exploring.';

const theme = createTheme();

export default function Wiki() {
  const params = useParams();
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
              {!params.category
                ? 'Our Tool-O-Pedia'
                : params.tools
                  ? params.tools
                  : params.subcategories
                    ? params.subcategories
                    : params.category
                      ? params.category
                      : 'Something went wrong'}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {!params.category && introString}
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
            {!params.category && <CardBox array={cards} />}
            {params && params.tools && <CardBox params={params} />}
            {params && params.subcategories && !params.tools && <CardBox params={params} />}
            {params && params.category && !params.subcategories && !params.tools && < CardBox params={params} />}
          </Grid>
        </Container>
      </>
    </ThemeProvider>
  );
}
