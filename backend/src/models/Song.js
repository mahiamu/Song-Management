import { Schema, model } from 'mongoose';

// Define the Mongoose schema for the Song model
const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
});

// Create and export the Mongoose model based on the schema
const Song = model('Song', songSchema);

export default Song;
