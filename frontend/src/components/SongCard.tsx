import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActions,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface SongCardProps {
  song: {
    _id: string; 
    title: string;
    artist: string;
    album: string;
    genre: string;
    imageUrl?: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onEdit, onDelete }) => {
  
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', padding: 2 }}>
      {song.imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={song.imageUrl}
          alt={`${song.title} album cover`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {song.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {song.artist} - {song.album} - {song.genre}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <IconButton onClick={() => onEdit(song._id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(song._id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default SongCard;
