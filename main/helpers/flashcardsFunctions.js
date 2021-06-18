import Flashcard from './flashcard.js';

export const createFlashcard = async (name, translation) => {
  return new Flashcard({ name: name, translation: translation });
};

export const serveFlashcard = async (flashcards) => {
  const fullArray = flashcards[await findFullArray(flashcards)];
  const flashcard = fullArray[fullArray.length - 1];

  return flashcard;
};

const findFullArray = async (array) => {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const childArray = array[i - 1];
    if (childArray[childArray.length - 1] !== undefined) {
      return i - 1;
    }
  }
};
