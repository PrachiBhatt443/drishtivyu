// pages/contact.js
import React from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import Footer from '@/components/footer/Footer';

const Contact = () => {
  return (
    <div className='bg-[#C8E8E0]'>
    <Container maxWidth="md" sx={{ py: 30 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Get in Touch
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        We would love to hear from you! Whether you have questions, feedback, or suggestions,
        feel free to reach out to us using the form below.
      </Typography>

      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Email"
              variant="outlined"
              required
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              required
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Send Message
          </Button>
        </Box>
      </Box>
    </Container>
    <Footer/>
    </div>
  );
};

export default Contact;
