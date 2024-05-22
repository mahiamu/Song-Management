import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { RootState } from '../../store/index';
import { Song, SongState, Statistics } from './songTypes';

// Define initial statistics
const initialStatistics: Statistics = {
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,
  songsPerGenre: {},
  songsPerArtist: {},
  songsPerAlbum: {},
};

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
  const response = await axiosInstance.get('/api/songs');
  console.log('Fetched songs:', response.data); // Add this line to log fetched songs
  return response.data;
});

export const addSong = createAsyncThunk('songs/addSong', async (song: Song) => {
  const response = await axiosInstance.post('/api/songs', song);
  return response.data;
});

export const updateSong = createAsyncThunk('songs/updateSong', async (song: Song) => {
  const response = await axiosInstance.put(`/api/songs/${song._id}`, song);
  return response.data;
});

export const deleteSong = createAsyncThunk('songs/deleteSong', async (id: string) => {
  await axiosInstance.delete(`/api/songs/${id}`);
  return id;
});

export const selectSongById = (state: RootState, songId: string) =>
  state.songs.songs.find((song) => song._id === songId);

// Define the initial state
const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
  statistics: initialStatistics,
};

// Define helper functions
const calculateStatistics = (songs: Song[]): Statistics => {
  const statistics: Statistics = { ...initialStatistics }; // Initialize statistics object with initial values

  // Calculate total songs
  statistics.totalSongs = songs.length;

  // Calculate total unique artists, albums, and genres
  const uniqueArtists = new Set<string>();
  const uniqueAlbums = new Set<string>();
  const uniqueGenres = new Set<string>();

  songs.forEach((song) => {
    uniqueArtists.add(song.artist);
    uniqueAlbums.add(song.album);
    uniqueGenres.add(song.genre);
  });

  statistics.totalArtists = uniqueArtists.size;
  statistics.totalAlbums = uniqueAlbums.size;
  statistics.totalGenres = uniqueGenres.size;

  // Calculate songs per genre, artist, and album
  statistics.songsPerGenre = calculateSongsPerCategory(songs, 'genre');
  statistics.songsPerArtist = calculateSongsPerCategory(songs, 'artist');
  statistics.songsPerAlbum = calculateSongsPerCategory(songs, 'album');

  return statistics;
};

const calculateSongsPerCategory = (songs: Song[], category: keyof Song): { [key: string]: number } => {
  const songsPerCategory: { [key: string]: number } = {};

  songs.forEach((song) => {
    const value = song[category];
    if (value in songsPerCategory) {
      songsPerCategory[value]++;
    } else {
      songsPerCategory[value] = 1;
    }
  });

  return songsPerCategory;
};

// Create the slice
const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors when starting a new request
      })
      .addCase(fetchSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.loading = false;
        state.songs = action.payload;
        state.error = null; // Clear error on success
        state.statistics = calculateStatistics(state.songs);
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null; // Assign null if message is undefined
      })
      .addCase(addSong.fulfilled, (state, action: PayloadAction<Song>) => {
        state.songs.push(action.payload);
        state.statistics = calculateStatistics(state.songs);
      })
      .addCase(updateSong.fulfilled, (state, action: PayloadAction<Song>) => {
        const index = state.songs.findIndex((song) => song._id === action.payload._id);
        if (index !== -1) {
          state.songs[index] = action.payload;
          state.statistics = calculateStatistics(state.songs);
        }
      })
      .addCase(deleteSong.fulfilled, (state, action: PayloadAction<string>) => {
        state.songs = state.songs.filter((song) => song._id !== action.payload);
        state.statistics = calculateStatistics(state.songs);
      });
  },
});

export const {} = songSlice.actions;
export default songSlice.reducer;
