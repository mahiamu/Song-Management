import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSong, updateSong, selectSongById } from '../features/songs/songSlice';
import { RootState } from '../store';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material';

interface SongFormProps {
  songId?: string;
  onClose: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ songId, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const song = useSelector((state: RootState) => (songId ? selectSongById(state, songId) : null));

  const [title, setTitle] = useState(song?.title || '');
  const [artist, setArtist] = useState(song?.artist || '');
  const [album, setAlbum] = useState(song?.album || '');
  const [genre, setGenre] = useState(song?.genre || '');

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setArtist(song.artist);
      setAlbum(song.album);
      setGenre(song.genre);
    }
  }, [song]);

  const handleSubmit = async () => {
    const songData = { _id: song?._id || '', title, artist, album, genre };

    try {
      if (songId) {
        await dispatch(updateSong(songData) as any).unwrap();
        setSuccessMessage('Song updated successfully');
      } else {
        await dispatch(addSong(songData) as any).unwrap();
        setSuccessMessage('Song added successfully');
      }
      handleClose();
    } catch (error: any) {
      setServerError(error.message || 'Failed to save the song');
    }
  };

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  const handleSnackbarClose = () => {
    setServerError(null);
    setSuccessMessage(null);
  };

  return (
    <>
      <Dialog open onClose={handleClose}>
        <DialogTitle>{songId ? 'Edit Song' : 'Add Song'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Artist"
            fullWidth
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Album"
            fullWidth
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Genre"
            fullWidth
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {songId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!serverError || !!successMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        {serverError ? (
          <Alert onClose={handleSnackbarClose} severity="error">
            {serverError}
          </Alert>
        ) : (
          <Alert onClose={handleSnackbarClose} severity="success">
            {successMessage}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default SongForm;
