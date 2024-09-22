// pages/about.js
import React from 'react';
import { Container, Typography, Box, Button, Divider } from '@mui/material';
import Footer from '@/components/footer/Footer';

const About = () => {
  return (
    <>

    <Container maxWidth="xl" sx={{ backgroundColor: '#C8E8E0', minHeight: '100vh', py: 30 }}>
      <Typography variant="h3" align="center" gutterBottom>
        About Our Initiative
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Our smart city initiative aims to enhance urban living by actively involving citizens 
        in the improvement of city services. We leverage technology to gather real-time feedback 
        and insights on various urban issues, ensuring a responsive city administration.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Our Core Focus Areas
      </Typography>
      <Typography variant="body1" paragraph>
        We address a variety of critical urban challenges, including:
      </Typography>
      <Box sx={{ listStyle: 'disc', pl: 4 }}>
        <Typography variant="body1">• Road Condition Monitoring</Typography>
        <Typography variant="body1">• Real Time Crime Detection</Typography>
        <Typography variant="body1">• Air Quality Monitoring</Typography>
        <Typography variant="body1">• Overspeed Detection</Typography>
        <Typography variant="body1">• Noise Detection</Typography>
        <Typography variant="body1">• Overcrowding Detection</Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Get Involved
      </Typography>
      <Typography variant="body1" paragraph>
        We believe that citizen feedback is crucial for continuous improvement. 
        Your thoughts and experiences can help shape a better city for all.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Share Your Feedback
      </Button>
    </Container>
    <Footer/>
    </>
  );
};

export default About;
