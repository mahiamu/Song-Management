import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSongs, deleteSong } from '../features/songs/songSlice';
import { Grid, CircularProgress, Typography, Box, TextField } from '@mui/material';
import SongForm from './SongForm';
import SongCard from './SongCard';

interface SongListProps {
  onAdd: () => void;
}

const SongList: React.FC<SongListProps> = ({ onAdd }) => {
  const dispatch = useAppDispatch();
  const { songs: allSongs, loading, error } = useAppSelector((state) => state.songs);
  const [filteredSongs, setFilteredSongs] = useState(allSongs);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSongs(
      allSongs.filter((song) =>
        `${song.title} ${song.artist} ${song.album} ${song.genre}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [allSongs, searchQuery]);

  const handleEdit = (id: string) => {
    setEditingSongId(id);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSong(id));
  };

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

  return (
    <div>
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Songs
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '300px' }} 
          margin="normal"
        />
      </Box>
      <Grid container spacing={3}>
        {filteredSongs.map((song) => (
          <Grid key={song._id} item xs={12} sm={6} md={4}>
            <SongCard song={song} onEdit={handleEdit} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
      {editingSongId && (
        <SongForm
          songId={editingSongId}
          onClose={() => setEditingSongId(null)}
        />
      )}
    </div>
  );
};

export default SongList;
