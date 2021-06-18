import { v4 as uuidv4 } from 'uuid';

class FlashcardsSetState {
  id = uuidv4();
  state = [
    new Array(30),
    new Array(60),
    new Array(150),
    new Array(240),
    new Array(420),
  ];

  constructor({ flashcardSetId }) {
    this.flashcardSetId = flashcardSetId;
  }
}

export default FlashcardsSetState;
