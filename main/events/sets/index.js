import Set from '../../models/Set';
import * as types from '../../types';

export const createSet = async (e, data) => {
  try {
    const state = [
      new Array(30),
      new Array(60),
      new Array(150),
      new Array(240),
      new Array(420),
    ];

    for (let i = 0; i < 30; i++) {
      state[0][i] = data.flashcards[i];
    }

    data.state = state;

    console.log(data);

    const set = new Set(data);
    await set.save();

    e.sender.send(
      types.CREATE_SET,
      `${data.name} set was successfully created`
    );
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, set ${data.name} didn't created`);
  }
};

export const editSet = async (e, { _id, data }) => {
  try {
    const set = await Set.findById({ _id });

    set.name = data.name || set.name;
    set.description = data.description || set.description;
    set.rate = data.rate || set.rate;
    set.flashcards = data.flashcards || set.flashcards;
    set.state = data.state || set.state;

    set.save();

    e.sender.send(types.EDIT_SET, `${data.name} set was successfully edited`);
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, set ${data.name} didn't edited`);
  }
};

export const deleteSet = async (e, { _id }) => {
  try {
    const set = await Set.findById({ _id });

    set.remove();
    e.sender.send(types.DELETE_SET, `${_id} set was successfully deleted`);
  } catch (err) {
    e.sender.send(types.ERROR, `ERROR, set ${_id} didn't edited`);
  }
};
