import { model, Schema } from 'mongoose';

const setSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rate: {
    type: String,
    default: 'slow',
  },
  flashcards: {
    type: [String],
    required: true,
  },
});

const Set = model('Set', setSchema);

export default Set;
