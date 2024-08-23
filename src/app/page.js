"use client"; 

import { Container, Typography, Button, Grid, Paper, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Smart City Solutions
          </Typography>
          <Typography variant="h5" paragraph>
            Enhancing urban life through technology and innovation.
          </Typography>
          {/* <Button variant="contained" color="primary" onClick={handleLearnMore}>
            Learn More
          </Button> */}
        </Box>

        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h6">Smart Traffic Management</Typography>
              <Typography>Optimize traffic flow and reduce congestion.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h6">Energy Efficiency</Typography>
              <Typography>Monitor and reduce energy consumption.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h6">Public Safety</Typography>
              <Typography>Enhance safety through advanced monitoring.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
