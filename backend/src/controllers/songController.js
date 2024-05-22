import Song from "../models/Song.js";


const createSong = async (req, res) => {
  try {
    // Extract song data from the request body
    const { title, artist, album, genre } = req.body;

    // Check if all required fields are provided
    if (!title || !artist || !album || !genre) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new song instance
    const newSong = new Song({
      title,
      artist,
      album,
      genre
    });

    // Save the new song to the database
    const song = await newSong.save();

    // Return the newly created song in the response
    res.status(201).json(song);
  } catch (error) {
    // Handle any errors that occur during song creation
    console.error("Error creating song:", error);
    res.status(500).json({ message: "Failed to create the song" });
  }
};




const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    await Song.findByIdAndDelete(id);
    res.status(204).json({ message: 'Song deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStatistics = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = (await Song.distinct('artist')).length;
    const totalAlbums = (await Song.distinct('album')).length;
    const totalGenres = (await Song.distinct('genre')).length;

    const genreStats = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);

    const artistStats = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
    ]);

    const albumStats = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genreStats,
      artistStats,
      albumStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export  {
  createSong,
  getSongs,
  updateSong,
  deleteSong,
  getStatistics,
};
