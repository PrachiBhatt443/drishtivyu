'use client'
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  CircularProgress,
  Box
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSession } from 'next-auth/react';
import Footer from '@/components/footer/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await fetch('/api/ratings');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched ratings:', data); // Debug log
        setRatings(data);
      } else {
        throw new Error('Failed to fetch ratings');
      }
    } catch (err) {
      console.error('Error fetching ratings:', err);
      setError('Failed to fetch ratings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = (ratingType, isLoggedIn) => {
    return ratings
      .filter(rating => isLoggedIn ? rating.userId : !rating.userId)
      .map((rating, index) => ({
        name: isLoggedIn ? `User ${index + 1}` : `Anonymous ${index + 1}`,
        [ratingType]: rating[ratingType]
      }));
  };

  const ratingTypes = ['crimeReduction', 'roadCondition', 'complaintResolution', 'noiseReduction', 'overcrowdingReduction', 'traffic', 'airQuality'];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Debug output
  console.log('Ratings state:', ratings);
  console.log('Sample chart data (Logged In):', prepareChartData('crimeReduction', true));
  console.log('Sample chart data (Anonymous):', prepareChartData('crimeReduction', false));

  return (
    <>

    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ backgroundColor: '#C8E8E0',py: 20 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Admin Dashboard
        </Typography>
        {ratings.length === 0 ? (
          <Typography align="center">No ratings data available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {ratingTypes.map(ratingType => (
              <Grid item xs={12} key={ratingType}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {ratingType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Ratings
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1">Logged In Users</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={prepareChartData(ratingType, true)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 5]} />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey={ratingType} 
                              stroke="#8884d8" 
                              name="Logged In Users"
                              dot={{ stroke: '#8884d8', strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1">Anonymous Users</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={prepareChartData(ratingType, false)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 5]} />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey={ratingType} 
                              stroke="#82ca9d" 
                              name="Anonymous Users"
                              dot={{ stroke: '#82ca9d', strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </ThemeProvider>
    <Footer/>
    </>
  );
};

export default AdminDashboard;