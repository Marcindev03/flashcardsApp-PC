import { v4 as uuidv4 } from 'uuid';

class FlashcardSet {
  id = uuidv4();

  constructor({ flashcards }) {
    this.flashcards = flashcards;
  }
}

export default FlashcardSet;
