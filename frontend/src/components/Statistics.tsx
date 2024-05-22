import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSongs } from '../features/songs/songSlice';
import { CircularProgress, Typography, Grid, Card, CardContent, Box } from '@mui/material';

const Statistics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { statistics, loading, error } = useAppSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderCSV = (data: { [key: string]: number }) => {
    return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Statistics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h6" align="center">Total Songs</Typography>
              <Typography variant="body1" align="center">{statistics.totalSongs}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h6" align="center">Total Artists</Typography>
              <Typography variant="body1" align="center">{statistics.totalArtists}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h6" align="center">Total Albums</Typography>
              <Typography variant="body1" align="center">{statistics.totalAlbums}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h6" align="center">Total Genres</Typography>
              <Typography variant="body1" align="center">{statistics.totalGenres}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h6" align="center">Genre Stats</Typography>
              <Typography variant="body2" align="center" style={{ whiteSpace: 'pre-wrap' }}>
                {renderCSV(statistics.songsPerGenre)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h6" align="center">Artist Stats</Typography>
              <Typography variant="body2" align="center" style={{ whiteSpace: 'pre-wrap' }}>
                {renderCSV(statistics.songsPerArtist)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h6" align="center">Album Stats</Typography>
              <Typography variant="body2" align="center" style={{ whiteSpace: 'pre-wrap' }}>
                {renderCSV(statistics.songsPerAlbum)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
