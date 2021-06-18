import { Schema, model } from 'mongoose';

const flashcardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    examples: {
      type: [String],
    },
    synonyms: {
      type: [String],
    },
    antonyms: {
      type: [String],
    },
    changeByTimes: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Flashcard = model('Flashcard', flashcardSchema);

export default Flashcard;
