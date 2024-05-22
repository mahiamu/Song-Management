export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: Record<string, number>;
  songsPerArtist: Record<string, number>;
  songsPerAlbum: Record<string, number>;
}

export interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  statistics: Statistics;
}
