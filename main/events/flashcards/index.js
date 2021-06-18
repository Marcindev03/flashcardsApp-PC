import Flashcard from '../../models/Flashcard';
import * as types from '../../types';

export const createFlashcard = async (e, data) => {
  try {
    const flashcard = new Flashcard(data);
    flashcard.save();

    e.sender.send(
      types.CREATE_FLASHCARD,
      `${data.name} flashcards successfully created`
    );
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, flashcard didn't created`);
  }
};

export const editFlashcard = async (e, { _id, data }) => {
  try {
    const flashcard = await Flashcard.findById({ _id: _id });

    flashcard.name = data.name;
    flashcard.translation = data.translation;

    await flashcard.save();

    e.sender.send(
      types.EDIT_FLASHCARD,
      `${_id} flashcard was successfully editted`
    );
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, flashcard didn't save`);
  }
};

export const deleteFlashcard = async (e, { _id }) => {
  try {
    const flashcard = await Flashcard.findById({ _id });

    await flashcard.remove();

    e.sender.send(
      types.DELETE_FLASHCARD,
      `${_id} flashcard was successfully deleted`
    );
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, flashcard didn't deleted`);
  }
};
