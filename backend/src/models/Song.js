import { Schema, model } from 'mongoose';


const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
});


const Song = model('Song', songSchema);

export default Song;
