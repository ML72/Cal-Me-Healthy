import React, { Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const cards = [
  {
    title: "Snap a picture",
    content: "Take a photo of our meal and upload it to our site.",
    thumbnail: "https://i.ibb.co/1KSLJQc/camera.png",
    alt: "hand holding camera"
  },
  {
    title: "Quick analysis",
    content: "We’ll analyze it for calorie count, carbon footprint, and more!",
    thumbnail: "https://i.ibb.co/bJS55n3/data-analysis.png",
    alt: "magnifying glass and chart"
  },
  {
    title: "Detailed results",
    content: "We provide detailed reports and meal recommendations to better your health.",
    thumbnail: "https://i.ibb.co/2Pv9t1d/data-results.png",
    alt: "pie chart and clipboard"
  }
];

const Landing = ({ isAuthenticated }) => {

  if(isAuthenticated) {
    return (<Navigate to="/dashboard" />);
  }

  return (
    <Fragment>
      <CssBaseline />
      <main>
          <Container maxWidth="sm" align="center">
            <Box
              component="img"
              sx={{
                width: "70%"
              }}
              src="https://i.ibb.co/mN0hN8W/meal.png"
            />
            <Typography
              sx={{ pt: 2 }}
              component="h1"
              variant="h3"
              fontWeight="fontWeightMedium"
              align="center"
              color="text.primary"
              gutterBottom
            >
              <Box color="primary.main" display="inline">
                You are
              </Box>{" "}
              what you eat.
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{ pt: 1 }}
              paragraph
            >
              Analyze your daily meals and snacks for calorie intake, carbon footprint, and much more with our quick and easy-to-use nutrition tool!
            </Typography>
            <Stack
              sx={{ pt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/signup" style={{ textDecoration: "none", width: "100%" }}>
                <Button variant="contained" size="large" fullWidth="true">
                  Sign up
                </Button>
              </Link>
              <Link to="/signin" style={{ textDecoration: "none", width: "100%" }}>
                <Button variant="outlined" size="large" fullWidth="true">
                  Sign in
                </Button>
              </Link>
            </Stack>
          </Container>
        <Container sx={{ py: 7 }} maxWidth="lg">
          <Typography
            sx={{ pb: 4 }}
            component="h2"
            variant="h4"
            fontWeight="fontWeightMedium"
            align="center"
            color="text.primary"
            gutterBottom
          >
            <Box color="primary.main" display="inline">
              Analyze your food
            </Box>{" "}
            in minutes.
          </Typography>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0"
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pb: "10%",
                      pt: "2%",
                      px: "20%"
                    }}
                    image={card.thumbnail}
                    alt={card.alt}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      fontWeight="fontWeightMedium"
                    >
                      {card.title}
                    </Typography>
                    <Typography>{card.content}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          CalMeHealthy
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Built with ❤ at HackNYU 2022
        </Typography>
      </Box>
    </Fragment>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);